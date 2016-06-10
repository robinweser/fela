const precedence = {
  ':link': 4,
  ':visited': 3,
  ':hover': 2,
  ':focus': 1.5,
  ':active': 1
}

function sortPseudoClasses(left, right) {
  const precedenceLeft = precedence[left]; // eslint-disable-line
  const precedenceRight = precedence[right]
  // Only sort if both properties are listed
  // This prevents other pseudos from reordering
  if (precedenceLeft && precedenceRight) {
    return precedenceLeft < precedenceRight ? 1 : -1
  }
  return 0
}

function LVHA(style) {
  return Object.keys(style).sort(sortPseudoClasses).reduce((out, pseudo) => {
    out[pseudo] = style[pseudo]
    return out
  }, { })
}

export default () => LVHA
