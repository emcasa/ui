(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"./docs/places-autocomplete/middleware.mdx":function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return c});var n=a("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),s=(a("./node_modules/react/index.js"),a("./node_modules/@mdx-js/react/dist/index.es.js")),b={},r="wrapper";function c(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(s.b)(r,Object.assign({},b,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"middleware"},"Middleware"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"Endpoint"),Object(s.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"Params"),Object(s.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"Service"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("inlineCode",{parentName:"td"},"/autocomplete")),Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("inlineCode",{parentName:"td"},"q={search}"),", ",Object(s.b)("inlineCode",{parentName:"td"},"sessionToken={token}")),Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("a",Object.assign({parentName:"td"},{href:"https://developers.google.com/places/web-service/autocomplete"}),"Place autocomplete"))),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("inlineCode",{parentName:"td"},"/details")),Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("inlineCode",{parentName:"td"},"q={search}")),Object(s.b)("td",Object.assign({parentName:"tr"},{align:"left"}),Object(s.b)("a",Object.assign({parentName:"td"},{href:"https://developers.google.com/places/web-service/details"}),"Place details"))))),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"import express from 'express'\nimport googleMapsMiddleware from '@emcasa/places-autocomplete/middleware'\n\nconst server = express()\n\nserver.use('/maps', googleMapsMiddleware({\n  apiKey: '...',\n  // ... @google/maps client options\n}))\n")))}c&&c===Object(c)&&Object.isExtensible(c)&&Object.defineProperty(c,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/places-autocomplete/middleware.mdx"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-places-autocomplete-middleware.1e211f6c8ca030bffe78.js.map