import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title }) {
    return(
        <div className="container">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <nav className="nav-bar">
                    <Link href="/">
                        <a className="nav-bar__page plus-Jakarta-extra-bold">Inicio</a>
                    </Link>
                    <Link href="/alphabet">
                        <a className="nav-bar__page plus-Jakarta-extra-bold">Aprende</a>
                    </Link>
                    <Link href="/practice">
                        <a className="nav-bar__page plus-Jakarta-extra-bold">Práctica</a>
                    </Link>
                </nav>
            </header>
            <div className="content">
                {children}
            </div>
        </div>
    )
}
