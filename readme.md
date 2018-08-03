# ![mdmath](img/icon.png) Markdown+Math


This is a [fork](https://github.com/goessner/mdmath) that enables file persistent & global KaTeX macros.

- The scope of the global macros defined in the config is the whole workspace.
- The scope of the `\gdef` macros defined in a code block is the whole file below the code block.

```json
"mdmath.globalMacros": {
  "type": "array",
  "default": [
    "\\gdef\\E#1{\\operatorname{\\mathbb{E}}\\!\\big[#1\\big]}",
    "\\gdef\\Eq#1#2{\\operatorname{\\mathbb{E}}_{#1}\\!\\big[#2\\big]}"
  ],
  "items": "string",
  "description": "A list of global macros"
```

## Disclaimer

This extension is built for myself. For others the original version is recommended.
