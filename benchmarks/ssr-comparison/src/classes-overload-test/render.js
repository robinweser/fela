import { ITERATIONS } from './iterations'

export const renderHtml = (css, body) =>
  `<html>
    <head>
        <style type="text/css">
${css}
        </style>
    </head>
    <body>
${body}
    </body>
</html>
`

export const renderBody = (libraryName, containerClassNames, getButtonClassNames) =>
  `<section class="${containerClassNames}">
    <h1>${libraryName}</h1>
${(() => {
    const buttons = []

    for (let i = 0; i < ITERATIONS; i++) {
      buttons.push(`<button class="${getButtonClassNames(i)}">Click me ${i}</button>\n`)
    }

    return buttons.join('')
  })()}
</section>`
