const { RELEASE_TAG_NAME: tag_name } = process.env

module.exports = async ({github, context}) => {
  await github.rest.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name,
    target_commitish: context.sha,
    name: tag_name,
  })

  console.info(`Created (draft) release ${tag_name}`)
}
