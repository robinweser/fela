import { FelaTheme, FelaComponent, Provider } from 'react-fela'

export default () => (
  <Provider renderer="foo">
    <FelaTheme
      render={theme => <FelaComponent rule={({ foo }) => ({ color: foo })} />}
    />
  </Provider>
)
