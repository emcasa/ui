(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./docs/components/button.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return E});var o=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),a=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),A=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),l=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),s=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),B=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),g=n("./node_modules/react/index.js"),c=n.n(g),u=n("./node_modules/@mdx-js/tag/dist/index.js"),m=n("./node_modules/docz/dist/index.esm.js"),i=n("./packages/ui-dom/components/Button/index.js"),r=n.n(i),d=n("./packages/ui-dom/components/Text/index.js"),p=n.n(d),h=n("./packages/ui-dom/components/View/index.js"),D=n.n(h),E=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(l.a)(this,Object(s.a)(t).call(this,e))).layout=null,n}return Object(B.a)(t,e),Object(A.a)(t,[{key:"render",value:function(){var e=this.props,t=e.components,n=Object(o.a)(e,["components"]);return c.a.createElement(u.MDXTag,{name:"wrapper",components:t},c.a.createElement(u.MDXTag,{name:"h1",components:t,props:{id:"button"}},"Button"),c.a.createElement(u.MDXTag,{name:"p",components:t},"Button component."),c.a.createElement(u.MDXTag,{name:"h2",components:t,props:{id:"basic-usage"}},"Basic usage"),c.a.createElement(m.c,{__position:0,__code:'<View m={4}>\n  <Button active>Active</Button>\n  <Button>Normal</Button>\n  <Button disabled>Disabled</Button>\n  <Button link>Link</Button>\n  <Button link disabled>\n    Disabled link\n  </Button>\n  <Button active disabled>\n    Active and disabled\n  </Button>\n  <View my={4}>\n    <Button fluid active>\n      This Button takes up all available space\n    </Button>\n  </View>\n</View>\n<View m={4}>\n  <Button height="tall">Tall</Button>\n  <Button height="medium">Medium</Button>\n  <Button height="short">Short</Button>\n</View>',__scope:{props:this?this.props:n,Playground:m.c,Button:r.a,Text:p.a,View:D.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZr3CCJzCNWV2gAARgIg4gqSRQggS1IgBdN9DgSRCJuahcIgqxsClN0KKomjXDohirWY9caDYyw-O4_D2AANQgGAxlIuVKOo_wRPoxivk-SSCDYpSVLk9V2EDSV0LI01FTBVBdBRY5Tiw5wCESLF2G4dhgHWKIBGeVArnaAAGdgkxmLB2j3asZg7FgZyCgAWCL2AANgiqL1jAYCADFvWgRIgv4ZxDgRB1MBgoR-CWIhqEoOBYoRTLq2ymhnAgLDLnYABGRLovkOyHKmABBOZPPYCMoPIGwoHQMNUI5TyxAm6MZHYFF3JgbhgGw1zNrgeQtxrYBpugObggAMgu8ZEnmShmlO2b5u4F65TAZDJQGVB2nYAB-DYzrDCNFquR7ztQAbqykGQqzfMwYTMzAwDCKApmBpaVqh0bl2rBMLIIHAcsyFIrwII6a1rYyxiIbbEsOlcKcYDjiJCT7WBgMRhrZmApGZ6hyYp2s-dQMQADkhSiKBeaI_mGZrJmZfMFgKg8WB0DELVbFcVXsmlziRblhNhfYKA0G2MQABkzb14iBcZ43TdQXZle1tW7cFzWVbVk2zcN2t2MV92jcV1mYnZ44tZ19W_YsLmw5pHIXajv2bdl3HBcYKn2CIRJafp9PBaFkOwCgeicjNNgOZjmtrFsdhjYIVxtngXIZhCBIQlYVxoFd7oGolRkC4zgP9aD_2qfdqQJ7lzPlOpvOx4V_XfBgCAUkIPgQEbhJxEseIpZH22U-NzY143_gjxYUIiHEPVsgga_U4Nofg-X0_14ITe4GGYVxGcH-CBP0npIae6cpD40JsTUmR0pDY1hmYL8IBGrbFcGkf8cBqCAV0CBAwYEfLVn4Kgb0jIkDsH4D8Ys1QMjmh_GSEh0ULD8HZgIfI1B-BXH4MFHAXDgrVXWPwco5B-gzG7P6Uh_BhrrTwrAaEWBvR0OODAMklBEi5jyAUCcmpzQUL-KWPhBCQBRDQOwshKhwwaDgPoxhIBMDzHDPZZSljSH4IpgI5yJj-DdW4dw80AhyA4AAOxWJrPwGyohxEgG6qlHAAAOHAqVgnWLCbpDxkTolxISSAdYkN5CIMod4D41BIApHQZg7Q2D9AMB8lvKiZIsjsPIaaWgvitGzBmPwXJ8gulAA"},c.a.createElement(D.a,{m:4},c.a.createElement(r.a,{active:!0},"Active"),c.a.createElement(r.a,null,"Normal"),c.a.createElement(r.a,{disabled:!0},"Disabled"),c.a.createElement(r.a,{link:!0},"Link"),c.a.createElement(r.a,{link:!0,disabled:!0},"Disabled link"),c.a.createElement(r.a,{active:!0,disabled:!0},"Active and disabled"),c.a.createElement(D.a,{my:4},c.a.createElement(r.a,{fluid:!0,active:!0},"This Button takes up all available space"))),c.a.createElement(D.a,{m:4},c.a.createElement(r.a,{height:"tall"},"Tall"),c.a.createElement(r.a,{height:"medium"},"Medium"),c.a.createElement(r.a,{height:"short"},"Short"))),c.a.createElement(u.MDXTag,{name:"h1",components:t,props:{id:"buttongroup"}},"Button.Group"),c.a.createElement(u.MDXTag,{name:"p",components:t},"Selectable group of buttons"),c.a.createElement(m.c,{__position:1,__code:'<Button.Group onChange={value => console.log(\'selected\', value)}>\n  <Button value="a">Button A</Button>\n  <Button value="b">Button B</Button>\n  <Button value="c">Button C</Button>\n</Button.Group>',__scope:{props:this?this.props:n,Playground:m.c,Button:r.a,Text:p.a,View:D.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZr3CCJzCNWV2gAARgIg4gqSRQggS1IgBdN9DgSRCJuahcIgqxsClN0KKomjXDohirWY9caDYyw-O4_D2AANQgGAxlIuVKOo_wRPoxivk-SSCDYpSVLk9V2EDSV0LI01FTBVBdBRY5Tiw5wCESLF2G4dhgHWKIBGeVArnaAAGdgkxmLB2j3asZg7FgZyCgAWCL2AANgiqL1jAYCADFvWgRIgv4ZxDgRB1MBgoR-CWIhqEoOBYoRTLq2ymhnAgLDLnYABGRLovkOyHKmABBOZPPYCMoPIGwoHQMNUI5TyxAm6MZHYFF3JgbhgGw1zNrgeQtxrYBpugObggAMgu8ZEnmShmlO2b5u4F65TAZDJQGVB2nYAB-DYzrDCNFquR7ztQAbqykGQqzfMwYTMzAwDCKApmBpaVqh0bl2rBMLIIHAcsyFIrwII6a1rDjiJwABxJCZj2VB7D8GctuAVh4gZDGHMoWAcCgSgUkfOB5y2Wh0Ci9gOagBkOUOlcKcYKnmWlhk-BAVxxGV8xhqkbXyYpymiJVzmtv4DwteN8xrz1q2DcV7WpdN9XyEtzjzHsW33ft2t2Kt2n6YNqR8cJ4nSaOqRsdhswvxARrtlcNJ_zgahAN0ECDDAnzq34VBvUZJB2H4H5i2qDJzR_MkC-iix-FYDJ8mofgrn4YKcDb4LqvWfhynIfoZm7f1C_4Yb1rw2BoSwb0q-OGAyUoRJczyAoJ01c0S7-Usu5zkAojQZui5UcMNDgbfa5ATB5nDezlNPwvs4pnvnIP_huvb9vzQEcgcAAdjPmt-A2VEMPEA3VUo4AABw4FSv_c-QDdIv1AeAqBMCQDrEhvIWOpdvAfGoJAFIydU7aHTvoBgPkQC0B9FkZuxdTS0E_mvWYMx-CYPkGwoAA"},c.a.createElement(r.a.Group,{onChange:function(e){return console.log("selected",e)}},c.a.createElement(r.a,{value:"a"},"Button A"),c.a.createElement(r.a,{value:"b"},"Button B"),c.a.createElement(r.a,{value:"c"},"Button C"))))}}]),t}(c.a.Component);E.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-components-button.aeecf17e8a164da89afe.js.map