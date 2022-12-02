import "../styles/globals.css";
import "../styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashContextProvider } from "../context/HashContext";
import { useEffect } from 'react';
import Moralis from 'moralis';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (
      async () => {
        await Moralis.start({
          apiKey: "a49Uc2WOi06KxibuJctNvRsfop4DmDxBQE9YYTXcTAglkU1FBnswNImAm97ZhwIt",
          // ...and any other configuration
        });
      }
    )()
  }, [])

  return (
    <>
      <HashContextProvider>
        <Component {...pageProps} />
      </HashContextProvider>
    </>
  );
}

export default MyApp;
