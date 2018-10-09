export default [
  {
    selector: '*',
    style: {
      margin: 0,
      padding: 0,
    },
  },
  {
    selector: 'div',
    style: {
      display: 'flex',
      alignSelf: 'stretch',
      flexDirection: 'column',
      flexShrink: 0,
    },
  },
  {
    selector: 'body',
    style: {
      overflowX: 'hidden',
      fontFamily: 'Arial',
      fontSize: 18,
    },
  },
  {
    selector: 'html, body, #__next',
    style: {
      minHeight: '100vh',
      maxHeight: '100vh',
      overscrollBehavior: 'none',
    },
  },
]
