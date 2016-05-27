export default class Selector {
  /**
   * Selector is a dynamic style container
   *
   * @param {Function} composer - style composer
   */
  constructor(composer) {
    this.composer = composer
  }

  /**
   * resolves the styles with given set of props
   *
   * @param {Object?} props - values to resolve dynamic styles
   * @return {Object} rendered styles
   */
  render(props = { }) {
    return this.composer(props)
  }
}
