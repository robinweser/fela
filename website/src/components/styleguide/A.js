import Link from 'next/link'

export default ({ href, children }) => (
  <Link href={href}>
    <a
      style={{
        color: 'rgb(77, 38, 231)',
        textDecoration: 'none',
      }}>
      {children}
    </a>
  </Link>
)
