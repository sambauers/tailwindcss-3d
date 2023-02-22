const semver = require('semver')

// get latest version
let latestVersion = 'v0.0.0'

try {
  const latestRelease = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })

  latestVersion =
    typeof latestRelease === 'undefined' ||
    typeof latestRelease.data === 'undefined'
      ? 'v0.0.0'
      : `v${semver.clean(latestRelease.data.tag_name)}`

  console.info(`Found latest release version: ${latestVersion}`)
} catch (e) {
  console.info('Could not evaluate latest release version, using v0.0.0')
}

// get version from package json
let packageVersion = 'v0.0.0'

try {
  const packageJsonRecord = await github.rest.repos.getContent({
    owner: context.repo.owner,
    repo: context.repo.repo,
    path: 'package.json',
    ref: context.ref,
  })

  const packageJson =
    typeof packageJsonRecord === 'undefined' ||
    typeof packageJsonRecord.data === 'undefined'
      ? '{ "version": "0.0.0" }'
      : Buffer
          .from(packageJsonRecord.data.content, 'base64')
          .toString()

  const package = JSON.parse(packageJson)
  packageVersion = `v${semver.clean(package.version)}`

  console.info(`Found current package version: ${packageVersion}`)
} catch (e) {
  console.info('Could not evaluate current package version, using v0.0.0')
}

return {
  package: packageVersion,
  latest: latestVersion,
  latestIsNew: semver.gt(packageVersion, latestVersion)
}
