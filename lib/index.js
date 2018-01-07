const path = require('path')
const fs = require('fs')

module.exports = ({
  backgroundTemplate = path.join(__dirname, 'background.html'),
  popupTemplate = path.join(__dirname, 'popup.html'),
  manifestPath = path.join(__dirname, 'manifest.js')
} = {}) => poi => {
  poi.options.html = [
    {
      template: backgroundTemplate,
      filename: 'background.html',
      chunks: ['background']
    },
    {
      template: popupTemplate,
      filename: 'popup.html',
      chunks: ['popup']
    }
  ]

  poi.extendWebpack(config => {
    config.entryPoints.delete('client')
  })

  if (!poi.argv.manifest) return

  poi.run('production', webpackConfig => {
    const manifest = require(manifestPath)
    const manifestJson = JSON.stringify(manifest(poi.manifest), null, 2)
    const outputPath = path.join(webpackConfig.output.path, 'manifest.json')
    poi.once('compile-done', () => fs.writeFileSync(outputPath, manifestJson))
  })
}
