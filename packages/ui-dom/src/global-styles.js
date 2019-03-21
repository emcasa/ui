import {injectGlobal} from 'styled-components'

injectGlobal`
  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 300;
    src: local('Rubik Light Italic'), local('Rubik-LightItalic'), url(https://fonts.gstatic.com/s/rubik/v8/iJWBBXyIfDnIV7nEldWYwWL-6aJ8x8s.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 400;
    src: local('Rubik Italic'), local('Rubik-Italic'), url(https://fonts.gstatic.com/s/rubik/v8/iJWEBXyIfDnIV7nEnX661E_c5Ig.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 500;
    src: local('Rubik Medium Italic'), local('Rubik-MediumItalic'), url(https://fonts.gstatic.com/s/rubik/v8/iJWBBXyIfDnIV7nElY2ZwWL-6aJ8x8s.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 700;
    src: local('Rubik Bold Italic'), local('Rubik-BoldItalic'), url(https://fonts.gstatic.com/s/rubik/v8/iJWBBXyIfDnIV7nElcWfwWL-6aJ8x8s.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 900;
    src: local('Rubik Black Italic'), local('Rubik-BlackItalic'), url(https://fonts.gstatic.com/s/rubik/v8/iJWBBXyIfDnIV7nElf2dwWL-6aJ8x8s.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 300;
    src: local('Rubik Light'), local('Rubik-Light'), url(https://fonts.gstatic.com/s/rubik/v8/iJWHBXyIfDnIV7Fqj2md8WD07oB-.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nBrXyw023e.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    src: local('Rubik Medium'), local('Rubik-Medium'), url(https://fonts.gstatic.com/s/rubik/v8/iJWHBXyIfDnIV7Eyjmmd8WD07oB-.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    src: local('Rubik Bold'), local('Rubik-Bold'), url(https://fonts.gstatic.com/s/rubik/v8/iJWHBXyIfDnIV7F6iGmd8WD07oB-.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 900;
    src: local('Rubik Black'), local('Rubik-Black'), url(https://fonts.gstatic.com/s/rubik/v8/iJWHBXyIfDnIV7FCimmd8WD07oB-.woff2) format('woff2');
  }

  .noscroll {
    overflow: hidden;
  }
`

export default injectGlobal
