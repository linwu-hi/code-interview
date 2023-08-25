const axios = require('axios');
const fs = require('fs');


async function getGitHubIssues(owner, repo, labels, token) {
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const params = { state: 'all', per_page: 100 };
  const issuesByLabel = {};

  let nextPage = true;
  while (nextPage) {
    try {
      const response = await axios.get(baseUrl, { headers, params });
      const data = response.data;

      if (!data.length) break;

      data.forEach((issue) => {
        if (!issue.pull_request) {
          issue.labels.forEach((label) => {
            if (labels.includes(label.name)) {
              if (!issuesByLabel[label.name]) {
                issuesByLabel[label.name] = [];
              }
              issuesByLabel[label.name].push(issue);
            }
          });
        }
      });

      if (response.headers.link) {
        const links = response.headers.link.split(', ');
        nextPage = links.some((link) => link.endsWith('rel="next"'));
        if (nextPage) {
          const nextPageNum = parseInt(links[links.length - 1].match(/&page=(\d+)/)[1], 10);
          params.page = nextPageNum;
        }
      } else {
        nextPage = false;
      }
    } catch (error) {
      throw new Error(`Failed to fetch issues. Error: ${error.message}`);
    }
  }

  return issuesByLabel;
}


// Output to Markdown file
function writeIssuesToMarkdown(issues, outputPath) {
  let content = '';

  Object.entries(issues).forEach(([label, issuesList]) => {
    content += `## ${label}\n\n`;
    issuesList.forEach((issue) => {
      content += `- [${issue.title}](${issue.html_url})\n`;
    });
    content += '\n';
  });

  fs.writeFile(outputPath, content, (err) => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Markdown file generated successfully!');
    }
  });
}


// 使用示例
const owner = 'linwu-hi';
const repo = 'code-interview';
const labels = ['JavaScript', 'TypeScript','vue','vue3','react','HTTP','webpack','nodejs','Linux','git','CSS','CSS3','组件库','小程序'];
const token = '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';
const outputPath = 'dirname.md';

(async () => {
  try {
    const issues = await getGitHubIssues(owner, repo, labels, token);
    writeIssuesToMarkdown(issues, outputPath);
  } catch (error) {
    console.error(error.message);
  }
})();
