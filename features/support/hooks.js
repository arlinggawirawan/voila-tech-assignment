const { Before, After } = require('@cucumber/cucumber');
const { Builder, Capabilities } = require('selenium-webdriver');
require('chromedriver');

let driver;

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });

Before(async function () {
    driver = new Builder().withCapabilities(capabilities).build();
    this.driver = driver;
    console.log('WebDriver initialize');
    await this.driver.manage().window().maximize();
    console.log('Browser window maximized.');
});

After(async function () {
    if (this.driver) {
        await this.driver.quit();
    }
    console.log('WebDriver quit');
});
