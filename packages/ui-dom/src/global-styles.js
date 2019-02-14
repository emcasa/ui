import {injectGlobal} from 'styled-components'

injectGlobal`
  @font-face {
    font-family: "FaktSoftPro-Normal";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktSoftPro-Blond";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktSoftPro-Medium";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.ttf") format('ttf');
  }

  .noscroll {
    overflow: hidden;
  }
`

export default injectGlobal
