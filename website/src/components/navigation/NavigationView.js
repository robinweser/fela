import Link from 'next/link'
import { withRouter } from 'next/router'

import Navigation, { paths } from './Navigation'

import { H1 } from '../styleguide'

export default withRouter(({ title, children, router }) => {
  const path = router.pathname

  const nextPath =
    paths.indexOf(path) < paths.length
      ? paths[paths.indexOf(path) + 1]
      : undefined

  const prevPath =
    paths.indexOf(path) > 0 ? paths[paths.indexOf(path) - 1] : undefined

  return (
    <div style={{ flexDirection: 'row', flex: 1 }}>
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 52,
          bottom: 0,
          width: 220,
          zIndex: 1,
          alignSelf: 'stretch',
          overflow: 'scroll',
          borderRight: '1px solid rgb(200, 200, 200)',
          backgroundColor: 'rgb(245, 245, 245)',
        }}>
        <Navigation />
      </div>
      <div
        style={{
          flex: 1,
          padding: '0px 0px 0px 220px',
          flexDirection: 'row',
        }}>
        {prevPath ? (
          <Link href={prevPath}>
            <a>
              <div
                style={{
                  position: 'fixed',
                  height: '100%',
                  padding: '0 10px 0 30px',
                  justifyContent: 'center',
                  fontSize: 45,
                  color: 'rgb(170, 170, 170)',
                }}>
                <i
                  className="fas fa-angle-left"
                  style={{ paddingBottom: 50 }}
                />
              </div>
            </a>
          </Link>
        ) : null}
        <div style={{ overflow: 'scroll', flex: 1, padding: '50px 90px' }}>
          <div
            style={{
              alignSelf: 'center',
              width: '100%',
              maxWidth: 1000,
            }}>
            <H1>{title}</H1>
            {children}
          </div>
        </div>
        {nextPath ? (
          <Link href={nextPath}>
            <a
              style={{
                display: 'flex',
                textDecoration: 'none',
                alignSelf: 'stretch',
                position: 'fixed',
                height: '100%',
                right: 0,
                padding: '0 30px 0 10px',
                justifyContent: 'center',
                fontSize: 45,
                color: 'rgb(170, 170, 170)',
                flex: 1,
                alignItems: 'center',
              }}>
              <i className="fas fa-angle-right" style={{ paddingBottom: 50 }} />
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  )
})
