const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

async function getPullRequestInfo() {
  const response = await octokit.rest.pulls.get({
    owner: 'spanb4',
    repo: 'github-actions-test',
    pull_number: 1,
  });

  const previousSHA = response.data.base.sha;
  const currentSHA = response.data.head.sha;
  const changeURL = response.data.html_url;

  return { previousSHA, currentSHA, changeURL };
}

(async () => {
  const { previousSHA, currentSHA, changeURL } = await getPullRequestInfo();
  console.log('PREVIOUS SHA:', previousSHA);
  console.log('CURRENT SHA:', currentSHA);
  console.log('CHANGE URL:', changeURL);
})();
