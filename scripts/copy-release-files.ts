import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
} from 'node:fs'

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

// Copy any type declarations that are needed in the distribution
const typeGroups = [
  { dir: 'common', files: ['index.d.ts'] },
  { dir: 'css-animations', files: ['index.d.ts'] },
  { dir: 'css-utilities', files: ['index.d.ts'] },
]
typeGroups.forEach((typeGroup) => {
  const typeGroupPath = join('..', '..', 'src', typeGroup.dir)
  const typeGroupPackagePath = join('..', '..', 'dist', 'types', typeGroup.dir)
  const typeGroupPackageURL = fileURLToPath(
    new URL(typeGroupPackagePath, import.meta.url)
  )

  if (!existsSync(typeGroupPackageURL)) {
    mkdirSync(typeGroupPackageURL, { recursive: true })
  }

  typeGroup.files.forEach((typeFile) => {
    const typePath = join(typeGroupPath, typeFile)
    const typeURL = fileURLToPath(new URL(typePath, import.meta.url))
    const typePackagePath = join(typeGroupPackagePath, typeFile)
    const typePackageURL = fileURLToPath(
      new URL(typePackagePath, import.meta.url)
    )
    copyFileSync(typeURL, typePackageURL)
  })
})

// Remove empty javascript files generated from the type declaration files
typeGroups.forEach((typeGroup) => {
  const typeGroupPackagePath = join('..', '..', 'dist', typeGroup.dir)
  typeGroup.files.forEach((typeFile) => {
    const typePackagePath = join(
      typeGroupPackagePath,
      typeFile.replace(/\.d\.ts$/, '.d.js')
    )
    const typePackageURL = fileURLToPath(
      new URL(typePackagePath, import.meta.url)
    )
    if (existsSync(typePackageURL)) {
      rmSync(typePackageURL)
    }
  })
  const typeGroupPackageURL = fileURLToPath(
    new URL(typeGroupPackagePath, import.meta.url)
  )
  if (!existsSync(typeGroupPackageURL)) {
    return
  }
  const typeGroupDir = readdirSync(typeGroupPackageURL)
  if (typeGroupDir.length < 1) {
    rmSync(typeGroupPackageURL, { recursive: true })
  }
})
