import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packagePath = join('..', '..', 'package.json')
const packageURL = fileURLToPath(new URL(packagePath, import.meta.url))
const packageJson = JSON.parse(readFileSync(packageURL).toString())

// Create truncated package.json for distribution
const distPackagePath = join('..', '..', 'dist', 'package.json')
const distPackageURL = fileURLToPath(new URL(distPackagePath, import.meta.url))

const distPackageJson = { ...packageJson }
delete distPackageJson.devDependencies
delete distPackageJson.files
delete distPackageJson.packageManager
delete distPackageJson.scripts
distPackageJson.main = 'index.js'
distPackageJson.types = 'types/index.d.ts'
const distPackageContents = JSON.stringify(distPackageJson, null, '  ')
writeFileSync(distPackageURL, distPackageContents.concat('\n'))

// Copy README and LICENSE
const docFiles = ['README.md', 'LICENSE.md']
docFiles.forEach((docFile) => {
  const docPath = join('..', '..', docFile)
  const docURL = fileURLToPath(new URL(docPath, import.meta.url))
  const docPackagePath = join('..', '..', 'dist', docFile)
  const docPackageURL = fileURLToPath(new URL(docPackagePath, import.meta.url))
  copyFileSync(docURL, docPackageURL)
})
