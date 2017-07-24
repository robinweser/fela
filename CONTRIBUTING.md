# Contributing to Fela

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

```
yarn test
```

Or the linter: 

```
yarn lint
```

Or the flow:

```
yarn flow
```

You can also run all three of them at the same time:

```
yarn check
```

Note: If your tests use other fela packages as depedencies, you might need to run `yarn build` (it's a part of `yarn setup`).

## Tip for developing

Fela contains many examples. It can be handy to smoke test your changes as a part of [example-react](http://fela.js.org/docs/introduction/Examples.html).


