const { By, until } = require('selenium-webdriver');
const credentials = require('../config/credentials');
const config = require('../config/testConfig');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.xpath('//input[@name="identifier"]');
        this.passwordField = By.xpath('//input[@name="password"]');
        this.loginButton = By.xpath('//button[@type="submit"]');
        this.signInButton = By.xpath('//button[@data-test-id="CT-SignIn-Btn"]');
    }

    async signIn() {
        try {
            await this.driver.get(config.baseUrl);
            const button = await this.driver.wait(until.elementLocated(this.signInButton));
            await button.click();
            
            const usernameField = await this.driver.wait(until.elementLocated(this.usernameField));
            await usernameField.sendKeys(credentials.username);
            
            const passwordField = await this.driver.wait(until.elementLocated(this.passwordField));
            await passwordField.sendKeys(credentials.password);
            
            await this.driver.findElement(this.loginButton).click();
            console.log("Login Successfully");
        }
        catch (error) {
            console.error('Error sign in flow:', error);
        }
    }
}

module.exports = LoginPage;
