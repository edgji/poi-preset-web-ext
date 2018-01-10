module.exports = {
  entry: {
    client: 'example-react/content.js',
    popup: 'example-react/popup.js',
    // background: 'example-react/background.js',
  },
  presets: [
    require('poi-preset-react')(),
    require('..')()
  ]
}
