import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const pull_number = context.payload.issue.number;
const { owner, repo } = context.repo;

async function getPullRequestInfo() {
  const response = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const previousSHA = response.data.base.sha;
  const currentSHA = response.data.head.sha;
  const changeURL = response.data.html_url;

  return { previousSHA, currentSHA, changeURL };
}

const { previousSHA, currentSHA, changeURL } = await getPullRequestInfo();
console.log('PREVIOUS SHA:', previousSHA);
console.log('CURRENT SHA:', currentSHA);
console.log('CHANGE URL:', changeURL);
