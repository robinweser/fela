export default class Keyframe {
  /**
   * Keyframe is a dynamic keyframe animation container
   *
   * @param {Function} keyframeComposer - composer function
   */
  constructor(keyframeComposer) {
    this.keyframeComposer = keyframeComposer
  }

  /**
   * resolves the styles with given set of props
   *
   * @param {Object?} props - values to resolve dynamic styles
   * @return {Object} rendered styles
   */
  render(props = { }) {
    return this.keyframeComposer(props)
  }
}
