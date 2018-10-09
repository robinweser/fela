import I from './I'

export default ({ author, children }) => (
  <div
    style={{
      margin: '8px 0',
      padding: '5px 20px',
      borderLeft: '4px solid rgb(200, 200, 200)',
      color: 'grey',
      display: 'inline-block',
    }}>
    <div style={{ fontSize: 20 }}>{children}</div>
    <div style={{ color: 'rgb(150, 150, 150)' }}>
      <I>- {author}</I>
    </div>
  </div>
)
