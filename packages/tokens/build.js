const StyleDictionaryPackage = require('style-dictionary')

StyleDictionaryPackage.registerFileHeader({
  name: 'myCustomHeader',
  fileHeader: (defaultMessage) => {
    return [...defaultMessage, 'hello?', 'is it me youre looking for?']
  }
})

StyleDictionaryPackage.registerFormat({
  name: 'myCustomFormat',
  formatter: function({dictionary}) {
    return JSON.stringify(dictionary.tokens, null, 2)
  }
})

function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      `src/brands/${brand}/**/*.json`,
      'src/globals/**/*.json',
      `src/platforms/${platform}/**/*.json`
    ],
    platforms: {
      web: {
        transformGroup: 'web',
        buildPath: `build/${platform}/${brand}/`,
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
            options: {
              fileHeader: 'myCustomHeader'
            }
          },
          {
            destination: 'tokens.json',
            format: 'myCustomFormat',
            options: {
              showFileHeader: false
            }
          }
        ]
      }
    }
  }
}

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
;['site', 'garagem'].map(function(brand) {
  ;['web'].map(function(platform) {
    console.log('\n==============================================')
    console.log(`\nProcessing: [${platform}] [${brand}]`)

    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig(brand, platform)
    )

    StyleDictionary.buildPlatform(platform)

    console.log('\nEnd processing')
  })
})
