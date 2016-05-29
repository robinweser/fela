import fs from 'fs-extra'
import packages from '../packages'

// Small helper to error and exit on fail
const errorOnFail = err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Copies LICENSE into a pgk subfolder
function copyLICENSE(pkg) {
  fs.copy(__dirname + '/../LICENSE', __dirname + '/../packages/' + pkg + '/LICENSE', err => {
    errorOnFail(err)
    console.log('LICENSE was successfully copied into the ' + pkg + ' package.')
  })
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

// Helper to run all preperation scripts
function preparePackage(pkg) {
  updateVersion(pkg)
  copyLICENSE(pkg)
}

Object.keys(packages).forEach(pkg => preparePackage(pkg))
