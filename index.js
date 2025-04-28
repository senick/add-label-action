const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github_token');
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;
    const pull_number = github.context.payload.pull_request.number;

    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: pull_number,
      labels: ['code review'],
    });

    console.log(`Added 'code review' label to PR #${pull_number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
