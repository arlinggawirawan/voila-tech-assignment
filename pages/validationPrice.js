const { By, until } = require('selenium-webdriver');
const { assert } = require('chai');

class ValidationPrice {
    constructor(driver) {
        this.driver = driver;
        this.subtotalPrice = By.xpath('//p[@id="base" and contains(@class, "_15kd2weow") and contains(@class, "_1ccbe2wa") and not(contains(@class, "_10bvfcq0"))]');
        this.additionalPrice = By.xpath('//p[@id="base" and contains(@class, "_15r4f4dnx") and contains(@class, "_1ccbe2wb")]');
        this.total = By.xpath('//p[@id="base" and contains(@class, "_15kd2we68") and contains(@class, "_17zx15tgg") and contains(@class, "_17zx15t9s") and contains(@class, "_17zx15te8")]');
    }

    async parseCurrencyText(text) {
        if (typeof text !== 'string') {
            throw new Error('Expected a string input for parseCurrencyText');
        }
        const cleanedText = text.replace(/[^\d,]/g, '').replace(/,/g, '');
        return parseFloat(cleanedText);
    }

    async validatePrice() {
        try {

            const subtotalElement = await this.driver.wait(until.elementLocated(this.subtotalPrice));
            const additionalElement = await this.driver.wait(until.elementLocated(this.additionalPrice));
            const totalElement = await this.driver.wait(until.elementLocated(this.total));

            await this.driver.wait(until.elementIsVisible(subtotalElement));
            await this.driver.wait(until.elementIsVisible(additionalElement));
            await this.driver.wait(until.elementIsVisible(totalElement));

            const priceSubtotalText = await subtotalElement.getText();
            const additionalAmountText = await additionalElement.getText();
            const priceTotalText = await totalElement.getText();

            console.log(`Subtotal Text: ${priceSubtotalText}`);
            console.log(`Additional Amount Text: ${additionalAmountText}`);
            
            const priceSubtotal = await this.parseCurrencyText(priceSubtotalText);
            const additionalAmount = await this.parseCurrencyText(additionalAmountText);
            const priceTotal = await this.parseCurrencyText(priceTotalText);
            
            console.log(`Parsed Subtotal: ${priceSubtotal}`);
            console.log(`Parsed Additional Amount: ${additionalAmount}`);
            console.log(`Total Text: ${priceTotalText}`);
            console.log(`Parsed Total: ${priceSubtotal + additionalAmount}`);
            console.log(`Actual Total: ${priceTotal}`);
            
            // Assert the calculated total equals the displayed total
            assert.strictEqual(priceTotal, priceSubtotal + additionalAmount, 'The calculated total does not match with total.');
            console.log('The calculated total matches with displayed total:', priceTotal);
        } catch (error) {
            console.error('Error during assertion:', error);
        }
    }
}

module.exports = ValidationPrice;