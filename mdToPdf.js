const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const markdownpdf = require('markdown-pdf');

async function mergeMdFilesToPdf(directory, outputFilename) {
  const directories = fs.readdirSync(directory);

  const subDirectories = directories.filter(item =>
    fs.lstatSync(path.join(directory, item)).isDirectory()
  );

  if (subDirectories.length === 0) {
    console.log('No subdirectories found in the directory.');
    return;
  }

  const pdfOptions = {
    remarkable: {
      breaks: true,
      html: true,
      xhtmlOut: true,
      typographer: true,
      linkify: true,
    },
    preProcessMd: function (doc) {
      return doc.replace(/^#/gm, '###');
    }
  };

  const mergeSubDirMdToPdf = async (subDir, toc) => {
    const subDirPath = path.join(directory, subDir);
    const mdFiles = fs.readdirSync(subDirPath).filter(file => file.endsWith('.md'));
    const mdFilePaths = mdFiles.map(file => path.join(subDirPath, file));

    if (mdFilePaths.length === 0) {
      console.log(`No markdown files found in ${subDirPath}. Skipping...`);
      return '';
    }

    const mergedPdfPath = path.join(subDirPath, `${subDir}.pdf`);
    try {
      await markdownpdf(pdfOptions).concat.from(mdFilePaths).to(mergedPdfPath);
      console.log(`PDF for ${subDir} merged successfully!`);

      return `* [${subDir}](${path.basename(mergedPdfPath)})\n`;
    } catch (error) {
      console.error(`Error generating PDF for ${subDir}:`, error);
      return '';
    }
  };

  let toc = '';
  const currentDirectory = process.cwd(); // 保存当前工作目录
  for (const subDir of subDirectories) {
    toc += await mergeSubDirMdToPdf(subDir);
  }

  process.chdir(currentDirectory); // 恢复工作目录

  const tocPath = path.join(directory, '_toc.md');
  try {
    await mkdirp(directory); // 创建目录（如果不存在）
    await fs.promises.writeFile(tocPath, toc);

    const mergedPdfPath = path.join(directory, outputFilename);
    await markdownpdf(pdfOptions).concat.from(tocPath).to(mergedPdfPath);
    console.log('All PDFs merged successfully!');
  } catch (error) {
    console.error('Error generating final PDF:', error);
  } finally {
    fs.unlinkSync(tocPath);
  }
}

// Example usage:
mergeMdFilesToPdf('./docs', 'output.pdf');
