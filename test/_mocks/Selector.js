export default class Selector {
  constructor(composer, mediaComposer = { }) {
    this.composer = composer
    this.mediaComposer = mediaComposer
    this.mediaStrings = Object.keys(mediaComposer)
  }

  render(props) {
    const styles = this.composer(props)
    const mediaStyles = this.mediaStrings.reduce((styles, media) => {
      styles.set(media, this.mediaComposer[media](props))
      return styles
    }, new Map())

    return { styles: styles, mediaStyles: mediaStyles }
  }
}