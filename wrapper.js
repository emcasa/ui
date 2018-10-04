import React from "react";
import { injectGlobal, ThemeProvider } from "styled-components";
import theme from "@emcasa/ui";

injectGlobal`
  @font-face {
    font-family: "FaktSoftPro-Normal";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktSoftPro-Medium";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.ttf") format('ttf');
  }

  * {
    font-family: 'FaktSoftPro-Normal';
  }
`;

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Wrapper;
