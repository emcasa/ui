(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"./docs/components/view.mdx":function(e,o,n){"use strict";n.r(o),n.d(o,"default",function(){return j});var t=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),i=(n("./node_modules/react/index.js"),n("./node_modules/@mdx-js/react/dist/index.es.js")),a=n("./node_modules/docz/dist/index.esm.js"),s=n("./packages/ui-dom/components/View/index.js"),d=n.n(s),r=n("./packages/ui-dom/components/Row/index.js"),u=n.n(r),l=n("./packages/ui-dom/components/Col/index.js"),c=n.n(l),p=n("./packages/ui-dom/components/Text/index.js"),A=n.n(p),m=n("./packages/ui-dom/components/Button/index.js"),g=n.n(m),B={},b="wrapper";function j(e){var o=e.components,n=Object(t.a)(e,["components"]);return Object(i.b)(b,Object.assign({},B,n,{components:o,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"view"},"View"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"View")," component is a wrapper for an empty and unstyled ",Object(i.b)("inlineCode",{parentName:"p"},"div"),"."),Object(i.b)("h2",{id:"basic-usage"},"Basic usage"),Object(i.b)(a.c,{__position:0,__code:'<View>\n  <View p={4} body>\n    <Text textAlign="justify">\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n      occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </Text>\n  </View>\n  <View p={4} bottom>\n    <Button active fluid>\n      Fixed at the bottom\n    </Button>\n  </View>\n</View>',__scope:{props:this?this.props:n,Playground:a.c,View:d.a,Row:u.a,Col:c.a,Text:A.a,Button:g.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKYADUIBgMYjVldoAAEYCIOIKkkUIIEtSIAXTfQ4EkIiSNwiD2BFUZ0PIqiaP8Vx6MYq0WPXGh2L4kZuPwh0oAEuUhNo0SGKYr5Pikgh2McKB5PVKxsClN1KOotSxM0yTqDYyRLBMwz7WvcIInMMiVIskSrIk7TbOkyQXJuagnI1M1lPlM12jBVBdBRY5Tiw5wCESLF2G4dhgHWKIBGeVArnaAAGdgkxmLB2j3asZg7FgZwKgAWMr2AANjKir1jAYCADFvWgRICv4ZxDgRB1MBgoR-CWIhqEoOBqoRdrq06mhnAgLDLnYABGerKvkGK4qmABBOZ0vYCMoPIGwoHQMNUI5dKxDO6MZHYFFUpgbhgGw5L3rgeQtxrYBLugG7ggAMjB8ZEnmShmmB67bu4JG5TAZDJQGVB2nYAB-DYQbDCN7queHQdQPbqykGQqzfMwYSMzAwDCKApkJh6nop47l2rBNA0lHAusyFIrwIAGa1rTiRlFsXxeIsYZk--q0K8dBEil6XawcrAploLXDqgCAUlQPgQHUPIYjARJxBXdWLAAGSFajODuUJZROKAhVe8dvVHJY4q2WgCD6EIWBmWxyAKaF9YIJY4FzE5rZtmAIDyaaclobNOFirguGQqZwnYOCvC6aEpjdh32CiQ3XBCfWAEdQlceoAFUpjofkE_VjsK7Qfl2FYNvvSWevbHYVBZtRUIcmwDJw4IaIMdyBJvSoAvXCLkfUFsCBclEbmbYseIIGHmZoR8cVCyIVPhz9-vonqLUGLsMJaE4NFi7Lo40A76Wun7GBNnDP0Mc5hWCUCgKEGYc8X79yjtCOAscejQHAa7MB5cYBQlRs8aIo9QhL2_mLaq_Roh9HqGeLACJIHoKOPkTMpw4hbGwb0UO6BojYLHuYfslAuD6BjrnTO-Cay9CgNVdgw89hgEgOHau5QMh8OmgkL2m9ZRcDgVMQuQoXY4AEVITWItv5SAlmrGsjAJZ9gVkrEQEQiBGLFowIKbkQjo37oacBXAbHSy6hAGoORsETG6F4YKRBtGBVctQdxBjZZGIiSRKWUheYEH5oLYWAMpCc2pmYL8IB5rbFcGkf8cBqCAV0CBAwYEsrVn4Kgb2_Arj8B-MWaoGRzQ_jJIyEAlULD8H7gIfI1AansH4IVHAQzCqTXWPwco5B-iQIxv0_gh1Pa_lPt6VpxwYBkkoIkXMeQI6mklOaepfxSxjIqSAKIX8kADJUOGDQcATmdJAJgeY4Ys7wH6eUsWEzEpzJAJtHAAAmYZ9yaz8D2aIS5_BNrNRwAADhwM1YFDywWaR-VC2F8L-DrHJvITJDTvAfGoJAFI-TCnaGKfoBgWUQDpzJFkGpdTTS0HNMi2YMx-A4vkJyoAA",mdxType:"Playground"},Object(i.b)(d.a,{mdxType:"View"},Object(i.b)(d.a,{p:4,body:!0,mdxType:"View"},Object(i.b)(A.a,{textAlign:"justify",mdxType:"Text"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")),Object(i.b)(d.a,{p:4,bottom:!0,mdxType:"View"},Object(i.b)(g.a,{active:!0,fluid:!0,mdxType:"Button"},"Fixed at the bottom")))),Object(i.b)("h2",{id:"elevation"},"Elevation"),Object(i.b)(a.c,{__position:1,__code:'<Row flexWrap="wrap">\n  {Array(24)\n    .fill(null)\n    .map((_, i) => (\n      <Col key={i} p={5} width={1 / 3}>\n        <View elevation={i} bg="lightGrey" pt={10} pb={10}>\n          <Text size="large" textAlign="center" fontWeight="bold">\n            {i}\n          </Text>\n        </View>\n      </Col>\n    ))}\n</Row>',__scope:{props:this?this.props:n,Playground:a.c,View:d.a,Row:u.a,Col:c.a,Text:A.a,Button:g.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKYADUIBgMYjVldoAAEYCIOIKkkUIIEtSIAXTfQ4EkIiSNwiD2BFUZ0PIqiaP8Vx6MYq0WPXGh2L4kZuPwh0oAEuUhNo0SGKYr5Pikgh2McKB5PVKxsClN1KOotSxM0yTqDYyRLBMwz7WvcIInMMiVIskSrIk7TbOkyQXJuagnI1M1lPlM12jBVBdBRY5Tiw5wCESLF2G4dhgHWKIBGeVArnaAAGdgkxmLB2j3asZg7FgZwKgAWMr2AANjKir1jAYCADFvWgRICv4ZxDgRB1MBgoR-CWIhqEoOBqoRdrq06mhnAgLDLnYABGerKvkGK4qmABBOZ0vYCMoPIGwoHQMNUI5dKxDO6MZHYFFUpgbhgGw5L3rgeQtxrYBLugG7ggAMjB8ZEnmShmmB67bu4JG5TAZDJQGVB2nYAB-DYQbDCN7queHQdQPbqykGQqzfMwYSMzAwDCKApkJh6nop47l2rBNA0lHAusyFIrwIAGa1rWTDVgLAAHVMhmPgQBGOXxBXMXgEOgRMkSCMACZ6rfMXDfYHBIASCNUFCBdVcNnAohmCMIwAfSWCB7u4R6o25o2a0YfT2G2GBEk-iA0Pl4AAFY0JxdAJk-zb2EkEr_ut73a04sZ5xgVhogx4O0I8FIFagCAUkIABxLpEn4PsCDjwrQ48Ovk691OxcYBysCmfJ1qL1xcsZEBxhMw7i5SVAFYRPQBGr5aCGlmAS8IBWvGulWW9btWQ5T1upA7kXt6NqR09FnfJH0k-jY5DlycPyRZJPqReYIfnBeFgGpE56mzC_EB5u2Vw0j_jgNQQCugQIGDAllas_BUDegHlcfgPxizVAyOaH8ZIB6VQsPwVgGR8jUH4AgkAhUcAkMKpNdY_ByjkH6DMbs_okDsH4IdV6eFYDQiwN6DBxwYBkkoIkXMeQCgTk1OaJBfxSwUOgSAKIaBCFMJUOGDQcApHYJAJgeY4ZYrERUYwqBYsqGJXkfwTaOAdakNUTWfgppJTGJAJtZqOAAAcOBmqWLUTYi0Vo7EOOca4_g6xybyB_sg7wHxqCQBSEAkB2gwH6AYFlEAtAfRZEIYg00tBzSePNLMGY_BgnyEKUAA",mdxType:"Playground"},Object(i.b)(u.a,{flexWrap:"wrap",mdxType:"Row"},Array(24).fill(null).map(function(e,o){return Object(i.b)(c.a,{key:o,p:5,width:1/3,mdxType:"Col"},Object(i.b)(d.a,{elevation:o,bg:"lightGrey",pt:10,pb:10,mdxType:"View"},Object(i.b)(A.a,{size:"large",textAlign:"center",fontWeight:"bold",mdxType:"Text"},o)))}))))}j&&j===Object(j)&&Object.isExtensible(j)&&Object.defineProperty(j,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/components/view.mdx"}}),j.isMDXComponent=!0},"./packages/ui-dom/components/Button/index.js":function(e,o,n){"use strict";var t=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"),i=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(n("./packages/ui-dom/node_modules/@babel/runtime/helpers/objectSpread.js")),s=i(n("./packages/ui-dom/node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js")),d=i(n("./packages/ui-dom/node_modules/prop-types/index.js")),r=i(n("./node_modules/styled-components/dist/styled-components.browser.esm.js")),u=t(n("./packages/ui/lib/components/Button/index.js")),l=i(n("./packages/ui/lib/components/Group/index.js")),c=i(n("./packages/ui-dom/components/Row/index.js"));function p(){var e=(0,s.default)(["\n  outline: none;\n  ",";\n  cursor: ",";\n  ",";\n  ",";\n  -webkit-font-smoothing: antialiased;\n  border-style: solid;\n"]);return p=function(){return e},e}var A=r.default.button(p(),function(e){return e.fluid&&"display: block"},function(e){return e.disabled?"default":"pointer"},u.container,u.text);A.defaultProps=(0,a.default)({},u.container.defaultProps,u.text.defaultProps),A.propTypes=(0,a.default)({},u.container.propTypes,u.text.propTypes,{children:d.default.node,onClick:d.default.func}),A.displayName="Button",A.Group=(0,l.default)(function(e){var o=e.onSelect,n=e.selected;return{disabled:e.disabled,onClick:o,selected:n}})(c.default);var m=A;o.default=m},"./packages/ui-dom/components/Col/index.js":function(e,o,n){"use strict";var t=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"),i=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(n("./packages/ui-dom/node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js")),s=i(n("./node_modules/styled-components/dist/styled-components.browser.esm.js")),d=t(n("./packages/ui/lib/components/Col/index.js"));function r(){var e=(0,a.default)(["\n  ",";\n"]);return r=function(){return e},e}var u=s.default.div(r(),d.container);u.propTypes=d.container.propTypes;var l=u;o.default=l},"./packages/ui-dom/components/Row/index.js":function(e,o,n){"use strict";var t=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"),i=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(n("./packages/ui-dom/node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js")),s=i(n("./node_modules/styled-components/dist/styled-components.browser.esm.js")),d=t(n("./packages/ui/lib/components/Row/index.js"));function r(){var e=(0,a.default)(["\n  ",";\n"]);return r=function(){return e},e}var u=s.default.div(r(),d.container);o.default=u},"./packages/ui-dom/components/View/index.js":function(e,o,n){"use strict";var t=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"),i=n("./packages/ui-dom/node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(n("./packages/ui-dom/node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js")),s=t(n("./node_modules/styled-components/dist/styled-components.browser.esm.js")),d=n("./packages/ui-dom/node_modules/styled-system/dist/index.esm.js"),r=t(n("./packages/ui/lib/components/View/index.js"));function u(){var e=(0,a.default)(["\n        position: fixed;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        background-color: ",";\n      "]);return u=function(){return e},e}function l(){var e=(0,a.default)(["\n        margin-bottom: ","px;\n      "]);return l=function(){return e},e}function c(){var e=(0,a.default)(["\n  @media only screen and (max-device-width: 600px) {\n    ",";\n    ",";\n  }\n  ",";\n"]);return c=function(){return e},e}var p=s.default.div(c(),function(e){return e.body&&(0,s.css)(l(),(0,d.themeGet)("space.6"))},function(e){return e.bottom&&(0,s.css)(u(),(0,d.themeGet)("colors.white"))},r.container);o.default=p}}]);
//# sourceMappingURL=docs-components-view.a9357d2b523f63d02e1e.js.map