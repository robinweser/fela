export default class Selector {
  /**
   * Selector is a dynamic style container
   *
   * @param {Function} composer - values to resolve dynamic styles
   * @param {Object} mediaComposer - set of additional media composer
   */
  constructor(composer, mediaComposer = { }) {
    this.composer = composer
    this.mediaComposer = mediaComposer
    // safe media strings to iterate later on
    this.mediaStrings = Object.keys(mediaComposer)
  }

  /**
   * resolves the styles with given set of props
   *
   * @param {Object?} props - values to resolve dynamic styles
   * @param {string?} media - media environment to render
   * @return {Object} rendered styles
   */
  render(props = { }, media) {
    // renders styles by resolving and processing them
    const composer = this._getComposer(media)
    return composer(props)
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
