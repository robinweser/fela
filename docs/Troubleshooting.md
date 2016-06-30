# Troubleshooting

## 1. Rendering Fonts
Rendering custom `@font-face` rules into the same `<style>` element used for any other styles can lead to some kind of FOUC as the fonts will be refetched and reloaded each time the renderer updates. This causes all elements to lose the font for a fraction of a second. Especially for DOM heavy or huge applications this can be in fact a visible issue and confuse the user.

### Solution
Right now we are trying to find a universal solution. Yet we are not sure which browsers are affected and if there actually is a real solution to this problem, but there are some workarounds.
> Ideas and/or PRs are welcome!

#### Workaround 1: Manually add fonts
The most easy and straightforward workaround is to just not use Fela to render styles. One could simply add the fonts to the `document`'s `<head>`.

#### Workaround 2: Use another renderer
Another way would be to use a second Fela renderer which only renders fonts. This is a good solution as long as we can add all fonts directly. But as we can often only use a single renderer (e.g. passing the renderer to react-fela's `<Provider>`) this will not work for dynamic font rendering.
