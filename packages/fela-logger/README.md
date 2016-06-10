# fela-logger

> **Warning**: The logger is still in development. Right now it simple only logs newly rendered CSS.

The logger middleware is, as the name already tells, used for logging. It will log every time the Renderer actually emits a change (which is not necessarily on every render-call).

## Configuration
| option | type | default | description |
| ------ | --- | ------------ | --- |
|beautify|`boolean`| `false`|print beautified or minified CSS markup|
