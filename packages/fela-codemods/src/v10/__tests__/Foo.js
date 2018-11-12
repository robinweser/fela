import { FelaTheme, FelaComponent } from 'react-fela'

export default () => (
  <FelaTheme
    render={theme => <FelaComponent rule={({ foo }) => ({ color: foo })} />}
  />
)
