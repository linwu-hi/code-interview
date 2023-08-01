const fs = require('fs');
const axios = require('axios');
const sanitize = require('sanitize-filename');
const { githubRepoOwner, githubRepoName, githubAccessToken } = require('./config');

async function getIssues() {
  let allIssues = [];
  let page = 1;
  let perPage = 300; // 每页返回100个issue，根据实际情况可以适当调整

  try {
    while (true) {
      const response = await axios.get(`https://api.github.com/repos/${githubRepoOwner}/${githubRepoName}/issues`, {
        params: {
          page,
          per_page: perPage
        },
        headers: {
          Authorization: `Bearer ${githubAccessToken}`
        }
      });

      const issues = response.data;
      if (issues.length === 0) {
        break; // 退出循环，表示已获取所有issue数据
      }

      allIssues = allIssues.concat(issues);
      page++;
    }

    return allIssues;
  } catch (error) {
    throw new Error(`Error fetching issues: ${error.message}`);
  }
}

async function saveIssueAsMarkdown(issue, directory) {
  const markdownContent = issue.body;
  const fileName = `${directory}/${sanitize(issue.title)}.md`;
  fs.writeFileSync(fileName, markdownContent);
}

async function main() {
  try {
    const issues = await getIssues();

    // Create a directory for each label
    issues.forEach(issue => {
      issue.labels.forEach(label => {
        const directory = `./docs/${sanitize(label.name)}`;
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }
        saveIssueAsMarkdown(issue, directory);
      });
    });

    console.log('Markdown files saved successfully!');
  } catch (error) {
    console.error(error.message);
  }
}

main();
