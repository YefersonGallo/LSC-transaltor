import Detection from "../../../components/detection";
import {useRouter} from "next/router";
import Layout from "../../../components/layout";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

const WORDS = ['a', 'b', 'c', 'd', 'e', 'f', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 'u', 'v', 'w', 'x', 'y'];

export default function Word () {

    const route = useRouter();
    const { word } = route.query;

    const [index, setIndex] = useState(WORDS.indexOf(word) || 0)
    const [letter, setLetter] = useState(word)

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setIndex(WORDS.indexOf(word))
        setLetter(word)
    }, [word])

    return(
        <Layout title={word ? `${word.toUpperCase()} | Aprende` : 'Cargando...'}>
            <div className="container-home">
                <h1 className="cairo-bold">{word ? `Aprende la letra ${word?.toUpperCase()}` : 'Cargando...'}</h1>
                <p className="plus-Jakarta-medium mb">La imagen a la derecha corresponde a la seña de la letra {word}, intenta realizar la seña manteniendo la distancia según la imagen.</p>
                <p className="plus-Jakarta-medium mb">En caso de no reconocer la seña, acerca o alejar la mano de la cámara</p>
                {
                    !ready ? <p className="plus-Jakarta-medium-italic bold">Espera un momento mientras se carga el modelo</p> : <p className="plus-Jakarta-medium-italic bold">Se ha cargado el modelo, ya puedes empezar</p>
                }
                {
                    letter &&
                    <div className="camera-comparison">
                        <Detection letter={word} setReadyText={setReady} type={0} />
                        <Image src={`/images/${word}.jpg`} width={640} height={480} alt={`letter-${word}`} />
                    </div>
                }
            </div>
            {
                word &&
                <div className="buttons-practice">
                    {
                        index - 1 >= 0 &&
                        <Link href={`/alphabet/${WORDS[index - 1]}`}>
                            <div className="button-style cairo-semibold">{WORDS[index - 1].toUpperCase()}</div>
                        </Link>
                    }
                    <Link href="/alphabet">
                        <div className="button-style cairo-semibold">Inicio</div>
                    </Link>
                    {
                        index + 1 < WORDS.length &&
                        <Link href={`/alphabet/${WORDS[index + 1]}`}>
                            <div className="button-style cairo-semibold">{WORDS[index + 1].toUpperCase()}</div>
                        </Link>
                    }
                </div>
            }
        </Layout>
    )
}
