import Link from 'next/link'
import { withRouter } from 'next/router'

export default withRouter(({ path, title, index, onClick, router }) => (
  <div
    style={{
      padding: 8,
    }}>
    {path ? (
      <Link href={path}>
        <a
          style={{
            color:
              router.pathname === path ? 'rgb(77, 38, 231)' : 'rgb(80, 80, 80)',

            textDecoration: 'none',
          }}>
          {title}
        </a>
      </Link>
    ) : (
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer',
          color: 'rgb(80, 80, 80)',
        }}>
        {title}
      </div>
    )}
  </div>
))
