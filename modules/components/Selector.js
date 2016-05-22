export default class Selector {
  /**
   * Selector is a dynamic style container
   *
   * @param {Function} composer - values to resolve dynamic styles
   * @param {Object} mediaCompose - set of additional media composer
   */
  constructor(composer, mediaComposer = { }) {
    this.composer = composer
    this.mediaComposer = mediaComposer
    // safe media strings to iterate later on
    this.mediaStrings = Object.keys(mediaComposer)
  }

  /**
   * renders the styles with given set of props
   * and pipes those styles through a set of plugins
   *
   * @param {Object?} props - values to resolve dynamic styles
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {Object} rendered selector including classNames, styles and media styles
   */
  render(props = { }, plugins = [ ]) {
    // renders styles by resolving and processing them
    const styles = this._resolve(props, plugins)
    const mediaStyles = this.mediaStrings.reduce((output, media) => {
      output.set(media, this._resolve(props, plugins, media))
      return output
    }, new Map())

    return { mediaStyles: mediaStyles, styles: styles }
  }

  /**
   * executes each plugin using a predefined plugin interface
   *
   * @param {Object} pluginInterface - interface containing relevant processing data
   * @return {Object} processed and validated styles
   */
  _process(pluginInterface) {
    let { plugins, styles } = pluginInterface

    // pipes each plugin by passes the plugin interface
    // NOTE: as the styles are passed directly they're editable
    // therefore the plugin order might matter
    plugins.forEach(plugin => plugin(pluginInterface))

    return styles
  }

  /**
   * resolves and processes styles
   *
   * @param {Object} props - values to resolve dynamic styles
   * @param {Function[]} plugins - array of plugins to process styles
   * @param {string?} media - media string referencing media styles
   * @return {Object} processed and resolved styles
   */
  _resolve(props, plugins, media) {
    const composer = this._getComposer(media)
    const styles = composer(props)

    const pluginInterface = {
      plugins: plugins,
      processStyles: this._process,
      styles,
      media,
      props
    }

    return this._process(pluginInterface)
  }

  /**
   * evaluates the expected composer for style resolving
   *
   * @param {string?} media - media string referencing a media composer
   * @return {Function} expected style composer
   */
  _getComposer(media) {
    // if a composer with the given media
    // string exists use it
    if (this.mediaComposer[media]) {
      return this.mediaComposer[media]
    }
    // use the basic composer by default
    return this.composer
  }
}
