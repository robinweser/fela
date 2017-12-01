/* @flow */
function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

function addImportantToValue(value: any): any {
  if (
    typeof value === 'number' ||
    (typeof value === 'string' &&
      value.toLowerCase().indexOf('!important') === -1)
  ) {
    return `${value}!important`
  }

  return value
}

function isAnimation(style: Object): boolean {
  const styleNames = Object.getOwnPropertyNames(style)
  const resctrictions = [ 'from', 'to', '%', 'animation']
  let isAnimationItem = false
 
  for(let i = 0; i < styleNames.length; i++) {
    const property = styleNames[i].toString()
    const value = style[styleNames[i]].toString()

    for(let j = 0; j < resctrictions.length; j++) {
      isAnimationItem = property.includes(resctrictions[j]) || value.includes(resctrictions[j])
    }
  }

  return isAnimationItem
} 
 
function addImportant(style: Object): Object { 
  if(!isAnimation(style)) { 
    for (const property in style) { 
      const value = style[property] 
 
      if (isPlainObject(value)) { 
        style[property] = addImportant(value) 
      } else if (Array.isArray(value)) { 
        style[property] = value.map(addImportantToValue) 
      } else { 
        style[property] = addImportantToValue(value) 
      }
    }
  }

  return style
} 

export default () => addImportant
