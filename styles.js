import { injectGlobal } from 'styled-components'

export default injectGlobal`
  @font-face {
    font-family: "FaktPro-Normal";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Normal.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Normal.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Normal.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktPro-Blond";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Blond.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Blond.woff") format('woff'),
         url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Blond.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktPro-Medium";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Medium.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Medium.woff") format('woff'),
         url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktPro-Medium.ttf") format('ttf');
  }

  body {
    font-family: 'FaktPro-Normal';
  }
`
