import Detection from "../../../components/detection";
import {useRouter} from "next/router";
import Layout from "../../../components/layout";
import {useState} from "react";
import Image from "next/image";

export default function Word () {

    const route = useRouter();

    const { word } = route.query;

    const [ready, setReady] = useState(false);

    return(
        <Layout title={word ? `${word.toUpperCase()} | Aprende` : 'Cargando...'}>
            <div className="container-home">
                <h1 className="cairo-bold">{word ? `Aprende la letra ${word?.toUpperCase()}` : 'Cargando...'}</h1>
                <p className="plus-Jakarta-medium mb">La imagen a la derecha corresponde a la seña de la letra {word}, intenta realizar la seña manteniendo la distancia según la imagen.</p>
                <p className="plus-Jakarta-medium mb">En caso de no reconocer la seña, acerca o alejar la mano de la cámara</p>
                {
                    !ready ? <p className="plus-Jakarta-medium-italic">Espera un momento mientras se carga el modelo</p> : <p className="plus-Jakarta-medium-italic">Se ha cargado el modelo, ya puedes empezar</p>
                }
                {
                    word &&
                    <div className="camera-comparison">
                        <Detection letter={word} setReadyText={setReady} type={0} />
                        <Image src={`/images/${word}.jpg`} width={640} height={480} alt={`letter-${word}`} />
                    </div>
                }
            </div>
        </Layout>
    )
}
