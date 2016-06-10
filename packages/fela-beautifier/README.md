# fela-beautifier

The beautifier middleware is a developer tool that automatically formats the rendered CSS markup on every change. It uses [cssbeautify](https://github.com/senchalabs/cssbeautify) to achieve this.

## Configuration
Uses the same options as [cssbeautify](https://github.com/senchalabs/cssbeautify) does.

| option | value | default |description |
| ------ | --- | ------------ | --- |
|ident| `string` |`  ` (2 spaces)| a string used for the indentation of the declaration |
|openbrace| `end-of-line`, `separate-line` |`end-of-line`| placement of open curly brace |
| autosemicolon | `boolean`| `false` | insert semicolon after the last rule |
