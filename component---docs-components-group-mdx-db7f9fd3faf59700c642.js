(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{gYkg:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return O})),n.d(t,"default",(function(){return f}));n("1c7q"),n("abGl"),n("gZHo"),n("Fdmb"),n("Ir+3"),n("2mQt");var a=n("mXGw"),o=n("/FXl"),b=n("TjRS"),u=(n("bCeo"),n("pqko")),r=n.n(u),c=n("yNun"),l=n.n(c),i=n("5jLl"),d=n.n(i),p=n("38MK"),m=n.n(p);n("aD51");function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var O={};void 0!==O&&O&&O===Object(O)&&Object.isExtensible(O)&&!O.hasOwnProperty("__filemeta")&&Object.defineProperty(O,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/components/group.mdx"}});var j={_frontmatter:O},y=b.a;function f(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,o={},b=Object.keys(e);for(a=0;a<b.length;a++)n=b[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(o.b)(y,s({},j,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"group"},"Group"),Object(o.b)("h2",{id:"basic-usage"},"Basic usage"),Object(o.b)(a.Fragment,{mdxType:"Fragment"},Object(o.b)(r.a,{mdxType:"Text"},"Uncontrolled radio group"),Object(o.b)(d.a.Group,{initialValue:"a",onChange:function(e){return console.log("selected",e)}},Object(o.b)(d.a,{label:"Option 1",value:"a",mdxType:"RadioButton"}),Object(o.b)(d.a,{label:"Option 2",value:"b",mdxType:"RadioButton"}),Object(o.b)(d.a,{label:"Option 3",value:"c",disabled:!0,mdxType:"RadioButton"})),Object(o.b)(r.a,{mdxType:"Text"},"Controlled radio group"),Object(o.b)(d.a.Group,{selectedValue:"a",onChange:function(e){return console.log("selected",e)}},Object(o.b)(d.a,{label:"Option 1",value:"a",mdxType:"RadioButton"}),Object(o.b)(d.a,{label:"Option 2",value:"b",mdxType:"RadioButton"}),Object(o.b)(d.a,{label:"Option 3",value:"c",disabled:!0,mdxType:"RadioButton"}))),Object(o.b)("h2",{id:"renderitem"},"renderItem"),Object(o.b)("p",null,"All children on a Group must be an instance of it's base component, or at least work with the same props.\nuse ",Object(o.b)("inlineCode",{parentName:"p"},"renderItem")," to render components around each child."),Object(o.b)(a.Fragment,{mdxType:"Fragment"},Object(o.b)(r.a,{mdxType:"Text"},"With option wrapper"),Object(o.b)(l.a.Group,{initialValue:"b",onChange:function(e){return console.log("selected",e)},renderItem:function(e,t){return Object(o.b)(m.a,{width:.25,m:4,mdxType:"Col"},e)}},Object(o.b)(l.a,{fluid:!0,value:"a",mdxType:"Button"},"Button A"),Object(o.b)(l.a,{fluid:!0,value:"b",mdxType:"Button"},"Button B"),Object(o.b)(l.a,{fluid:!0,value:"c",mdxType:"Button"},"Button C"))),Object(o.b)("h2",{id:"select-strategies"},"Select Strategies"),Object(o.b)(a.Fragment,{mdxType:"Fragment"},Object(o.b)(r.a,{mdxType:"Text"},"Pre-defined strategies:"),Object(o.b)(r.a,{fontSize:"small",mdxType:"Text"},"simple"),Object(o.b)(l.a.Group,{strategy:"simple",initialValue:"b",onChange:function(e){return console.log("selected",e)}},Object(o.b)(l.a,{value:"a",mdxType:"Button"},"Button A"),Object(o.b)(l.a,{value:"b",mdxType:"Button"},"Button B"),Object(o.b)(l.a,{value:"c",mdxType:"Button"},"Button C")),Object(o.b)(r.a,{fontSize:"small",mdxType:"Text"},"multi:"),Object(o.b)(l.a.Group,{strategy:"multi",initialValue:["a","b"],onChange:function(e){return console.log("selected",e)}},Object(o.b)(l.a,{value:"a",mdxType:"Button"},"Button A"),Object(o.b)(l.a,{value:"b",mdxType:"Button"},"Button B"),Object(o.b)(l.a,{value:"c",mdxType:"Button"},"Button C")),Object(o.b)(r.a,{mdxType:"Text"},"Custom strategy"),Object(o.b)(l.a.Group,{initialValue:"b",onChange:function(e){return console.log("selected",e)},strategy:{isSelected:function(e,t){return e===t},update:function(e,t){return e===t?void 0:t}}},Object(o.b)(l.a,{value:"a",mdxType:"Button"},"Button A"),Object(o.b)(l.a,{value:"b",mdxType:"Button"},"Button B"),Object(o.b)(l.a,{value:"c",mdxType:"Button"},"Button C"))))}f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/components/group.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-components-group-mdx-db7f9fd3faf59700c642.js.map