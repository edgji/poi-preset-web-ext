const path = require('path')
const fs = require('fs')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

module.exports = ({
  backgroundTemplate = path.join(__dirname, 'background.html'),
  popupTemplate = path.join(__dirname, 'popup.html'),
  manifestPath = path.join(__dirname, 'manifest.js'),
  pluginOptions = {}
} = {}) => poi => {

  poi.options.html = []

  if (backgroundTemplate) {
    poi.options.html.push({
      template: backgroundTemplate,
      filename: 'background.html',
      chunks: ['background']
    })
  }
  if (popupTemplate) {
    poi.options.html.push({
      template: popupTemplate,
      filename: 'popup.html',
      chunks: ['popup']
    })
  }

  poi.extendWebpack('watch', config => {
    config.plugin('chrome-reloader')
      .use(ChromeExtensionReloader, [Object.assign({
        port: 4040,
        entries: {
          'content-script': 'client',
          background: 'background'
        }
      }, pluginOptions)])
  })

  if (!poi.argv.manifest) return

  poi.run('production', webpackConfig => {
    const manifest = require(manifestPath)
    const manifestJson = JSON.stringify(manifest(poi.manifest), null, 2)
    const outputPath = path.join(webpackConfig.output.path, 'manifest.json')
    poi.once('compile-done', () => fs.writeFileSync(outputPath, manifestJson))
  })
}
