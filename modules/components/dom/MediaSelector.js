import Selector from '../shared/Selector'

export default class MediaSelector extends Selector {
  /**
   * MediaSelector is an enhanced Selector providing
   * support for media query
   *
   * @param {Function} composer - values to resolve dynamic styles
   * @param {Object} mediaComposer - set of additional media composer
   */
  constructor(composer, mediaComposer = { }) {
    super(composer)
    this.mediaComposer = mediaComposer
    // safe media strings to iterate later on
    this.mediaStrings = Object.keys(mediaComposer)

    if (Object.keys(mediaComposer).length === 0) {
      console.warn('You are using a MediaSelector without specifying at least one media style composer. Prefer using basic Selectors instead.')
    }
  }

  /**
   * resolves media styles with given set of props
   *
   * @param {Object?} props - values to resolve dynamic styles
   * @param {string?} media - media environment to render
   * @return {Object} rendered styles
   */
  renderMedia(props = { }, media) {
    // renders styles by resolving and processing them
    const composer = this.mediaComposer[media]
    return composer(props)
  }
}
