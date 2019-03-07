(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./docs/components/grid.mdx":function(e,n,t){"use strict";t.r(n);var a=t("./node_modules/react/index.js"),o=t.n(a),l=t("./node_modules/@mdx-js/tag/dist/index.js"),r=t("./node_modules/docz/dist/index.m.js"),i=t("./packages/ui-dom/components/Row/index.js"),d=t.n(i),c=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),m=t("./packages/ui-dom/components/index.js");function w(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  border: 1px solid #979797;\n  display: flex;\n  justify-content: center;\n"]);return w=function(){return e},e}var s=Object(c.default)(m.Col)(w());function p(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}n.default=function(e){var n=e.components,t=p(e,["components"]);return o.a.createElement(l.MDXTag,{name:"wrapper",components:n},o.a.createElement(l.MDXTag,{name:"h1",components:n,props:{id:"grid-system"}},"Grid System"),o.a.createElement(l.MDXTag,{name:"p",components:n},"Our grid system is based on ",o.a.createElement(l.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"https://github.com/rebassjs/grid"}},"rebassjs/grid"),". The ",o.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"Row")," component is a wrapper for ",o.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"Flex")," and ",o.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"Col")," is a wrapper for ",o.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"Box"),"."),o.a.createElement(l.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),o.a.createElement(r.Playground,{__position:0,__code:"<Col>Full width column (12/12)</Col>\n<Row>\n  <Col width={1 / 12}>1</Col>\n  <Col width={11 / 12}>11</Col>\n</Row>\n<Row>\n  <Col width={2 / 12}>2</Col>\n  <Col width={10 / 12}>10</Col>\n</Row>\n<Row>\n  <Col width={3 / 12}>3</Col>\n  <Col width={9 / 12}>9</Col>\n</Row>\n<Row>\n  <Col width={4 / 12}>4</Col>\n  <Col width={8 / 12}>8</Col>\n</Row>\n<Row>\n  <Col width={5 / 12}>5</Col>\n  <Col width={7 / 12}>7</Col>\n</Row>\n<Row>\n  <Col width={6 / 12}>6</Col>\n  <Col width={6 / 12}>6</Col>\n</Row>\n<Row>\n  <Col width={7 / 12}>7</Col>\n  <Col width={5 / 12}>5</Col>\n</Row>\n<Row>\n  <Col width={8 / 12}>8</Col>\n  <Col width={4 / 12}>4</Col>\n</Row>\n<Row>\n  <Col width={9 / 12}>9</Col>\n  <Col width={3 / 12}>3</Col>\n</Row>\n<Row>\n  <Col width={10 / 12}>10</Col>\n  <Col width={2 / 12}>2</Col>\n</Row>\n<Row>\n  <Col width={11 / 12}>11</Col>\n  <Col width={1 / 12}>1</Col>\n</Row>",__scope:{props:t,Row:d.a,Col:s}},o.a.createElement(s,null,"Full width column (12/12)"),o.a.createElement(d.a,null,o.a.createElement(s,{width:1/12},"1"),o.a.createElement(s,{width:11/12},"11")),o.a.createElement(d.a,null,o.a.createElement(s,{width:2/12},"2"),o.a.createElement(s,{width:10/12},"10")),o.a.createElement(d.a,null,o.a.createElement(s,{width:.25},"3"),o.a.createElement(s,{width:.75},"9")),o.a.createElement(d.a,null,o.a.createElement(s,{width:4/12},"4"),o.a.createElement(s,{width:8/12},"8")),o.a.createElement(d.a,null,o.a.createElement(s,{width:5/12},"5"),o.a.createElement(s,{width:7/12},"7")),o.a.createElement(d.a,null,o.a.createElement(s,{width:.5},"6"),o.a.createElement(s,{width:.5},"6")),o.a.createElement(d.a,null,o.a.createElement(s,{width:7/12},"7"),o.a.createElement(s,{width:5/12},"5")),o.a.createElement(d.a,null,o.a.createElement(s,{width:8/12},"8"),o.a.createElement(s,{width:4/12},"4")),o.a.createElement(d.a,null,o.a.createElement(s,{width:.75},"9"),o.a.createElement(s,{width:.25},"3")),o.a.createElement(d.a,null,o.a.createElement(s,{width:10/12},"10"),o.a.createElement(s,{width:2/12},"2")),o.a.createElement(d.a,null,o.a.createElement(s,{width:11/12},"11"),o.a.createElement(s,{width:1/12},"1"))))}}}]);