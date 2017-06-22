const variations = process.env.VARIATIONS || 10
const cases = []

for (var i = 0; i < variations; ++i) {
  cases.push({
    fontSize: i,
    width: variations - i
  })
}

export default cases
