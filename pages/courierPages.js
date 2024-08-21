const { By, until } = require('selenium-webdriver');

class CourierPage {
    constructor(driver) {
        this.driver = driver;
        this.courier = By.xpath('//div[@data-test-id="CT_Component_ShippingSelector_ButtonShipping"]');
        this.chooseCourier = By.xpath('//div[@data-test-id="CT_component_shipping-item-item"]');
        this.confirmCourier = By.xpath('//button[text()="Confirm"]');
    }

    async selectCourier () {
        try {
            const clickCourier = await this.driver.wait(until.elementLocated(this.courier));
            await this.driver.wait(until.elementIsVisible(clickCourier));
            await clickCourier.click();

            const clickChooseCourier = await this.driver.wait(until.elementLocated(this.chooseCourier))
            await this.driver.wait(until.elementIsVisible(clickChooseCourier));
            await clickChooseCourier.click();

            const clickConfirmCourier = await this.driver.wait(until.elementLocated(this.confirmCourier));
            await this.driver.wait(until.elementIsVisible(clickChooseCourier));
            await clickConfirmCourier.click();
            console.log('Courier selected');

        } catch (error) {
        console.error('Error choose courier:', error);
        }
    }
}

module.exports = CourierPage;