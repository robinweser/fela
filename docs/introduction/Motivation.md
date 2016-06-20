# Motivation

In November 2014, [Christopher "vjeux" Chedeau](https://twitter.com/vjeux?lang=de), who is working on [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) at Facebook, gave a thought-provoking talk titled ["CSS in JS"](https://speakerdeck.com/vjeux/react-css-in-js). He outlined the problems of CSS at scale and later showed how they solved those at Facebook. They were able to solve most, but in return had to add a lot of additional tooling.

Then he introduced a complete new approach to handle those issues without any actual extra work. **Using inline styles**. It seemed crazy, but just worked magically.

To make a long story short, soon after the talk, dozens of libraries grew on Github. Most of them were built directly for React while others were more open. <br>
For a quick overview, check out [Michele Bertoli](https://twitter.com/MicheleBertoli)'s great  [css-in-js](https://github.com/MicheleBertoli/css-in-js) repository.

Fela's creator, [Robin Frischmann](https://twitter.com/rofrischmann), also published a solution called [react-look](https://github.com/rofrischmann/react-look) himself. It was nicely accepted by the community and grew to a proud number of 550 stars at the time of writing this article.<br>
Still he noticed that with each new feature and different use-case it would get more and more complicated to handle all the different components. He found that one of the major problems was the deep binding to React itself as well as the approach to satisfy **every** single use-case by providing numerous configuration options and several APIs.<br>

After a long period of research and a lot gained experience with CSS in JS techniques, he created a whole new approach which became the library we now know as Fela.

Like many powerful and widely adopted libaries such as [React](https://github.com/facebook/react) or [Redux](https://github.com/reactjs/redux), **Fela does not explicitly tell you how to write your styles, but rather gives you some nice and simple APIs to help you build your styling environment.**

## Goals
There is one important feature of react-look which turned out to be really useful in real applications: **dynamic styling**.
There it seems quite logical that Fela is designed to be dynamic by default.

Despite many benefical [side effects](Benefits.md), Fela actually only has two major goals.

1. Make styling **dynamic by default**
2. Be **framework-agnostic**, that is being used with any view library

Read about the [principles](Principles.md) to understand how and why Fela is dynamic by default.
