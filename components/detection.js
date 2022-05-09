import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import {drawBox, generateWord, recognizeWord} from "./utilities";
import {BounceLoader} from "react-spinners";

export default function Detection({type, letter = "", setReadyText, setNewWord}) {

    const THRESHOLD = 0.85

    const [text, setText] = useState("");
    const [ready, setReady] = useState(0)
    const [cantLetter, setCantLetter] = useState(0)

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runCoco = async () => {
        const net = await tf.loadGraphModel('https://lsc-cloud-1.s3.us-east.cloud-object-storage.appdomain.cloud/model.json')
        //const net = await tf.loadGraphModel('https://tfjslscmodel.s3.us-east.cloud-object-storage.appdomain.cloud/model.json')
        //const net = await tf.loadGraphModel('https://lsc-model-2.s3.us-east.cloud-object-storage.appdomain.cloud/model.json')
        setInterval(() => {
            detect(net);
        }, 16.7);
    };

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const img = tf.browser.fromPixels(video)
            const resized = tf.image.resizeBilinear(img, [videoWidth, videoHeight])
            const casted = resized.cast('int32')
            const expanded = casted.expandDims(0)
            const obj = await net.executeAsync(expanded)

            const boxes = await obj[3].array()
            const classes = await obj[4].array()
            const scores = await obj[0].array()

            setReady(prevReady => prevReady === 0 ? 1 : 2);

            const ctx = canvasRef.current.getContext("2d");

            if (type === 0) {
                recognizeWord(boxes[0], classes[0], scores[0], THRESHOLD, videoWidth, videoHeight, setText, setCantLetter, letter, ctx)
                requestAnimationFrame(() => {
                    drawBox(ctx, boxes[0], classes[0], scores[0], THRESHOLD, videoWidth, videoHeight)
                })
            } else if (type === 1) {
                generateWord(boxes[0], classes[0], scores[0], THRESHOLD, videoWidth, videoHeight, setText, setCantLetter)
            }

            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)

        }
    };

    useEffect(() => {
        if (cantLetter === 6 && type === 1) {
            setNewWord(prevState => `${prevState}${text}`)
            setCantLetter(0);
        }
    }, [cantLetter, setNewWord, text, type])

    useEffect(() => {
        if (ready === 1) {
            setReadyText(true)
        }
        if (ready === 1 && type === 1) {
            setReady(2)
        }
    }, [ready, type, setReadyText])

    useEffect(() => {
        runCoco()
    }, []);

    return (
        <div className="camera">
            <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: 640,
                    height: 480,
                }}
            />
            {
                ready === 0 && <div className="timer-ring init-timer"><BounceLoader size={60} color={"#E79B25"}/></div>
            }
            {
                (type === 0 && ready === 2) && (cantLetter > 2 ? <i className="ready-icon fas fa-check-circle"/> :
                    <i className="wrong-icon fas fa-times-circle"/>)
            }
        </div>
    )
}
