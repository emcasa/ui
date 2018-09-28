(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"./docs/button.mdx":function(e,t,n){"use strict";n.r(t);var a=n("./node_modules/react/index.js"),o=n.n(a),l=n("./node_modules/@mdx-js/tag/dist/index.js"),c=n("./node_modules/docz/dist/index.m.js"),r=n("./components/button/index.js");function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}t.default=function(e){var t=e.components,n=i(e,["components"]);return o.a.createElement(l.MDXTag,{name:"wrapper",components:t},o.a.createElement(l.MDXTag,{name:"h1",components:t,props:{id:"button"}},"Button"),o.a.createElement(l.MDXTag,{name:"p",components:t},"Button component."),o.a.createElement(l.MDXTag,{name:"h2",components:t,props:{id:"basic-usage"}},"Basic usage"),o.a.createElement(c.Playground,{__position:0,__code:'<p>\n  <Button\n    active\n    onClick={() => {\n      alert("I\'ve been clicked!")\n    }}\n  >\n    Active\n  </Button>\n  <Button>Normal</Button>\n  <Button disabled>Disabled</Button>\n  <Button active disabled>\n    Active and disabled\n  </Button>\n</p>\n<p>\n  <Button height="tall">Tall</Button>\n  <Button height="medium">Medium</Button>\n</p>',__scope:{props:n,Button:r.a}},o.a.createElement("p",null,o.a.createElement(r.a,{active:!0,onClick:function(){alert("I've been clicked!")}},"Active"),o.a.createElement(r.a,null,"Normal"),o.a.createElement(r.a,{disabled:!0},"Disabled"),o.a.createElement(r.a,{active:!0,disabled:!0},"Active and disabled")),o.a.createElement("p",null,o.a.createElement(r.a,{height:"tall"},"Tall"),o.a.createElement(r.a,{height:"medium"},"Medium"))),o.a.createElement(l.MDXTag,{name:"h2",components:t,props:{id:"button-props"}},"Button Props"),o.a.createElement(c.PropsTable,{of:r.a}))}}}]);