const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.checkoutButton = By.xpath('//button[@data-test-id="CT_Component_btnCheckout"]');
    }

    async checkout() {
        try {
            const checkoutButton = await this.driver.wait(until.elementLocated(this.checkoutButton));
            await checkoutButton.click();
        } catch(error) {
            console.error('Error checkout:', error);
        }
    }
}

module.exports = CheckoutPage;
