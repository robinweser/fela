import { withRouter } from 'next/router'
import { createStore } from 'alveron'

import NavigationItem from './NavigationItem'

const items = [
  {
    title: 'Introduction',
    path: '/docs/introduction',
    expand: true,
    items: [
      {
        title: 'Motivation',
        path: '/docs/introduction/motivation',
      },
      {
        title: 'Principles',
        path: '/docs/introduction/principles',
      },
      {
        title: 'Benefits',
        path: '/docs/introduction/benefits',
      },
      {
        title: 'Caveats',
        path: '/docs/introduction/caveats',
      },
      {
        title: 'Ecosystem',
        path: '/docs/introduction/ecosystem',
      },
      {
        title: 'Examples',
        path: '/docs/introduction/examples',
      },
    ],
  },
  {
    title: 'Basics',
    path: '/docs/basics',
    expand: true,
    items: [
      {
        title: 'Rules',
        path: '/docs/basics/rules',
      },
      {
        title: 'Keyframes',
        path: '/docs/basics/keyframes',
      },
      {
        title: 'Fonts',
        path: '/docs/basics/fonts',
      },
      {
        title: 'Renderer',
        path: '/docs/basics/renderer',
      },
    ],
  },
  {
    title: 'Advanced',
    path: '/docs/advanced',
    expand: true,
    items: [
      {
        title: 'DOM Rendering',
        path: '/docs/advanced/dom-rendering',
      },
      {
        title: 'Server Rendering',
        path: '/docs/advanced/server-rendering',
      },
      {
        title: 'Plugins',
        path: '/docs/advanced/plugins',
      },
      {
        title: 'Renderer Configuration',
        path: '/docs/advanced/renderer-configuration',
      },
      {
        title: 'Global & Third-Party Style',
        path: '/docs/advanced/static-style',
      },
      {
        title: 'Combined Rules',
        path: '/docs/advanced/combined-rules',
      },
      {
        title: 'Enhancers',
        path: '/docs/advanced/enhancers',
      },
    ],
  },
  {
    title: 'API Reference',
    path: 'docs/api',
    expand: true,
    items: [
      {
        title: 'fela',
        path: '/docs',
        expand: true,
        items: [
          {
            title: 'createRenderer',
            path: '/docs/api/fela/create-renderer',
          },
          {
            title: 'Renderer',
            path: '/docs/api/fela/renderer',
          },
        ],
      },
      {
        title: 'fela-dom',
        path: '/docs',
        expand: true,
        items: [
          {
            title: 'render',
            path: '/docs/api/fela-dom/render',
          },
          {
            title: 'rehydrate',
            path: '/docs/api/fela-dom/rehydrate',
          },
        ],
      },
    ],
  },
]

const reduceItems = items =>
  items.reduce((paths, item) => {
    if (item.expand) {
      return [...paths, ...reduceItems(item.items)]
    }
    return [...paths, item.path]
  }, [])

const paths = reduceItems(items)
console.log(paths)

export { paths }

const { Wrapper } = createStore({
  model: false,
  actions: {
    toggle: state => !state,
  },
})

const TreeView = withRouter(({ title, items, path, index, expand, router }) => (
  <Wrapper>
    {({ state, actions }) => (
      <div>
        <NavigationItem
          title={title}
          index={index}
          path={expand ? undefined : path}
          onClick={expand ? actions.toggle : undefined}
        />
        {items && (state || router.pathname.indexOf(path) !== -1) ? (
          <div style={{ paddingLeft: 20, paddingBottom: 15 }}>
            {items.map(({ title, path, items, expand }, subIndex) => (
              <TreeView
                title={title}
                items={items}
                path={path}
                expand={expand}
                index={index + '.' + (subIndex + 1)}
              />
            ))}
          </div>
        ) : null}
      </div>
    )}
  </Wrapper>
))

export default () => (
  <div
    style={{
      padding: 15,
      flex: 1,
    }}>
    {items.map(({ title, items, path, expand }, index) => (
      <TreeView
        key={title}
        title={title}
        path={path}
        items={items}
        expand={expand}
        index={index + 1}
      />
    ))}
  </div>
)
