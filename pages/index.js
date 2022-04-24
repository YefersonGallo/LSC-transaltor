import React from "react";

import Link from "next/link";
import Head from "next/head";

export default function Home() {

    return (

        <div className="main-page">
            <Head>
                <title>Sistema de Traducción de LSC</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1 className="anek-bold">Sistema de traducción del Lenguaje de Señas Colombiano a Texto en español</h1>
            <div className="init-options">
                <Link href="/alphabet">
                    <div className="init-option">
                        <i className="init-icon fas fa-book-reader" />
                        <h2 className="plus-Jakarta-medium">Aprende</h2>
                    </div>
                </Link>
                <Link href="/practice">
                    <div className="init-option">
                        <i className="init-icon fas fa-chalkboard-teacher" />
                        <h2 className="plus-Jakarta-medium">Práctica</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}
