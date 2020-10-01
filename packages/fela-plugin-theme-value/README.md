# fela-plugin-theme-value

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-theme-value.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-theme-value.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-theme-value@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-theme-value.svg"></a>

When creating consistent UI, a theme is mandatory too keep everything aligned. With built-in theme support, Fela made that possible from the very beginning.

Yet, using values from the theme can be annoying since one has to access the theme manually and pick the correct values.<br>
With tools like [theme-ui](https://theme-ui.com), a direct string based approach became very popular as it's easy too use and still easy to understand. 

This plugin provides basic support for string-based theme values in Fela.

## Installation
```sh
yarn add fela-plugin-theme-value
```
You may alternatively use `npm i --save fela-plugin-theme-value`.

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import themeValue from 'fela-plugin-theme-value'

const renderer = createRenderer({
  plugins: [ themeValue() ]
})
```

### Configuration
In order to get the right values from the theme, we have to pass an object that maps each property to the respective theme object.

```javascript
import { createRenderer } from 'fela'
import themeValue from 'fela-plugin-theme-value'

const themeMapping = {
  color: theme => theme.colors,
  backgroundColor: theme => theme.colors,
  fontFamily: theme => theme.fonts
}

const themValuePlugin = themeValue(themeMapping)

const renderer = createRenderer({
  plugins: [ themValuePlugin ]
})
```

## Example

Let's imagine we have the following theme:
```json
{
  colors: {
    foreground: {
      primary: "red",
      secondary: "blue",
    },
    background: {
      primary: "black",
      secondary: "white",
    }
  },
  fonts: {
    text: "Helvetica Neue, Arial, sans-serif",
    heading: "Impact, serif"
  }
}
```

#### Input
```javascript
{
  color: "foreground.primary",
  backgroundColor: "background.secondary",
  fontFamily: "heading"
}
```
#### Output
```javascript
{
  color: "red",
  backgroundColor: "white",
  fontFamily: "Impact, serif"
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
