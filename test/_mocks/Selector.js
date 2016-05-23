export default class Selector {
  constructor(composer, mediaComposer = { }) {
    this.composer = composer
    this.mediaComposer = mediaComposer
    this.mediaStrings = Object.keys(mediaComposer)
  }

  render(props, media) {
    const composer = this.mediaComposer[media] ? this.mediaComposer[media] : this.composer
    return composer(props)
  }
}
