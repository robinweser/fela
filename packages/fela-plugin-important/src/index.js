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

/* Remove items with features of animation or keyframes from array 
*  where '!imporatant' should be added 
* 
*  @return true if item is animation 
*/ 
function isAnimation(style: Object): Boolean {
  const styleNames = Object.getOwnPropertyNames(style)
  const resctrictions = [ 'from', 'to', '%', 'animation']
  let isAnimationItem = false
 
  for(const property in styleNames) {
    const value = styleNames[property]
    
    for(const res in resctrictions) {
      isAnimationItem = value.includes(resctrictions[res]) || property.includes(resctrictions[res])
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
