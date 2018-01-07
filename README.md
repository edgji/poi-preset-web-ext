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


Suffix poi build command with `--manifest` to generate extension manifest.json file:

```bash
poi build --manifest
```

See [a complete example](./example-react)

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
Default: [`./lib/manifest.js`](./lib/manifest.js)

Path to the module providing the json for generated `manifest.json`.
