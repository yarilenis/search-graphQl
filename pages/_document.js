import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import config from '../config';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={config.lang}>
        <Head>
          <base href="/" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=3,minimal-ui" />
          <link href="static/favicons/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="static/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="static/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="static/favicons/favicon-16x16.png" />
          <meta name="theme-color" content="#42a692" />
          <link rel="manifest" href="static/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
