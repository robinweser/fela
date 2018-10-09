import Link from 'next/link'

const HeaderLink = ({ href, children }) => (
  <Link href={href}>
    <a style={{ textDecoration: 'none', color: 'black' }}>{children}</a>
  </Link>
)

export default () => (
  <div
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0 23px',
      position: 'fixed',
      zIndex: 2,
      backgroundColor: 'white',
      borderBottom: '1px solid rgb(200, 200, 200)',
      left: 0,
      right: 0,
      top: 0,
    }}>
    <div style={{ flexDirection: 'row' }}>
      <div style={{ justifyContent: 'center' }}>
        <img
          src="/static/assets/logo.svg"
          style={{ height: 30, marginTop: -3, paddingRight: 20 }}
        />
      </div>
      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="/docs">Documentation</HeaderLink>
      </div>
      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="/ecosystem">Ecosystem</HeaderLink>
      </div>
    </div>

    <div style={{ flexDirection: 'row' }}>
      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="https://github.com/rofrischmann/fela">
          <i className="fab fa-github" />
        </HeaderLink>
      </div>
      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="https://gitter.im/rofrischmann/fela">
          <i className="fab fa-gitter" />
        </HeaderLink>
      </div>
      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="https://twitter.com/felajs">
          <i className="fab fa-twitter" />
        </HeaderLink>
      </div>

      <div style={{ padding: '17px 10px 15px 10px' }}>
        <HeaderLink href="https://medium.com/felajs">
          <i className="fab fa-medium-m" />
        </HeaderLink>
      </div>
    </div>
  </div>
)
