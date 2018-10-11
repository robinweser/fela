export default ({ children }) => (
  <code
    style={{
      display: 'block',
      margin: '5px 0 8px',
      backgroundColor: 'rgb(240, 240, 240)',
      padding: '20px 30px',
      overflow: 'auto',
    }}>
    <pre
      style={{ fontFamily: 'Dank Mono', textRendering: 'optimizeLegibility' }}>
      {children}
    </pre>
  </code>
)
