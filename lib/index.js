const path = require('path')

module.exports = ({
  backgroundTemplate = path.join(__dirname, 'background.html'),
  popupTemplate = path.join(__dirname, 'popup.html')
} = {}) => poi => {
  poi.options.html = [
    {
      template: backgroundTemplate,
      filename: 'background.html',
      excludeChunks: ['popup']
    },
    {
      template: popupTemplate,
      filename: 'popup.html',
      excludeChunks: ['background']
    }
  ]
}