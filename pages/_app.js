import "../styles/globals.css";
import "../styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashContextProvider } from "../context/HashContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HashContextProvider>
        <Component {...pageProps} />
      </HashContextProvider>
    </>
  );
}

export default MyApp;
