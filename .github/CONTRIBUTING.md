# Contributing
Want to get involved? **Awesome!**<br>
Please read the following guide on how to contribute, create issues and send pull requests.

If you have a feature request please create an issue. Also if you're even improving Fela by any kind please don't be shy and send a pull request to let everyone benefit.

## Project setup

We assume that you got [node](https://nodejs.org) and [yarn](https://yarnpkg.com) in your environment. To get started with the repo:

```
git clone git@github.com:rofrischmann/fela.git
cd fela
yarn install
yarn setup
```

**Fela is a collection of multiple packages**. We use the tool [lerna](https://lernajs.io/) to maintain it. All source code can be found in the folder [/packages](packages).

## Commands

In order to run the tests:


Tests:

```
yarn test
```

Linting:

```
yarn lint
```

Flow:

```
yarn flow
```

Formatting:

```
yarn format
```

You can also run all four of them at the same time:

```
yarn check
```

Note: If your tests use other fela packages as depedencies, you might need to run `yarn build` (it's a part of `yarn setup`).

## Tip for developing

Fela contains many examples. It can be handy to smoke test your changes as a part of [example-react](http://fela.js.org/docs/introduction/Examples.html).

## Code Formatting
We use [prettier](https://prettier.io/), an opinionated code formatter. If you're using [Atom](https://atom.io) we recommend [prettier-atom](https://atom.io/packages/prettier-atom) with the **format on save**. If you're using [Sublime](https://www.sublimetext.com/) try [SublimeJSPrettier](https://github.com/jonlabelle/SublimeJsPrettier). For other integrations, please check the prettier's [homepage](https://prettier.io/).

## Guide-Lines
1. Fork the repo and create your feature/bug branch from `master`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure that all tests pass (`yarn check`).

## Creating Issues
### Known Issues
Before creating an issue please make sure it has not aleady been created/solved before. Also please search the docs for possible explanations.
Browse both open **and** closed issues. If you feel something is unclear you might also add it to the docs or FAQ's directly.

### Bugs & Feature Requests
If you found a new bug or got a feature request feel free to file a new issue. For both we got predefined templates which you should fill out as detailed as possible.

## Sending Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Be sure to meet all guide-lines from above. If you're pushing a Work in Progress, please flag it and optionally add a description if something needs to be discussed.
