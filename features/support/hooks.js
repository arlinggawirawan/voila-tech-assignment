const { Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const config = require('../../config/testConfig');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

let driver;

Before(async function () {
    let option = new chrome.Options();
    
    if (config.headless) {
        option.addArguments('--headless');
        option.addArguments('--window-size=1920,1080');
    }

    driver = await new Builder()
        .forBrowser(config.browser)
        .setChromeOptions(option)
        .build();

    this.driver = driver;
    console.log('WebDriver initialize');

    if (!config.headless) {
        await this.driver.manage().window().maximize();
        console.log('Browser window maximized.');
    }
});

After(async function () {
    if (this.driver) {
        await this.driver.quit();
    }
    console.log('WebDriver quit');
});
