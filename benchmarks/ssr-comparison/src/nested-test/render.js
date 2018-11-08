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

export const renderBody = (libraryName, containerClassNames, buttonClassNames) =>
  `<section class="${containerClassNames}">
    <h1>${libraryName}</h1>
    <button class="${buttonClassNames}">Click me</button>
</section>`
