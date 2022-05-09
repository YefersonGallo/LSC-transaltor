import '../styles/components.scss';
import '../styles/_fonts.scss';
import '../public/icons/css/all.min.css';
import {useRouter} from "next/router";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    return <Component key={router.asPath} {...pageProps} />
}
