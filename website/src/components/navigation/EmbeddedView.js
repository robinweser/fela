import Header from './Header'

export default ({ children }) => (
  <div>
    <div>
      <Header />
    </div>
    <div style={{ flex: 1, marginTop: 52 }}>{children}</div>
  </div>
)
