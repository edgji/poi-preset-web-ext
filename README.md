# poi-preset-web-ext

## Install

```bash
yarn add poi-preset-web-ext --dev
```

## Usage

```js
module.exports = {
  presets: [
    require('poi-preset-web-ext')()
  ],
  // To use with React:
  // The order matters!
  presets: [
    require('poi-preset-react')(),
    require('poi-preset-web-ext')()
  ]
}
```

See [a complete example](./example-react)


## manifest.json generation

Suffix poi dev/build command with `--manifest` to generate extension manifest.json file:

```bash
poi --manifest
poi build --manifest
```

By default the preset will look for existing `manifest.json` file to copy to dist path in src

## Options

### popupTemplate

Type: `string`<br>
Default: [`./lib/popup.html`](./lib/popup.html)

Path to the HTML template for generated `popup.html`.

### backgroundTemplate

Type: `string`<br>
Default: [`./lib/background.html`](./lib/background.html)

Path to the HTML template for generated `background.html`.

### manifestPath

Type: `string`<br>
Default: [`./lib/manifest.json`](./lib/manifest.json)

Path to default manifest.json file that is copied to dist if one is not found in src directory.

### pluginOptions

Type: `object`<br>
Default: `{}`

Options for [webpack-chrome-extension-reloader](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader).
