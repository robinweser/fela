# FAQ

## Table of contents
#### General
* [Can I use it together with CSS files?](#can-i-use-it-together-with-css)
* [Can I use it together with inline styles?](#can-i-use-it-together-with-inline-styles)
* [Is Fela production-ready?](#is-fela-production-ready)
* [Where does the name "Fela" come from?](#where-does-the-name-fela-come-from)

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
