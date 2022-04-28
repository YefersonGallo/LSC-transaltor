import Layout from "../components/layout";
import Detection from "../components/detection";
import {useEffect, useState} from "react";

const WORDS = ["UPTC", "VACA", "CARRO", "VOTO", "OTRO", "TORO", "TODO", "CANTO", "FUTBOL", "BALON", "EQUINO", "CABALLO", "PELO", "TIEMPO"]

export default function Practice() {

    const [ready, setReady] = useState(false);
    const [rightWord, setRightWord] = useState(false);
    const [wordSelected, setWordSelected] = useState(Math.floor(Math.random() * WORDS.length))
    const [newWord, setNewWord] = useState("");

    const handleRestart  = () => { setNewWord("") }

    const handleNewWord  = () => {
        setWordSelected(prevState => {
            const number = Math.floor(Math.random() * WORDS.length);
            if(number === prevState) return Math.floor(Math.random() * WORDS.length);
            return number;
        })
        setNewWord("")
    }
    const handleErase  = () => { setNewWord(prevState => prevState.slice(0, prevState.length - 1)) }

    useEffect(() => {
        setRightWord(newWord.toUpperCase() === WORDS[wordSelected])
    }, [newWord, wordSelected])

    return(
        <Layout title="Práctica">
            <div className="container-home">
                <h1 className="cairo-bold">Práctica el abecedario en LSC</h1>
                <p className="plus-Jakarta-medium mb">En esta sección podrás poner en práctica tus conocimientos sobre las señas estáticas del LSC</p>
                <p className="plus-Jakarta-medium mb">Te aparecerá una palabra la cuál debes deletrear haciendo la seña</p>
                <p className="plus-Jakarta-medium mb">En caso de no reconocer la seña, acerca o alejar la mano de la cámara</p>
                {
                    !ready ? <p className="plus-Jakarta-medium-italic bold">Espera un momento mientras se carga el modelo</p> : <p className="plus-Jakarta-medium-italic bold">Se ha cargado el modelo, ya puedes empezar</p>
                }
                <div className="create-word">
                    <Detection letter={""} setReadyText={setReady} type={1} setNewWord={setNewWord} />
                    <div className="new-word-creator">
                        <h3 className="cairo-bold">Deletrea la siguiente palabra con las señas estáticas del LSC:</h3>
                        <h2 className="plus-Jakarta-bold">{WORDS[wordSelected]}</h2>
                        <h2 className="plus-Jakarta-bold">{newWord.toUpperCase()}</h2>
                        <h3  className="cairo-bold right-word" hidden={!rightWord}>Bien hecho, haz deletrado correctamente la palabra {WORDS[wordSelected]}, si quieres puede escoger una nueva palabra</h3>
                    </div>
                </div>
                <div className="buttons-practice">
                    <div className="button-style cairo-semibold" onClick={handleRestart}>Reiniciar</div>
                    <div className="button-style cairo-semibold" onClick={handleNewWord}>Otra palabra</div>
                    <div className="button-style cairo-semibold" onClick={handleErase}>Borrar</div>
                </div>
            </div>
        </Layout>
    )
}
