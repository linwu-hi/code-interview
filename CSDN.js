const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');


async function autoCommentCSDN(username, password, targetBlogger, commentContent) {
  const options = new chrome.Options();
  // options.headless(); // 可根据需要设置是否显示浏览器界面

  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build();


  try {
    // 打开登录页面
    await driver.get('https://passport.csdn.net/login');
    await driver.sleep(1000);

    // 切换到密码登录
    const passwordLoginButton = await driver.findElement(webdriver.By.xpath('//span[contains(text(), "密码登录")]'));
    await passwordLoginButton.click();

    // 输入用户名和密码并登录
    const inputFields = await driver.findElements(webdriver.By.className('base-input-text'));
    await inputFields[0].sendKeys(username);
    await inputFields[1].sendKeys(password);
    await driver.findElement(webdriver.By.css('.base-button')).click();

    // 等待登录完成
    // await driver.wait(webdriver.until.urlIs('https://blog.csdn.net/'), 5000);
    await driver.sleep(5000);

    // 跳转到目标博主的首页
    // await driver.get(`https://blog.csdn.net/${targetBlogger}?type=blog`);
    // await driver.sleep(5000);

    // await driver.wait(webdriver.until.elementLocated(webdriver.By.css('.list-box-cont')), 10000);
    // await driver.findElement(webdriver.By.css('.list-box-cont')).click();
    // await driver.sleep(1000);
    await driver.get(`https://blog.csdn.net/weixin_52898349/article/details/132526711`);


    const currentUrl1 = await driver.getCurrentUrl();
    console.log('Current URL:', currentUrl1);
    // 等待页面 URL 发生变化，最多等待 10 秒
    // await driver.wait(async () => {
    //   const currentUrl = await driver.getCurrentUrl();
    //   return currentUrl !== currentUrl1; // 用实际的前一个 URL 替换
    // }, 10000);
    // 跳转到具体文章页面
    // await driver.get('https://blog.csdn.net/weixin_52898349/article/details/132526711');
    await driver.sleep(5000);
    console.log('开始点击评论按钮...');
    // const currentUrl = await driver.getCurrentUrl();
    // console.log('Current URL:', currentUrl);
    // await driver.wait(webdriver.until.urlIs(currentUrl), 10000);

    const html = await driver.getPageSource();
    console.log(html);
    


    // 等待评论按钮出现并点击
    const commentInput = await driver.findElement(webdriver.By.css('.comment-side-tit'));
    // await driver.actions().move({ origin: commentInput }).click().perform();
    
    // 添加等待，确保元素可见
    // await driver.wait(webdriver.until.elementIsVisible(commentInput), 5000);

    await commentInput.click();

    await driver.sleep(1000);


    // 等待评论内容输入框出现并输入评论内容
    await driver.wait(webdriver.until.elementLocated(webdriver.By.css('.comment-edit-box')), 5000);
    const commentTextarea = await driver.findElement(webdriver.By.css('.comment-edit-box'));
    await commentTextarea.sendKeys(commentContent);

    // 提交评论
    const submitButton = await driver.findElement(webdriver.By.css('.btn-comment-input'));
    await submitButton.click();

    console.log('评论成功！');
  } catch (error) {
    console.error('发生错误：', error);
  } finally {
    // 关闭浏览器
    await driver.quit();
  }
}

const username = 'weixin_52898349';
const password = '123lxswgf@!';
const targetBlogger = 'weixin_52898349';
const commentContent = '各位大佬们帮忙三连一下，非常感谢!!!!!!!!!!!';

autoCommentCSDN(username, password, targetBlogger, commentContent);
