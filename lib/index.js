const path = require('path')

module.exports = ({
  backgroundTemplate = path.join(__dirname, 'background.html'),
  popupTemplate = path.join(__dirname, 'popup.html')
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
}