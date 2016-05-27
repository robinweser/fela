# Rendering mechanism

Both Renderer use some kind of cache to memorize rendered Selectors in order to reuse them every time the same *Selector variation* is rendered again. A Selector variation is considered a pair of the used *props* and the rendered styles output. This prevent duplication and improves performance on future rendering cycles. It also prevents unnecessary DOM manipulations.
<br>
The Renderer therefore always has an up-to-date version of all rendered styles during the whole application lifetime which can be rendered to a DOM node or a string at any given time.

## Caching

## Reusing static styles

## Unique classNames
Each time a Selector is rendered the Renderer generates a reference className which is returned to be used within the application. The className is generated from a unique selector reference ID as well as a content-based hash of the passed props what makes it unique throughout the whole application.
