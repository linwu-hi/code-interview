const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');
const hljs = require('highlight.js');
const Remarkable = require('remarkable').Remarkable;
const linkify = require('remarkable/linkify').linkify;

async function mergeMdFilesToPdf(directory, outputFilename) {
  const mdContents = [];
  let prefaceContent = '';
  const gitHubLink = 'https://www.coding-time.cn'; // GitHub链接

  const processDirectory = (dir) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        processDirectory(filePath); // 递归处理子目录
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (file === '序言.md') {
          prefaceContent = content;
        } else {
          mdContents.push(content);
        }
      }
    });
  }

  processDirectory(directory);

  if (mdContents.length === 0) {
    console.log('在目录中未找到Markdown文件.');
    return;
  }

  // 指定代码高亮的主题（例如：'atom-one-dark'）
  const codeTheme = 'atom-one-dark';

  const md = new Remarkable();
  md.use(linkify); // 使用remarkable/linkify插件

  const pdfOptions = {
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(codeTheme, code).value;
        } catch (__) {}
      }
      return ''; // 使用默认的代码高亮
    },
    paperFormat: 'A3',
    remarkable: md,
    cssPath: path.join(__dirname, 'custom.css'), // 使用绝对路径指定custom.css文件
  };

  const tocMarkdown = generateTableOfContents(mdContents, gitHubLink);

  try {
    // 将包装后的HTML内容转换为PDF
    const htmlContent = prefaceContent + '\n\n' + tocMarkdown + '\n\n' + mdContents.join('\n\n');
    markdownpdf(pdfOptions).from.string(htmlContent).to(outputFilename, function () {
      console.log('PDF生成成功！');
    });
  } catch (error) {
    console.error('生成PDF时出错：', error);
  }
}

// 生成目录的Markdown内容
function generateTableOfContents(mdContents, gitHubLink) {
  const toc = mdContents.map((content, index) => {
    const title = getTitleFromMarkdown(content);
    const anchor = slugify(title);
    return `- [${title}](${gitHubLink}#${anchor})`; // 将链接指向GitHub地址，并在后面添加锚点
  }).join('\n');
  return `# 前端面试小册\n\n${toc}\n\n`;
}

// 从Markdown内容中提取标题
function getTitleFromMarkdown(content) {
  const match = content.match(/^# (.+)$/m);
  return match ? match[1] : 'Untitled';
}

// 将标题转换为合法的锚点链接
function slugify(title) {
  return title.trim().toLowerCase().replace(/\s+/g, '-');
}

// 示例用法：
mergeMdFilesToPdf('./docs', '前端面试小册.pdf');
