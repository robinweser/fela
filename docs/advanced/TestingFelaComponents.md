# Testing Fela Components

There is no required library for testing Fela components. Since Fela is [framework-agnostic](../introduction/Benefits.md), you may use any javascript testing library to test your components. Fela's source is already [fully tested](https://codeclimate.com/github/rofrischmann/fela/coverage), so your tests should only confirm that Fela's styles are interacting correctly with the components.

## Approach

#### Testing the Renderer
The [`renderer`](../basics/Renderer.md) is only responsible for _inserting the styles into the application_ and _providing your components a reference to the styles_. Therefore, our tests should ensure these two responsibilities work correctly with our components.

#### Testing Rules
[Rules are just pure functions](../basics/Rules.md). Eric Elliot, a respected Javascript instructor in the industry, [defines pure functions for us](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976).

> A pure function is a function which: 

> - Given the same input, will always return the same output.
> - Produces no side effects.
> - Relies on no external mutable state.

Since our rules will follow this definition, our tests can simply ensure our rules _output the correct styles for every input._

## Implementation

We will use [Jest](https://facebook.github.io/jest/) in the following examples, but since any testing library can be used to test Fela components, feel free to apply the approaches above to the library that best suites you. Please be familiar with [how to setup Jest](https://facebook.github.io/jest/docs/en/getting-started.html#content) and [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html#content) to find the examples useful.

### A Basic Test
Here is what a basic test for a Fela React component looks like.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import { createRenderer } from 'fela';
import { Provider, createComponent } from 'react-fela';

const boxRules = ({ size = 10 }) => ({
  width: size + 'px',
  height: size + 'px',
  backgroundColor: 'red',
});

const Box = createComponent(boxRules);

describe('Box', () => {
  it('should render component', () => {
    const felaRenderer = createRenderer();
    const component = renderer.create(
      <Provider renderer={felaRenderer}>
        <Box>hello</Box>
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
```

Our `expect` case creates a JSON snapshot of the component with `react-test-renderer` and compares it to any previous snapshots for changes (Jest feature).
```json
exports[`Box should render component 1`] = `
<div
  className="a b c"
  id={undefined}
  style={undefined}
>
  hello
</div>
`;
```

This is not great. There is a lot of boilerplate to simply test if the component renders. Also, since Fela needs the `renderer` context to create the styles, we must wrap every component in Fela's `<Provider />`. Even after this setup, we're really not testing much about the style of the component. It would be great to get rid of the boilerplate and track changes to the styles themselves (not just the classNames).

### Improving Our Test
From examining a basic test for Fela components, we want to focus on reducing boilerplate and improving our test coverage. To achieve this, let's create some helper functions that can be imported into any of our tests.

#### Simplifying the `<Provider />`
Fela components need a `renderer` and an optional `theme` available their React `context` in order to render. Since fela supplies a `<Provider />` and optional `<ThemeProvider />` to supplies these values, we must wrap all of our tested components with them. To keep our code DRY, let us create a simple helper function that does this for us.

```javascript
// test-helpers/felaSnapshot.js
import React from 'react';
import renderer from 'react-test-renderer';
import { createRenderer } from 'fela';

function felaSnapshot(component) {
  const felaRenderer = createRenderer();
  return renderer.create(
    <Provider renderer={felaRenderer}>
      {component}
    </Provider>
  ).toJSON();
}

export default felaSnapshot;
```

Now, instead of declaring this function in every test, we can import it from one central location. Let's take a look at our basic test utilizing this function.
```javascript
import React from 'react';
import { createComponent } from 'react-fela';
import felaSnapshot from './test-helpers/felaSnapshot.js';

const boxRules = ({ size = 10 }) => ({
  width: size + 'px',
  height: size + 'px',
  backgroundColor: 'red',
});

const Box = createComponent(boxRules);

describe('Box', () => {
  it('should render component', () => {
    const snapshot = felaSnapshot(<Box>hello</Box>);
    expect(snapshot).toMatchSnapshot();
  });
});
```

Much cleaner!

#### Better Test Coverage
We've got a test helper to help create component snapshots for our tests, so let us focus on test coverage now. In our `<Box />` component from the basic example, passing a `size` property would change the size of the box. That seems like an important thing to test, so let us create a test for that now.

```javascript
...
  it('should change box size when size prop is passed', () => {
    const snapshot = felaSnapshot(<Box size={50}>hello</Box>);
    expect(snapshot).toMatchSnapshot();
  });
...
```

Now look at the snapshot output.
```json
exports[`Box should change box size when size prop is passed 1`] = `
<div
  className="a b c"
  id={undefined}
  style={undefined}
>
  hello
</div>
`;
```

The snapshot does not indicate anything has actually changed. Because the `classNames` just reference the styles that fela generates, we should output those styles to our snapshot as well. Since this output is just a CSS string, we can save it alongside our component snapshot. For this, we are going to need to extend our helper function.

```javascript
// test-helpers/felaSnapshot.js
import React from 'react';
import renderer from 'react-test-renderer';
import { createRenderer } from 'fela';

// splits the css string into a more readable format (credit: este's source)
const prettifyFelaString = (str) => str.replace(/\.[a-z]+/g, '\n    $&');

function felaSnapshot(component) {
  const felaRenderer = createRenderer();

  // output an object with both the component snapshot and raw styles
  return {
    component: renderer
      .create(
        <Provider renderer={felaRenderer}>
          {component}
        </Provider>
      )
      .toJSON(),
    styles: prettifyFelaString(felaRenderer.renderToString()),
  };
}

export default felaSnapshot;
```

`felaSnapshot` now snapshots both the React component output and the styles generated by Fela. If we look at our test snapshots now, we can see the difference when the `size` prop changes.

```json
exports[`Box should change box size when size prop is passed 1`] = `
Object {
  "component": <div
    className="a b c"
    id={undefined}
    style={undefined}
>
    hello
</div>,
  "styles": "
    .a{width:50px}
    .b{height:50px}
    .c{background-color:red}",
}
`;

exports[`Box should render component 1`] = `
Object {
  "component": <div
    className="a b c"
    id={undefined}
    style={undefined}
>
    hello
</div>,
  "styles": "
    .a{width:10px}
    .b{height:10px}
    .c{background-color:red}",
}
`;
```

### Wrap Up
These helper functions make testing the React code much easier. Your code-base may obviously require further functionality, but this provides a solid foundation to build off of.

Here is the full example.

```javascript
// Box.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { createRenderer } from 'fela';
import { Provider, createComponent } from 'react-fela';

const boxRules = ({ size = 10 }) => ({
  width: size + 'px',
  height: size + 'px',
  backgroundColor: 'red',
});

const Box = createComponent(boxRules);

const prettifyFelaString = str => str.replace(/\.[a-z]+/g, '\n    $&');

function felaSnapshot(component) {
  const felaRenderer = createRenderer();

  return {
    component: renderer
      .create(
        <Provider renderer={felaRenderer}>
          {component}
        </Provider>
      )
      .toJSON(),
    styles: prettifyFelaString(felaRenderer.renderToString()),
  };
}

describe('Box', () => {
  it('should render component', () => {
    const snapshot = felaSnapshot(<Box>hello</Box>);
    expect(snapshot).toMatchSnapshot();
  });
  it('should change box size when size prop is passed', () => {
    const snapshot = felaSnapshot(<Box size={50}>hello</Box>);
    expect(snapshot).toMatchSnapshot();
  });
});
```

You may also consider [Enzyme](http://airbnb.io/enzyme/) as your React renderer (instead of `react-test-renderer`). They have a powerful API, and using [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json), you can still utilize Jest's powerful snapshot testing. Their `shallow` and `mount` rendering also provides an API to explicitly pass your own context, so there is no more need for Fela's `<Provider />`. Here are some wrappers around these Enzyme functions to support Fela.

```javascript
// test-helpers/felaShallow.js
import React from 'react';
import { shallow as enzymeShallow } from 'enzyme';
import { createRenderer } from 'react-fela';
import toJson from 'enzyme-to-json';

const shallow = (node, options = {}) => {
  const renderer = createRenderer();
  const component = enzymeShallow(node, {
    context: {
      renderer,
      // theme,
    },
    ...options,
  });

  component.snapshot = function snapshot() {
    return {
      component: toJson(this),
      // you should prettify this string
      styles: renderer.renderToString(),
    };
  };

  return component;
};

console.log(shallow(<Box>hello</Box>).snapshot());
// Object {
//   "component": <div
//     className="a b c"
// >
//     hello
// </div>,
//   "styles": ".a{width:10px}.b{height:10px}.c{background-color:red}",
// }
```


```javascript
// test-helpers/felaMount.js
import React from 'react';
import PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
import { createRenderer } from 'react-fela';
import toJson from 'enzyme-to-json';

const mount = (node, options = {}) => {
  const renderer = createRenderer();
  const component = enzymeMount(node, {
    childContextTypes: {
      renderer: PropTypes.object,
      // theme: PropTypes.object,
    },
    context: {
      renderer,
      // theme,
    },
    ...options,
  });

  component.snapshot = function snapshot() {
    return {
      component: toJson(this),
      // you should prettify this string
      styles: renderer.renderToString(),
    };
  };

  return component;
};

console.log(mount(<Box>hello</Box>).snapshot());
// Object {
//   "component": <boxRules>
//     <div
//         className="a b c"
//     >
//         hello
//     </div>
// </boxRules>,
//   "styles": ".a{width:10px}.b{height:10px}.c{background-color:red}",
// }
```

Happy testing!
