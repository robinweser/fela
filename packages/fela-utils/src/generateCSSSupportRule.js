export default function generateCSSSupportRule(support, cssRules) {
  return `@supports ${support}{${cssRules}}`
}
