const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

// GitHub personal access token
const token = '';

// GitHub repository information
const owner = 'LQ-vic';
const repo = 'code-interview';

// Directory path of the docs folder
const docsDirectory = './docs/CSS3';

// Labels to be added to each issue
const labelColors = [
  { name: 'CSS3', color: '#FBCA033' }
];
const excludedDirectories = ['.vuepress', '.git', 'node_modules'];

// File path to store the uploaded files record
const recordFilePath = './uploaded_files.txt';

// Initialize Octokit
const octokit = new Octokit({ auth: token });

// Function to read all Markdown files in the given directory
async function readMarkdownFiles(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    // console.log('file',file)
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !excludedDirectories.includes(file)) {
      await readMarkdownFiles(filePath); // Recursively read files in non-excluded subdirectories
    } else if (stat.isFile() && path.extname(file) === '.md') {
      const content = fs.readFileSync(filePath, 'utf8');
      const title = extractTitleFromContent(content);
      if (!isFileUploaded(title)) {
        await createIssue(title, content, labelColors);
        addUploadedFile(title);
      }
    }
  }
}

// Function to create GitHub issue
async function createIssue(title, body, labels) {
  try {
    const response = await octokit.issues.create({
      owner: owner,
      repo: repo,
      title: `${title}`,
      body: body,
      labels: labels
    });

    console.log(`Successfully created issue: ${title}`);
  } catch (error) {
    console.log(`Failed to create issue: 面试官：${title}`);
    console.log(`Error: ${error.message}`);
  }
}

// Function to extract title from the content (first heading)
function extractTitleFromContent(content) {
  const match = content.match(/^#\s*(.+)/);
  if (match) {
    return match[1];
  }
  return '';
}

// Function to check if a file has been uploaded
function isFileUploaded(filename) {
  if (fs.existsSync(recordFilePath)) {
    const uploadedFiles = fs.readFileSync(recordFilePath, 'utf8').split('\n');
    return uploadedFiles.includes(filename);
  }
  return false;
}

// Function to add uploaded file to the record
function addUploadedFile(filename) {
  fs.appendFileSync(recordFilePath, filename + '\n', 'utf8');
}

// Read all Markdown files in the docs directory (excluding specified directories) and create issues
readMarkdownFiles(docsDirectory)
  .then(() => {
    console.log('All issues created.');
  })
  .catch((error) => {
    console.log('Error:', error);
  });
