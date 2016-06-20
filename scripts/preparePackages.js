import fs from 'fs-extra'
import packages from '../packages'

// Small helper to error and exit on fail
const errorOnFail = err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Updates the package.json version of a given pkg with the global
// package.json version
function updateVersion(pkg) {
  fs.readFile(__dirname + '/../package.json', 'utf8', (err, data) => {
    errorOnFail(err)
    const globalVersion = JSON.parse(data).version

    fs.readFile(__dirname + '/../packages/' + pkg + '/package.json', (err, data) => {
      errorOnFail(err)

      const packageJSON = JSON.parse(data)
      packageJSON.version = globalVersion

      const newPackageJSON = JSON.stringify(packageJSON, null, 2)

      fs.writeFile(__dirname + '/../packages/' + pkg + '/package.json', newPackageJSON, err => {
        errorOnFail(err)
        console.log('Successfully updated ' + pkg + ' version to ' + globalVersion + '.')
      })
    })
  })
}

Object.keys(packages).forEach(pkg => updateVersion(pkg))
