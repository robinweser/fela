# fela-enzyme

<a href="https://bundlephobia.com/result?p=fela-enzyme@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-enzyme.svg"></a>

NPM package shipping utilities for working with [Fela](fela.js.org) in the context of enzyme.

Check out the [Fela repository](https://github.com/robinweser/fela) for further information.
Â
## felaShallow

**For testing** This is the interface to use if you want to use enzyme's
`shallow` function with Fela components. It takes in the same parameters as
enzyme's shallow: `node` and `options`. It returns an object with keys:
`wrapper` and `snapshot`. In addition you can pass an optional `theme` to it, if
not specified, it uses the default frontend theme. You can also pass your own `createRenderer` function to it, otherwise it uses Fela's out of the box `createRenderer` by default.

It returns:

* `wrapper`: The root enzyme wrapper returned from enzyme's shallow function.
* `snapshot`: A function which takes as a parameter an enzyme `ShallowWrapper`,
  either the root, returned from the initial call to `felaShallow`, or from
  targeting descendants of the root wrapper. If the enzyme wrapper is around a
  single node, returns an object with keys: component, style. otherwise returns
  an array where each element in the array is an object with keys: component,
  style where the snapshot for that element is stored.

  The `snapshot` function takes an additional parameter `includeStyles` prop
  which is by default true, if false then styles are omitted from the captured
  snapshot. This will make it act like a normal enzyme shallow snapshot capture
  (i.e. we will not dive into fela components and render them).
* `felaDive`: A function which takes as a parameter an enzyme `ShallowWrapper`,
  either the root, returned from the initial call to `felaShallow`, or from
  targeting descendants of the root wrapper. It is meant to be used with an `enzymeWrapper` which has a single child. If the child is a Fela component or Fela theme provider, then the render tree is `dive`ed until we get to the underlying component and it is returned. If neither of these conditions are met, then the original passed in component is returned.



### usage

```js
import React from 'react';
import PropTypes from 'prop-types';
import { felaShallow}  from 'fela-enzyme';
import { createComponent } from 'react-fela';

const theme = {
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64, 80],
  color: {
    grass: '#9BCA3E',
    black: '#000'
  },
  fontSize: '15px'
};

describe('felaShallow', () => {
  describe('component created with createComponent', () => {
    it('should return a formatted snapshot object with DOM and styles', () => {
      const Div = createComponent(() => ({ color: 'black' }));
      const { wrapper, snapshot } = felaShallow(<Div />, {}, theme);
      expect(snapshot(wrapper)).toMatchSnapshot();
      // Object {
      //   "component": <div
      //     className="a"
      //   />,
      //   "styles": "
      // .a {
      //   color: black
      // }
      // ",
      // }
    });

    it('should return a shallow snapshot without styles(essentially same as enzyme shallow and enzyme-to-json) ', () => {
      const Div = createComponent(() => ({ color: 'black' }));
      const { wrapper, snapshot } = felaShallow(<Div />, {}, theme);
      expect(snapshot(wrapper, false)).toMatchSnapshot();
      // Object {
      //   "component": <FelaComponent
      //     _felaTheme={
      //       Object {
      //         "color": Object {
      //           "black": "#000",
      //           "grass": "#9BCA3E",
      //         },
      //         "fontSize": "15px",
      //         "fontSizes": Array [
      //           10,
      //           12,
      //           14,
      //           16,
      //           20,
      //           24,
      //           32,
      //           48,
      //           64,
      //           80,
      //         ],
      //       }
      //     }
      //   />,
      // }
    });
  });

  describe('nested fela components', () => {
    const boxRules = ({ size = 10, theme }) => {
      return {
        width: size + 'px',
        height: size + 'px',
        color: theme.color.grass
      };
    };
    const Box = createComponent(boxRules);
    const InnerBox = createComponent(boxRules);

    let component;
    beforeEach(() => {
      component = (
        <Box>
          <InnerBox size={'15'}>text</InnerBox>
          <InnerBox>text</InnerBox>
        </Box>
      );
    });

    it('should snapshot root level box', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, theme);
      expect(snapshot(wrapper)).toMatchSnapshot();
      // Object {
      //   "component": <div
      //     className="a b c"
      //   >
      //     <FelaComponent(div)
      //       size="15"
      //     >
      //       text
      //     </FelaComponent(div)>
      //     <FelaComponent(div)>
      //       text
      //     </FelaComponent(div)>
      //   </div>,
      //   "styles": "
      // .a {
      //   width: 10px
      // }
      //
      // .b {
      //   height: 10px
      // }
      //
      // .c {
      //   color: #9BCA3E
      // }
      // ",
      // }
    });

    it('should snapshot children boxes', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, theme);
      const children = wrapper.find(InnerBox);
      expect(snapshot(children)).toMatchSnapshot();
      // Array [
      //   Object {
      //     "component": <div
      //       className="a b c"
      //     >
      //       text
      //     </div>,
      //     "styles": "
      // .a {
      //   width: 15px
      // }
      //
      // .b {
      //   height: 15px
      // }
      //
      // .c {
      //   color: #9BCA3E
      // }
      // ",
      //   },
      //   Object {
      //     "component": <div
      //       className="a b c"
      //     >
      //       text
      //     </div>,
      //     "styles": "
      // .a {
      //   width: 10px
      // }
      //
      // .b {
      //   height: 10px
      // }
      //
      // .c {
      //   color: #9BCA3E
      // }
      // ",
      //   },
      // ]
    });

    it('should snapshot not found objects', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, theme);
      const noChild = wrapper.find('foo');
      expect(snapshot(noChild)).toMatchSnapshot('no child');
      //Array []
    });
  });
});
```

## felaMount

**For testing** This is the interface to use if you want to use enzyme's `mount`
function with Fela components. It takes in the same parameters as enzyme's
mount: `node` and `options`. It returns an object with keys: `wrapper` and
`snapshot`. In addition you can pass an optional `theme` to it, if not
specified, it uses the default frontend theme. You can also pass your own `createRenderer` function to it, otherwise it uses Fela's out of the box `createRenderer` by default.

* `wrapper`: The root enzyme wrapper returned from enzyme's mount function.
* `snapshot`: A function which takes as a parameter an enzyme `ReactWrapper`,
  the root, returned from the initial call to `felaMount`. It returns an object
  with keys: component, style.
* The `snapshot` function takes an additional parameter `includeStyles` prop
  which is by default true, if false then styles are omitted from the captured
  snapshot. This will make it act like a normal enzyme mount snapshot capture.

### usage

```js
import React from 'react';
import { felaMount } from 'fela-enzyme';
import { createComponent } from 'react-fela';

export const boxRules = ({ size = 10, theme }) => {
  return {
    width: size + 'px',
    height: size + 'px',
    color: theme.color.grass,
    fontSize: theme.fontSize
  };
};

const Box = createComponent(boxRules);

test('should render box', () => {
  const { wrapper, snapshot } = felaMount(<Box>hello</Box>);
  //will output to the snapshot file the fully rendered component tree, alongside all styles
  expect(snapshot(wrapper)).toMatchSnapshot();

  //take a snapshot without styles
  //will result in an enzyme snapshot without any fela rules being captured in snapshot
  expect(snapshot(wrapper, false)).toMatchSnapshot('no styles captured');
});
```
