(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"./docs/radio-group.mdx":function(e,a,n){"use strict";n.r(a);var o=n("./node_modules/react/index.js"),t=n.n(o),l=n("./node_modules/@mdx-js/tag/dist/index.js"),r=n("./node_modules/docz/dist/index.m.js"),i=n("./packages/ui-dom/components/text/index.js"),p=n.n(i),u=n("./packages/ui-dom/components/radio-group/index.js"),d=n.n(u),c=n("./packages/ui-dom/components/radio-button/index.js"),s=n.n(c);function m(e,a){if(null==e)return{};var n,o,t=function(e,a){if(null==e)return{};var n,o,t={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}a.default=function(e){var a=e.components,n=m(e,["components"]);return t.a.createElement(l.MDXTag,{name:"wrapper",components:a},t.a.createElement(l.MDXTag,{name:"h1",components:a,props:{id:"radiogroup"}},"RadioGroup"),t.a.createElement(l.MDXTag,{name:"p",components:a},"Radio Group component."),t.a.createElement(l.MDXTag,{name:"h2",components:a,props:{id:"basic-usage"}},"Basic usage"),t.a.createElement(r.Playground,{__position:0,__code:'<Text>Uncontrolled radio group</Text>\n<RadioGroup initialValue="a" onChange={value => {}}>\n  <RadioButton label="Option 1" value="a" />\n  <RadioButton label="Option 2" value="b" />\n  <RadioButton label="Option 3" value="c" disabled />\n</RadioGroup>\n<Text>Controlled radio group</Text>\n<RadioGroup selectedValue="a" onChange={value => {}}>\n  <RadioButton label="Option 1" value="a" />\n  <RadioButton label="Option 2" value="b" />\n  <RadioButton label="Option 3" value="c" disabled />\n</RadioGroup>',__scope:{props:n,Text:p.a,RadioGroup:d.a,RadioButton:s.a}},t.a.createElement(p.a,null,"Uncontrolled radio group"),t.a.createElement(d.a,{initialValue:"a",onChange:function(e){}},t.a.createElement(s.a,{label:"Option 1",value:"a"}),t.a.createElement(s.a,{label:"Option 2",value:"b"}),t.a.createElement(s.a,{label:"Option 3",value:"c",disabled:!0})),t.a.createElement(p.a,null,"Controlled radio group"),t.a.createElement(d.a,{selectedValue:"a",onChange:function(e){}},t.a.createElement(s.a,{label:"Option 1",value:"a"}),t.a.createElement(s.a,{label:"Option 2",value:"b"}),t.a.createElement(s.a,{label:"Option 3",value:"c",disabled:!0}))),t.a.createElement(l.MDXTag,{name:"h2",components:a,props:{id:"radiogroup-props"}},"RadioGroup Props"),t.a.createElement(r.PropsTable,{of:d.a}))}}}]);