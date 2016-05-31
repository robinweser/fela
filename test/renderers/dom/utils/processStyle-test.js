import processStyle from '../../../../modules/renderers/dom/utils/processStyle'
import pluginInterface from '../../../_mocks/pluginInterface'

describe('Processing style', () => {
  it('should process style using data provided via the plugin interface', () => {
    const setting = pluginInterface({ width: 20 }, [ ({ style }) => {
      style.foo = 'bar'; return style
    } ])

    expect(processStyle(setting)).to.eql({
      width: 20,
      foo: 'bar'
    })
  })
})
