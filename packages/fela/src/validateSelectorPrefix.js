/* @flow */
const PREFIX_SYNTAX = /^[a-z_][a-z0-9-_]*$/gi

export default function validateSelectorPrefix(
  selectorPrefix?: string = ''
): string {
  if (
    selectorPrefix.length > 0 &&
    selectorPrefix.match(selectorPrefix) === null
  ) {
    console.error(
      `An invalid selectorPrefix (${selectorPrefix}) has been used to create a new Fela renderer.
It must only contain a-Z, 0-9, - and _ while it must start with either _ or a-Z.
See http://fela.js.org/docs/advanced/RendererConfiguration.html`
    )
  }

  return selectorPrefix
}
