const path = require('path')
const fs = require('fs')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

const defaultManifestTransform = pkg => (content, path) => {
  return Buffer.from(JSON.stringify({
    ...JSON.parse(content.toString()),
    name: pkg.name,
    version: pkg.version,
    ...pkg.description ? {description: pkg.description} : {},
    ...pkg.author ? {author: pkg.author} : {},
  }, null, 2))
}

module.exports = ({
  backgroundTemplate = path.join(__dirname, 'background.html'),
  popupTemplate = path.join(__dirname, 'popup.html'),
  manifestPath = path.join(__dirname, 'manifest.json'),
  manifestTransform = defaultManifestTransform,
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

  const srcManifestPath = path.resolve(poi.options.cwd, 'src', 'manifest.json')
  let copyOptions = []
  copyOptions.push({
    from: fs.existsSync(srcManifestPath) ? srcManifestPath : manifestPath,
    transform: manifestTransform(poi.manifest)
  })

  if (Array.isArray(poi.options.copy)) {
    copyOptions = copyOptions.concat(poi.options.copy)
  } else if (typeof poi.options.copy === 'object') {
    copyOptions.push(poi.options.copy)
  }
  poi.options.copy = copyOptions
}
