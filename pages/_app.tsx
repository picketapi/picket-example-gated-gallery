import '../styles/globals.css'
import type { AppProps } from "next/app";

import { PicketProvider } from "@picketapi/picket-react";

// TODO: REPLACE_ME
const apiKey = "pk_your_publishable_key_goes_here";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PicketProvider apiKey={apiKey}>
      <Component {...pageProps} />
    </PicketProvider>
  );
}

export default MyApp;

