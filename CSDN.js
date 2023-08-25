const puppeteer = require('puppeteer');

async function autoCommentCSDN(username, password, targetBlogger, commentContent) {
  const browser = await puppeteer.launch({ headless: false }); // 打开有头浏览器
  const page = await browser.newPage();

  // 登录CSDN
  await page.goto('https://passport.csdn.net/login');
  await page.waitForTimeout(1000); // 等待页面加载

  // 切换到最后一个Tab (账号登录)
    // 点击“密码登录”
    const passwordLoginButton = await page.waitForXPath('//span[contains(text(), "密码登录")]');
    await passwordLoginButton.click();
  

  // 输入用户名和密码并登录
  const inputFields = await page.$$('.base-input-text');

  await inputFields[0].type( username);
  await inputFields[1].type( password);
  await page.click('.base-button');

  await page.waitForNavigation();

//   // 跳转到博主的首页
  await page.goto(`https://blog.csdn.net/${targetBlogger}?type=blog`);

//   // 点击第一篇文章的标题，进入文章页面
  await page.waitForSelector('.list-box-cont', { visible: true });
  await page.click('.list-box-cont');
//   // 获取文章ID
  console.log('page.url()',page.url())

  // await page.waitForTimeout(1000); // 等待页面加载


  await page.goto('https://blog.csdn.net/weixin_52898349/article/details/132115618')


await page.waitForTimeout(1000); // 等待页面加载

console.log('开始点击评论按钮...')

console.log('page.url()',page.url())

// 获取当前页面的DOM内容

const bodyHTML = await page.evaluate(() => {
    return document.body.innerHTML;
});

console.log(bodyHTML);

//  await page.waitForSelector('.comment-side-tit');

//  const commentInput = await page.$('.comment-side-tit');

//  await commentInput.click();

 // 等待评论按钮出现

 // 点击评论按钮

//  await page.waitForSelector('.comment-content');
//  const commentInput = await page.$('.comment-content textarea');
//  await commentInput.type(commentContent);
//  const submitButton = await page.$('.btn-comment-input');
//  await submitButton.click();
 
//  console.log('评论成功！');
//  await browser.close();

}

// 请替换以下参数为您的CSDN账号信息、目标博主和评论内容
const username = 'weixin_52898349';
const password = '123lxswgf@!';
const targetBlogger = 'weixin_52898349'; // 目标博主的CSDN用户名
const commentContent = '各位大佬们帮忙三连一下，非常感谢!!!!!!!!!!!'; // 评论内容

autoCommentCSDN(username, password, targetBlogger, commentContent);




