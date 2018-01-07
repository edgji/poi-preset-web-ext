module.exports = pkg => {
  return {
    "manifest_version": 2,
    "name": pkg.name || "",
    "version": pkg.version,
    "description": pkg.description || "",
    "browser_action": {
      "default_title": pkg.name,
      "default_popup": "popup.html"
    },
    "author": pkg.author || "",
    "background": {
      "page": "background.html"
    }
  }
}
