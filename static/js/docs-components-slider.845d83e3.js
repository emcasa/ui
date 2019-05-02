(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"./docs/components/slider.mdx":function(e,n,t){"use strict";t.r(n);var r=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),i=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),s=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),l=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),c=t("./node_modules/react/index.js"),u=t.n(c),p=t("./node_modules/@mdx-js/tag/dist/index.js"),d=t("./node_modules/docz/dist/index.esm.js"),A=t("./packages/ui-dom/components/Slider/index.js"),g=t.n(A),m=t("./packages/ui-dom/components/View/index.js"),f=t.n(m),b=t("./packages/ui-dom/components/Row/index.js"),y=t.n(b),j=t("./packages/ui-dom/components/Text/index.js"),B=t.n(j),E=function(e){var n=e.children;return u.a.createElement(y.a,{bg:"white",width:60,height:30,justifyContent:"center",alignItems:"center",style:{borderRadius:4,borderWidth:1,borderColor:"#f50057",marginBottom:5,transform:[{translateX:-30}]}},u.a.createElement(B.a,{fontSize:"small",color:"pink"},n))};"undefined"!==typeof children&&children&&children===Object(children)&&Object.defineProperty(children,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"children",filename:"docs/components/slider.js"}}),"undefined"!==typeof children&&children&&children===Object(children)&&Object.defineProperty(children,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"children",filename:"docs/components/slider.js"}}),E&&E===Object(E)&&Object.defineProperty(E,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MarkerLabel",filename:"docs/components/slider.js"}}),E&&E===Object(E)&&Object.defineProperty(E,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MarkerLabel",filename:"docs/components/slider.js"}}),t.d(n,"default",function(){return O});var O=function(e){function n(e){var t;return Object(o.a)(this,n),(t=Object(a.a)(this,Object(s.a)(n).call(this,e))).layout=null,t}return Object(l.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this.props,n=e.components,t=Object(r.a)(e,["components"]);return u.a.createElement(p.MDXTag,{name:"wrapper",components:n},u.a.createElement(p.MDXTag,{name:"h1",components:n,props:{id:"slider"}},"Slider"),u.a.createElement(p.MDXTag,{name:"p",components:n},"Slider component."),u.a.createElement(p.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),u.a.createElement(d.c,{__position:0,__code:'<View m={4}>\n  <Slider\n    onChange={console.log}\n    range={[0, 1]}\n    initialValue={{\n      min: 0,\n      max: 1,\n    }}\n  >\n    <Slider.Marker name="min" />\n    <Slider.Marker name="max" />\n  </Slider>\n</View>',__scope:{props:this?this.props:t,Playground:d.c,Slider:g.a,View:f.a,MarkerLabel:E},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZnCgLgMnQ2V2gAARgIg4gqSRQggS1IgBdN9DgSRCOIgRcIg9gADUIBgMYjTIyjqP8Vw6IYq1mPXGg2P4wTuPw9goL1VwBG2DIABlXECKBUNI91pFONjPlkgg2LgIip3_OAlPVdhA0lQz5TNdowVQXQUWOU4sOcAhEixdhuBU9YogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnaKABZEvYAA2RLkvWMBgIAMW9aBEmi_hnEOBEHUwGChH4JYiGoSg4DShEiurEqaGcCAsMudgAEYspS-QPK8qYAEE5mC9gIyg8gbCgdAw1QjlgrERboxkdgUUCmBuGAbD_KOuB5C3GtgBW6B1uCAAyR7xkSeZKGaO61o27hfrlMBkMlAZUHadgAH4NnusMIy2q4voe1BJurKQZCrN8zBhBzMDAMIoCmGHtt25G5uXasEycggcFKzIUivAhrprWsFLGIgTqyq6V0ZxgOKnTnGb2VB7D8Gdjtu6g4EoWAcCgSgUiR_n-cyEWToAbRipYRoAXXlhWazQF4IHiXj4gZE7gD5hWiDQK51Yt_moiwK4RpS3Wa3kHWFYZ3XuesjIcDUjSSNQb1jv4K3_RAdhNzthMeb9gPNKOYOjz4EAHf4KOva59jfYELPa0kZmvakCmqZpunrqkEm0bML8QAPUzHWoVjJCszjbMA3QQIMMC8IcimXNNRVbX70YXNEmiJPoxivjM5u5MkEVRnc1A-_tSxsClN0KKoyfJJnmT54syQN6wF8PMx-1pvYBPtN0-cFqW-Gw3kLbuB2qNkaXkYVw8FJU5GDYWg_AVw4nQBME6eUYoe18DACAKRCAnSTNAlc6g8gxDAIkRwegaCpwRHoAQICyYhCIikVATYqJwDwfoUEIAVyHVgGbPmXgBBThFB2CAeQrjjWYUKKcAB1LgEwnYu35iwqcjgZZljlAAYjAAAVhijFeRAB2Hqlt1KRWvCICIRArjyNEYzVE7g4AlQEHo9gKtgDGNQFZLIAANK45pkHyE1iud26xi6nylMBAaQ1U5wCiAkDOVApGpxmGgbY4g-a3VWgjGBUhvGV0XqMGuqA65dW2K4NItlqCd2AvoBg5tqz8GToyJA7B-A_GLNUDI5ofxknKaI_grAMj5GoPwK4_AYo4B6TFFq6x-DlHIP0GY3YI5dJADNA6eFYDQiwN6RpxwYBkkoIkXMeQCgTk1OaapfxSwDJKWnVwaBOmVJUOGDQcBDkWCGSsugmBPICWuRU4pjMhm-TOfwEavTenmgEOQHAKibk1n4EPUQFTvl5RwAADhwHlEFtzBA7KtF8kAI1oVwoRXQ6sSN5B1xqd4D41BIApFyek7QXdClgXNiAWgPosidKqaaWg_ydmzBmPwfF7t5BAA"},u.a.createElement(f.a,{m:4},u.a.createElement(g.a,{onChange:console.log,range:[0,1],initialValue:{min:0,max:1}},u.a.createElement(g.a.Marker,{name:"min"}),u.a.createElement(g.a.Marker,{name:"max"})))),u.a.createElement(p.MDXTag,{name:"h2",components:n,props:{id:"fixed-width"}},"Fixed width"),u.a.createElement(d.c,{__position:1,__code:'<View m={4}>\n  <Slider\n    width={200}\n    onChange={console.log}\n    range={[0, 1]}\n    initialValue={{\n      min: 0,\n      max: 1,\n    }}\n  >\n    <Slider.Marker name="min" />\n    <Slider.Marker name="max" />\n  </Slider>\n</View>',__scope:{props:this?this.props:t,Playground:d.c,Slider:g.a,View:f.a,MarkerLabel:E},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZnCgLgMnQ2V2gAARgIg4gqSRQggS1IgBdN9DgSRCOIgRcIg9gADUIBgMYjTIyjqP8Vw6IYq1mPXGg2P4wTuPw9goL1VwBG2DIABlXECKBUNI91pFONjPlkgg2LgIip3_OAlPVdhA0lQz5TNdowVQXQUWOU4sOcAhEixdhuBU9YogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnaKABZEvYAA2RLkvWMBgIAMW9aBEmi_hnEOBEHUwGChH4JYiGoSg4DShEiurEqaGcCAsMudgAEYspS-QPK8qYAEE5mC9gIyg8gbCgdAw1QjlgrERboxkdgUUCmBuGAbD_KOuB5C3GtgBW6B1uCAAyR7xkSeZKGaO61o27hfrlMBkMlAZUHadgAH4NnusMIy2q4voe1BJurKQZCrN8zBhBzMDAMIoCmGHtt25G5uXasEycggcFKzIUivAhrprWsFLGIgTqyq6V0ZxgOKnTnGbzLgJhOgAmGKYqR_n-eoew_BnY7buoOBKFgHAoEoFIJclmtMjlk6AG0YqWEaAF1Na1zhUBeCB4l4-IGRO4A-clog0CuQ2nf5qIsCuEaUvNix5DN_mGa17nrIyHA1I0kjUG9Y7-Bd_0QHYTcPYTHmI6jzSjljo8-BAL3-BTkOufY8OBBL2tJGZkOpApqmabp66pBJtGzC_EAD1Mx1qFYyQrM42zAN0ECDDAvCHIplzTUVW1J9GFzRJoiT6MYr4zN7uTJBFUZ3MtnjLGwKU3Qoqjl8kteZM3izJEPrAXw8zH7Wm9gs-03T5wWpb4bDeQtu4HaUZkY7xGCuDwKR84jBsLQfgK4cToCFsAPK4sVybAgCkQgJ0kwoLJuwdQeQYhgESI4PQNB84Ij0AIWBuD4joNQE2KicByH6FBCAFch1YAOz5l4AQU4RQdggHkK441uFCinAAdUFngH2ft-Y8KnI4NWZY5QAGIwAAFYxbqIAOw9WdupSK14RARCIFcdRsjGaoncHAEqAhTHsD1sAKxqArJZAABpXHNNg-QxsVyB3WLXO-UpgIDSGvnOAUQEhFyoEo_OMw0DbHEHzW6q0EZBykEE5u29Rht1QB3Lq2xXBpFstQYewF9AMEdtWfgudGRIHYPwH4xZqgZHND-MkdTZH8FYBkfI1B-BXH4DFHAwyYotXWPwco5B-gzG7EnQZIAZoHTwrAaEWBvQdOODAMklBEi5jyAUCcmpzRNL-KWcZ1SC6uDQAMhpKhwwaDgBciwkztl0EwJ5ASTz6lVMZpM3ytz-AjRGSM80AhyA4G0c8ms_AZ6iHqUCvKOAAAcOA8rQpeYIY5VpAUgBGki1F6K2HViRvIDuzTvAfGoJAFIJS8naBHhUsCjsQC0B9FkAZjTTS0DBcc2YMx-BksDvIIAA"},u.a.createElement(f.a,{m:4},u.a.createElement(g.a,{width:200,onChange:console.log,range:[0,1],initialValue:{min:0,max:1}},u.a.createElement(g.a.Marker,{name:"min"}),u.a.createElement(g.a.Marker,{name:"max"})))),u.a.createElement(p.MDXTag,{name:"h2",components:n,props:{id:"track-and-marker-styles"}},"Track and marker styles"),u.a.createElement(d.c,{__position:2,__code:"<View mb=\"25px\">\n  <Slider\n    range={[0, 1]}\n    initialValue={1 / 2}\n    trackProps={{ bg: 'lightGrey' }}\n  >\n    <Slider.Marker trackProps={{ height: 4, bg: 'pink' }} />\n  </Slider>\n</View>\n<View mb=\"25px\">\n  <Slider\n    range={[0, 1]}\n    initialValue={[1 / 4, 3 / 4]}\n    trackProps={{ bg: 'lightGrey' }}\n  >\n    <View\n      bg=\"pink\"\n      width={25}\n      height={25}\n      borderRadius={5}\n      trackProps={{ bg: 'pink' }}\n    />\n    <View\n      bg=\"blue\"\n      width={25}\n      height={25}\n      borderRadius={5}\n      trackProps={{ bg: 'blue' }}\n    />\n  </Slider>\n</View>",__scope:{props:this?this.props:t,Playground:d.c,Slider:g.a,View:f.a,MarkerLabel:E},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZnCgLgMnQ2V2gAARgIg4gqSRQggS1IgBdN9DgSRCOIgRcIg9gADUIBgMYjTIyjqP8Vw6IYq1mPXGg2P4wTuPw9goL1VwBG2DIABlXECKBUNI91pFONjPlkgg2LgIip3_OAlPVdhA0lQz5TNdowVQXQUWOU4sOcAhEixdhuBU9YogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnaKABZEvYAA2RLkvWMBgIAMW9aBEmi_hnEOBEHUwGChH4JYiGoSg4DShEiurEqaGcCAsMudgAEYspS-QPK8qYAEE5mC9gIyg8gbCgdAw1QjlgrERboxkdgUUCmBuGAbD_KOuB5C3GtgBW6B1uCAAyR7xkSeZKGaO61o27hfrlMBkMlAZUHadgAH4NnusMIy2q4voe1BJurKQZCrN8zBhBzMDAMIoCmGHtt25G5uXasEycggcFKzIUivAhrprWsFLGIgPD4EAACYAFZEvEFdGcYDip35xmJ3cNIToAbRipYRoAXSR0XRbQF4IHiXj4gZE6RvYSR2A5xWlZrVEJW2aCBzgE6oI8FJoqIlJCAAcS6RJQfkQ2lYZo3BesjIcDUjSSJNnZzcoO4rd8GAIAdggrnG9gbeimY0G2N20M3EXtyFjIve3Znc6ZgSWbZ_hud5kAC4TbOBEzmtMhnY7gGl2WFdriwVZidXNcbyWdb1-Ok119gstbsmjeDs2LYjxO5Xtp2XbT2vK5rRhmbbmsbfZ5PUG2fh14sHF0AmE7uY9o2LE2aPCBPrmz_PrwBCnEUOwgPITtv_fxkyEOp-Aa3bblNvVOqE76iwzmPJWq8i6f03vwDwUAGR7wgUbQ-x9gCn0_pfGON9QFKwfk_F-b9gAf2QUrCeodw5_wTgA9o8CGSL1ITWcB58pDVwLlIfOK4pAUypjTOm10pAkzRmYL8IADymUdNQVikgrKcVsoBXQIEDBgTwg5CmLlTSKltGo0YLlRI0QkvRRiXwzJSLkpIEUox3KoFUfaSw2ApRugolRAxkljEyTMRZSQ9isAvg8pje0012AB00gIHSekFpLXhmGeQW1uA7SjMjSxIwVywJACMGwtAkGM1QXgE6eUYpnywdfYASZCkrnUHkGIYBEiOD0DQdmCI9A1xACueI0dUBNiopbfgTTaAtJXIdWAVsRb4IyM_FgeQ44pTwUKKcAB1LgEwrgjRmaLMZAhHBQCFNFAAxGALmMUYpcwAOw9SVuFSK14RARCIFcLmazGYm1QHAEqAg7nsElsAZ5VksgAA0rjmjKfIOWK53brC9owHxUpgIDSGuzOAUQEj8ELNsgQW8U582QbdVaCMz5SGhQIixoxhGoFEV1bYrg0i2WoAo4C-gGDAHWPwVA3pGRIHYL0osfxSzmh_GSdlaz-CsAyPkag_Arj8BijgaVMUWrMrEfAcg_QZjdn9By_gM0Dp4VgNCLA3oBXHBgGSSgiRcx5AKBOTU5ofjFmqKCEAQqQBRDQBKzlKhwwaDgPK6s_BMDzHDJ5AS3qOVMrHn63ybr-AjRlTK80AhyA4BOT6xm_BNGiA1SAEaeUcAAA4cB5RTTWNN1qrRRqzTm_NhbWnViRvIURdrvAfGoJAFINKyXaEUQysCTKQC0B9FkCVvTTS0Hjda2YMx-D1vdvIIAA"},u.a.createElement(f.a,{mb:"25px"},u.a.createElement(g.a,{range:[0,1],initialValue:.5,trackProps:{bg:"lightGrey"}},u.a.createElement(g.a.Marker,{trackProps:{height:4,bg:"pink"}}))),u.a.createElement(f.a,{mb:"25px"},u.a.createElement(g.a,{range:[0,1],initialValue:[.25,.75],trackProps:{bg:"lightGrey"}},u.a.createElement(f.a,{bg:"pink",width:25,height:25,borderRadius:5,trackProps:{bg:"pink"}}),u.a.createElement(f.a,{bg:"blue",width:25,height:25,borderRadius:5,trackProps:{bg:"blue"}})))),u.a.createElement(p.MDXTag,{name:"h2",components:n,props:{id:"marker-labels"}},"Marker labels"),u.a.createElement(d.c,{__position:3,__code:'<View flexDirection="column">\n  <Slider range={[0, 100]} initialValue={[0, 100]}>\n    <Slider.Marker\n      renderLabel={({ value }) => (\n        <MarkerLabel>{value.toFixed(2)}</MarkerLabel>\n      )}\n    />\n    <Slider.Marker\n      renderLabel={({ value }) => (\n        <MarkerLabel>{value.toFixed(2)}</MarkerLabel>\n      )}\n    />\n  </Slider>\n</View>',__scope:{props:this?this.props:t,Playground:d.c,Slider:g.a,View:f.a,MarkerLabel:E},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwdh5FdY12gPAAvP1-TtKZnCgLgMnQ2V2gAARgIg4gqSRQggS1IgBdN9DgSRCOIgRcIg9gADUIBgMYjTIyjqP8Vw6IYq1mPXGg2P4wTuPw9goL1VwBG2DIABlXECKBUNI91pFONjPlkgg2LgIip3_OAlPVdhA0lQz5TNdowVQXQUWOU4sOcAhEixdhuBU9YogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnaKABZEvYAA2RLkvWMBgIAMW9aBEmi_hnEOBEHUwGChH4JYiGoSg4DShEiurEqaGcCAsMudgAEYspS-QPK8qYAEE5mC9gIyg8gbCgdAw1QjlgrERboxkdgUUCmBuGAbD_KOuB5C3GtgBW6B1uCAAyR7xkSeZKGaO61o27hfrlMBkMlAZUHadgAH4NnusMIy2q4voe1BJurKQZCrN8zBhBzMDAMIoCmGHtt25G5uXasEycggcFKzIUivAhrprWsFKE2AsC1CAuiB6g-CAqBQiIf0QAZxnaw4qcJ3cNIToAbRipYRpimKAF00LQF4IHiXj4gZGW5dGxWVeFkXResjIcDUjTQTJ42a0nbTdPnE6lvYVhte6eQtu4Hao2tm2a0YC3NIEHS9LEYBXb5v8IlKiAagfAAmDl5CkQP7dDlc_aTjORc3bPGcYMWzdTgQ85Fu3g4dqAnagiOGU2wmfb942A_UoOQ_nMPa6jygY7jiNE-TyRi_bqAjZtrPfZzsft0LgQx6kZnhakCmqZpunrqkEm0bML8QAPUzHWoVjJCszjbMA3QQIMMC8IcimXNNRVbTv0YXNEmiJPoxivjMo-5MkEUox3KoFvvaSw2ApRugolRD-klv4yT_hZSQ4CsAvg8pje0012DD0rgtJa8MwwewbtGQBIwVweBSDzEYNhaD8BXDidAEwTp5RikjRmmwIApEICdJMrCVzqDyDEMAiRHB6BoDzBEegS4gBXPEThqAmxUTgBI_QoIZHW0OrAE6wBs5eAEFOEUHYIB5CuONXRQopwAHUuATCuCNFKxs9FTkcFAIU0UADEYAACsisvEAHYerG3CpFa8IgIhECuF4hxItUTuDgCVAQET2DS2ALE1AVksgAA0rjml4fIJWK55BsPYEvFBUpgIDSGjzOAUQEj8ELK4gQPMZhoG2OIbOt1VoI2KduMpG8AGjG3qgXeXVtiuDSLZagF9gL6AYDo6s_BUDekZEgdg_AfjFmqBkc0P4yQrOifwVgGR8jUH4FcfgMUcCXJii1dY_ByjkH6DMbsgtzkgBmgdPCsBoRYG9Hs44MAySUESLmPIBQJyanNBsv4pZbkLJAFENAZy1kqHDBoOAcKLD3MBXQTAnkBIYtWfMxm9zfLIv4CNK5VzzQCHIDgPxmKaz8EfqIVZFK8o4AABw4DyoyrFghIVWnJSAEaHLuW8vURYJG8hd6bO8B8agkAUiTOGdoS-sywI6JALQH0WQznrNNLQGlkLZgzH4DKop8ggA"},u.a.createElement(f.a,{flexDirection:"column"},u.a.createElement(g.a,{range:[0,100],initialValue:[0,100]},u.a.createElement(g.a.Marker,{renderLabel:function(e){var n=e.value;return u.a.createElement(E,null,n.toFixed(2))}}),u.a.createElement(g.a.Marker,{renderLabel:function(e){var n=e.value;return u.a.createElement(E,null,n.toFixed(2))}})))))}}]),n}(u.a.Component);O.isMDXComponent=!0},"./packages/ui-dom/components/Row/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r,o=(r=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"))&&r.__esModule?r:{default:r},i=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};r.get||r.set?Object.defineProperty(n,t,r):n[t]=e[t]}return n.default=e,n}(t("./packages/ui/lib/components/Row/index.js"));function a(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  ",";\n"]);return a=function(){return e},e}var s=o.default.div(a(),i.container);n.default=s},"./packages/ui-dom/components/Text/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("./node_modules/react/index.js")),o=a(t("./node_modules/styled-components/dist/styled-components.browser.esm.js")),i=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};r.get||r.set?Object.defineProperty(n,t,r):n[t]=e[t]}return n.default=e,n}(t("./packages/ui/lib/components/Text/index.js"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  -webkit-font-smoothing: antialiased;\n  ",";\n"]);return l=function(){return e},e}var c=(0,o.default)(function(e){var n=Object.assign({},e);return delete n.inline,delete n.textAlign,e.inline?r.default.createElement("span",n):r.default.createElement("p",n)})(l(),i.container);c.defaultProps=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){s(e,n,t[n])})}return e}({},i.container.defaultProps);var u=c;n.default=u},"./packages/ui-dom/components/View/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("./node_modules/styled-components/dist/styled-components.browser.esm.js")),o=t("./packages/ui-dom/node_modules/styled-system/dist/index.esm.js"),i=a(t("./packages/ui/lib/components/View/index.js"));function a(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};r.get||r.set?Object.defineProperty(n,t,r):n[t]=e[t]}return n.default=e,n}function s(){var e=u(["\n        position: fixed;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        background-color: ",";\n      "]);return s=function(){return e},e}function l(){var e=u(["\n        margin-bottom: ","px;\n      "]);return l=function(){return e},e}function c(){var e=u(["\n  @media only screen and (max-device-width: 600px) {\n    ",";\n    ",";\n  }\n  ",";\n"]);return c=function(){return e},e}function u(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var p=r.default.div(c(),function(e){return e.body&&(0,r.css)(l(),(0,o.themeGet)("space.6"))},function(e){return e.bottom&&(0,r.css)(s(),(0,o.themeGet)("colors.white"))},i.container);n.default=p},"./packages/ui/lib/components/Col/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.container=void 0;var r=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),o=t("./packages/ui/node_modules/styled-system/dist/index.esm.js"),i=t("./packages/ui/lib/components/View/index.js");function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  ","\n  ","\n  ","\n  ","\n  ","\n"]);return s=function(){return e},e}var l=(0,r.css)(s(),i.container,o.flex,o.order,o.alignSelf,o.justifySelf);n.container=l,l.propTypes=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){a(e,n,t[n])})}return e}({},i.container.propTypes,o.flex.propTypes,o.order.propTypes,o.alignSelf.propTypes,o.justifySelf.propTypes)},"./packages/ui/lib/components/Row/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.container=void 0;var r=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),o=t("./packages/ui/node_modules/styled-system/dist/index.esm.js"),i=t("./packages/ui/lib/components/Col/index.js");function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  display: flex;\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n"]);return s=function(){return e},e}var l=(0,r.css)(s(),i.container,o.flexWrap,o.flexBasis,o.flexDirection,o.alignItems,o.justifyContent);n.container=l,l.propTypes=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){a(e,n,t[n])})}return e}({},i.container.propTypes,o.flexWrap.propTypes,o.flexBasis.propTypes,o.flexDirection.propTypes,o.alignItems.propTypes,o.justifyContent.propTypes)},"./packages/ui/lib/components/Text/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.container=void 0;var r=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),o=t("./packages/ui/node_modules/styled-system/dist/index.esm.js"),i=t("./packages/ui/lib/styles/index.js");function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n"]);return s=function(){return e},e}var l=(0,r.css)(s(),i.defaultFontFamily,i.letterSpacing,o.color,i.fontSize,i.fontWeight,o.fontFamily,o.fontStyle,o.lineHeight,o.textAlign);n.container=l,l.propTypes=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){a(e,n,t[n])})}return e}({},i.letterSpacing.propTypes,o.color.propTypes,i.fontSize.propTypes,i.fontWeight.propTypes,o.fontFamily.propTypes,o.fontStyle.propTypes,o.lineHeight.propTypes,o.textAlign.propTypes),l.defaultProps={fontSize:"default",color:"dark"}},"./packages/ui/lib/components/View/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.container=void 0;var r,o=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),i=t("./packages/ui/node_modules/styled-system/dist/index.esm.js"),a=(r=t("./packages/ui/lib/styles/elevation/index.js"))&&r.__esModule?r:{default:r};function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n"]);return l=function(){return e},e}var c=(0,o.css)(l(),i.space,i.width,i.maxWidth,i.minWidth,i.height,i.maxHeight,i.minHeight,i.order,i.flex,i.alignSelf,i.backgroundColor,a.default);n.container=c,c.propTypes=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){s(e,n,t[n])})}return e}({},i.space.propTypes,i.width.propTypes,i.minWidth.propTypes,i.maxWidth.propTypes,i.height.propTypes,i.minHeight.propTypes,i.maxHeight.propTypes,i.flex.propTypes,i.order.propTypes,i.alignSelf.propTypes,i.backgroundColor.propTypes,a.default.propTypes),c.defaultProps={body:!1,bottom:!1}},"./packages/ui/lib/styles/breakpoint.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=n.isMobile=n.only=n.down=n.up=void 0;var r=function(e,n){var t=n.breakpointNames.indexOf(e);return-1!==t?t:void 0},o=function(e){return function(n){var t=n.theme,o=r(e,t),i=parseInt(t.breakpoints[o]);return"(min-width: ".concat(i,"px)")}};n.up=o;var i=function(e){return function(n){var t=n.theme,o=r(e,t),i=parseInt(t.breakpoints[o+1]);return isNaN(i)?"(min-width: 0px)":"(max-width: ".concat(i-1,"px)")}};n.down=i;var a=function(e){return function(n){var t=n.theme,o=r(e,t),i=parseInt(t.breakpoints[o]),a=parseInt(t.breakpoints[o+1]);return isNaN(a)?"(min-width: ".concat(i,"px)"):"(min-width: ".concat(i,"px) and (max-width: ").concat(a-1,"px)")}};n.only=a;var s=function(e){return-1!==["tablet","phone"].indexOf(e)};n.isMobile=s;var l={up:o,down:i,only:a,isMobile:s};n.default=l},"./packages/ui/lib/styles/elevation/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=s;var r,o=(r=t("./node_modules/prop-types/index.js"))&&r.__esModule?r:{default:r};function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(l){o=!0,i=l}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var a=function(e){var n=e.elevation,t=e.theme,r=t.shadows,o=t.shadowOpacity;return Object.entries(r[n]).map(function(e){var n,t,r,a,s,l=i(e,2),c=l[0],u=l[1];return"".concat((n=u,t=n.x,r=n.y,a=n.radius,s=n.spread,"".concat(t,"px ").concat(r,"px ").concat(a,"px ").concat(s,"px"))," rgba(0,0,0,").concat(o[c],")")})};function s(e){if(e.elevation)return"box-shadow: ".concat(a(e).join(","),";")}s.propTypes={elevation:o.default.number}},"./packages/ui/lib/styles/index.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"elevation",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(n,"breakpoint",{enumerable:!0,get:function(){return s.default}}),n.defaultFontFamily=n.fontWeight=n.fontSize=n.iconWidth=n.iconHeight=n.iconSize=n.buttonHeight=n.letterSpacing=void 0;var r=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};r.get||r.set?Object.defineProperty(n,t,r):n[t]=e[t]}return n.default=e,n}(t("./packages/ui/node_modules/styled-system/dist/index.esm.js")),o=t("./packages/ui/lib/utils.js"),i=t("./packages/ui/lib/theme/measures.js"),a=l(t("./packages/ui/lib/styles/elevation/index.js")),s=l(t("./packages/ui/lib/styles/breakpoint.js"));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=function(e){return function(n){return isNaN(n)?n:"".concat(n).concat(e)}},p=(0,o.enumeratedStyle)({map:i.LETTER_SPACING,prop:"letterSpacing",cssProperty:"letterSpacing",key:"letterSpacing",transformValue:u("px")});n.letterSpacing=p;var d=(0,o.enumeratedStyle)({map:i.BUTTON_HEIGHT,prop:"height",cssProperty:"height",key:"buttonHeight",transformValue:u("px")});n.buttonHeight=d;var A=function(e){return(0,o.enumeratedStyle)(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){c(e,n,t[n])})}return e}({map:i.ICON_SIZE,prop:"size",key:"iconSize",transformValue:u("px")},e))};n.iconSize=A;var g=A({cssProperty:"height"});n.iconHeight=g;var m=A({cssProperty:"height"});n.iconWidth=m;var f=(0,o.enumerated)(i.FONT_SIZE,"fontSize")(r.fontSize);n.fontSize=f;var b=(0,o.enumerated)(i.FONT_WEIGHT,"fontWeight")(r.fontWeight);n.fontWeight=b;n.defaultFontFamily=function(e){var n=e.theme.fontFamily;return n?"font-family: ".concat(n,";"):null}},"./packages/ui/lib/utils.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.withProps=n.enumeratedStyle=n.enumerated=void 0;var r=t("./packages/ui/node_modules/styled-system/dist/index.esm.js");function o(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){a(e,n,t[n])})}return e}function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=function(e,n){return function(t){return Object.assign(function(r){var o=r[n],a=i({},r);return e&&"string"==typeof o&&e.has(o)&&(a[n]=e.get(o)),t(a)},t)}};n.enumerated=s;n.enumeratedStyle=function(e){var n=e.map,t=o(e,["map"]);return s(n,t.prop)((0,r.style)(t))};n.withProps=function(e){return function(n){return n.map(function(n){return"function"===typeof n?function(t){return n(i({},t,e))}:n})}}}}]);
//# sourceMappingURL=docs-components-slider.ef05ebd3e2915452795d.js.map