# FAQ

## Table of contents
#### General
* [Can I use it together with CSS files?](#can-i-use-it-together-with-css-files)
* [Can I use it together with inline styles?](#can-i-use-it-together-with-inline-styles)
* [Is Fela production-ready?](#is-fela-production-ready)
* [Where does the name "Fela" come from?](#where-does-the-name-fela-come-from)

#### Rules
* [Why do my nested props throw?](#why-do-my-nested-props-throw)

#### Keyframes

#### Fonts
* [Why do my fonts flicker?](#why-do-my-fonts-flicker)

#### Renderer

#### Convenience
* [Can I write my styles as CSS?](#can-i-write-my-styles-as-css)

## General
#### Can I use it together with CSS Files?
**Yes**. Fela is encapsulated and can be integrated into any kind of application and therefore can also be used together with other CSS files/classes.<br>
Just remember that you might again get into specificity problems if you mix different CSS classes from different sources.

#### Can I use it together with inline styles?
**Yes**. You can always use inline styles together with Fela. It can be useful to overwrite single values for specific cases. Also state-depending styles might better fit as inline styles e.g. a progress bar which updates the inner width according to the progress. This might else lead to >100 rendered Fela classes.

#### Is Fela production-ready?
**Yes**. As of version 1.0.0 Fela is production-ready and fully covered with tests. It is already used in many applications in production.

#### Where does the name "Fela" come from?
Fela actually is the name of a character in one of the author's favorite fantasy novel called ["Kingslayer Chronicles"](https://en.wikipedia.org/wiki/The_Kingkiller_Chronicle) by [Patrick Rothfuss](http://www.patrickrothfuss.com/content/index.asp). [Fela](http://kingkiller.wikia.com/wiki/Fela) is a young, attractive and smart woman practicing sculpturing among others at the university of Imre. She's one of [Kvothe](http://kingkiller.wikia.com/wiki/Kvothe)'s (the main protagonist), best friends there.<br>
There is no deep connection to JavaScript styling in general, except the fact that she does sculpturing which seems to be kind of similar to what component styling is lately.

## Rules
#### Why do my nested props throw?
If you are using nested props objects you might have already seen errors like `Cannot read property 'nesting' of undefined` although you always pass the correct props. This is because the renderer initially renders the static subset of each rule using an empty props object. Try not to use nested props at all or read the [Rules - Tips & Tricks](api/Renderer.md#renderrulerule-props) to learn how to solve the issue.

## Keyframes

## Fonts
#### Why do my fonts flicker?

## Renderer

## Convenience
#### Can I write my styles as CSS?
**Yes**. While you traditionally write your Fela styles in JavaScript object notation, there are several tools that allow styles written in pure CSS using [ECMAScript 2015 template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings). You may try [react-styling](https://github.com/halt-hammerzeit/react-styling) for runtime transformation or even use [babel-plugin-css-in-js](https://github.com/jakecoxon/babel-plugin-css-to-js) which was in particular written for Fela rules.
