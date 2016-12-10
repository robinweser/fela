export default function getCSSSelector(className, pseudo = '') {
  return '.' + className + pseudo
}
