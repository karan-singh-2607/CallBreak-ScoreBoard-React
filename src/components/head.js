import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default class Head extends React.Component {
  render() {
    return (
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Callbreak</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="./images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="./images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="./images/favicon-16x16.png"
          />
          <link rel="manifest" href="./images/site.webmanifest" />
        </Helmet>
      </HelmetProvider>
    );
  }
}
