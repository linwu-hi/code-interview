const { Octokit } = require('@octokit/rest');

// GitHub personal access token
const token = '';

// GitHub repository information
const owner = 'LQ-vic';
const repo = 'code-interview';

const labelToFilter = 'image'; // 请替换为你想筛选的标签

const octokit = new Octokit({ auth: token });

async function updateIssueTitlesByLabel() {
  try {
    // 根据标签获取仓库的所有 issues
    const issues = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open', // 只获取打开的 issues
      labels: labelToFilter,
      per_page: 100, // 每页获取 100 个 issues，你可以根据需要调整
    });

    for (const issue of issues.data) {
      if (issue.title.startsWith('面试官：面试官：')) {
        const newTitle = issue.title.replace('面试官：面试官：', '面试官：');
        await octokit.issues.update({
          owner,
          repo,
          issue_number: issue.number,
          title: newTitle,
        });
        console.log(`Updated issue #${issue.number} title to: ${newTitle}`);
      }
    }
  } catch (error) {
    console.error('Error updating issue titles:', error.message);
  }
}

updateIssueTitlesByLabel();
