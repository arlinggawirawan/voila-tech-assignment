const { By, until } = require('selenium-webdriver');

class PaymentPage {
    constructor(driver) {
        this.driver = driver;
        this.payment = By.xpath('//div[@data-test-id="CT_Component_SelectorPayment_ButtonPayment"]');
        this.clickPaymet = By.xpath('//p[contains(@class, "_15r4f4dmn") and text()="Select Payment"]');
        this.componentPayment = By.xpath('//p[@id="base" and text()="Bank Transfer"]');
        this.selectPayment = By.xpath('//p[@id="base"and text()="BCA Bank Transfer"]');
        this.confirmPaymentMethod = By.xpath('//button[@data-test-id="CT_Component_PaymentListFooter_ButtonConfirm"]');
    }

    async scrollToPaymet () {
        try {
            const scrollPayment = await this.driver.wait(until.elementLocated(this.payment));
            await this.driver.wait(until.elementIsVisible(scrollPayment));
            await this.driver.executeScript("arguments[0].scrollIntoView();", scrollPayment);
        } catch (error) {
            console.error('Error scrolling to payment:', error);
        }
    }

    async selectPaymentMethod () {
        try {
            
            const clickPaymentMethod = await this.driver.wait(until.elementLocated(this.clickPaymet));
            await this.driver.wait(until.elementIsVisible(clickPaymentMethod));
            await clickPaymentMethod.click();

            const clickComponentPayment = await this.driver.wait(until.elementLocated(this.componentPayment));
            await this.driver.wait(until.elementIsVisible(clickComponentPayment));
            await clickComponentPayment.click();

            const clickSelectPayment = await this.driver.wait(until.elementLocated(this.selectPayment));
            await this.driver.wait(until.elementIsVisible(clickSelectPayment));
            await clickSelectPayment.click();

            const clickConfirmPaymentMethod = await this.driver.wait(until.elementLocated(this.confirmPaymentMethod));
            await this.driver.wait(until.elementIsEnabled(clickConfirmPaymentMethod));
            await clickConfirmPaymentMethod.click();
            console.log('Payment selected');

        } catch (error) {
            console.error('Error select payment method:', error);
        }
    }
}

module.exports = PaymentPage;