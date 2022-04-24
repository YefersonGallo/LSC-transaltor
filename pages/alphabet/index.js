import Layout from "../../components/layout";
import Link from "next/link";

const WORDS = ['a', 'b', 'c', 'd', 'e', 'f', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 'u', 'v', 'w', 'x', 'y'];

export default function Alphabet() {

    return (
        <Layout title={"Abecedario"}>
            <div className="container-alphabet">
                <h1 className="cairo-bold">Aprende el abecedario en LSC</h1>
                <h3 className="anek-bold">En esta sección encontrarás las señas estáticas correspondientes al LSC (Lenguaje de Señas
                    Colombiano)</h3>
                <div className="cards">
                    {
                        WORDS.map((word, index) => (
                            <Link href={`/alphabet/${word}`}>
                                <div className="card" key={index}>
                                    <h1 className="word-cover plus-Jakarta-extra-bold">{word.toUpperCase()}</h1>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
