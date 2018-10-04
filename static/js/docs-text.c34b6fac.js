(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./docs/text.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),a=n.n(o),s=n("./node_modules/@mdx-js/tag/dist/index.js"),i=n("./node_modules/docz/dist/index.m.js"),r=n("./packages/ui-dom/components/text/index.js"),c=n("./packages/ui-dom/components/view/index.js"),l=n("./packages/ui-dom/components/button/index.js");function m(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}t.default=function(e){var t=e.components,n=m(e,["components"]);return a.a.createElement(s.MDXTag,{name:"wrapper",components:t},a.a.createElement(s.MDXTag,{name:"h1",components:t,props:{id:"text"}},"Text"),a.a.createElement(s.MDXTag,{name:"p",components:t},"A simple ",a.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"Text"),". All text should be wrapped in this component for better compatibility with platforms that don't support text outside of tags, such as React Native."),a.a.createElement(s.MDXTag,{name:"p",components:t},a.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"Text")," accepts any component or strings as children."),a.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"basic-usage"}},"Basic usage"),a.a.createElement(i.Playground,{__position:0,__code:"<Text>This is an example text.</Text>\n<Text color=\"blue\">This text has its color defined by our theme config!</Text>\n<Text style={{ fontWeight: 'bold' }}>And this one is bold.</Text>\n<Text>\n  There's a <Button>button</Button> inside this text!\n</Text>",__scope:{props:n,Text:r.a,View:c.a,Button:l.a}},a.a.createElement(r.a,null,"This is an example text."),a.a.createElement(r.a,{color:"blue"},"This text has its color defined by our theme config!"),a.a.createElement(r.a,{style:{fontWeight:"bold"}},"And this one is bold."),a.a.createElement(r.a,null,"There's a ",a.a.createElement(l.a,null,"button")," inside this text!")))}}}]);