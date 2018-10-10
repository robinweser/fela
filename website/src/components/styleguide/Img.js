export default ({ src, author, children }) => (
  <div style={{ display: 'block' }}>
    <img
      style={{ display: 'block', border: '1px dotted rgba(0,0,0, 0.5)' }}
      alt={children}
      src={src}
    />
    {author ? (
      <span style={{ fontStyle: 'italic', fontSize: 14 }}>
        Source: {author}
      </span>
    ) : null}
  </div>
)
