module.exports = {
  entry: {
    client: '', // placeholder to avoid error thrown by `poi-preset-react`
    popup: 'example-react/popup.js',
    // content: 'example-react/content.js',
    // background: 'example-react/background.js',
  },
  presets: [
    require('poi-preset-react')(),
    require('..')()
  ]
}
