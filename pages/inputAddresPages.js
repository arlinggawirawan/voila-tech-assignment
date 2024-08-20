const { By, until, Key } = require('selenium-webdriver');
const address = require('../config/address');

class InputAddressPage {
    constructor(driver) {
        this.driver = driver;
        this.selectAddress = By.xpath('//p[@id="base" and contains(@class, "_15kd2we68") and contains(@class, "_17zx15tdc") and contains(@class, "_1ccbe2wc")]');
        this.addAddress = By.xpath('//button[@data-test-id="CT_Component_AddAddress"]');
        this.addressLabel = By.xpath('//input[@data-test-id="CT_Component_AddressLabel" and @name="category"]');
        this.editAddress = By.xpath('//p[@id="base" and contains(@class, "edit-text")]');
        this.recepientName = By.xpath('//input[@data-test-id="CT_component_input-controller_default" and @name="name"]');
        this.fillPhoneNumnber = By.xpath('//input[@data-test-id="CT_Component_AddressPhone" and @name="phone"]');
        this.pinPointAddress = By.xpath('//button[@data-test-id="CT_Component_AddPinpoint" and @type="button"]');
        this.selectLocation = By.xpath('//button[@data-test-id="CT_Component_SelectLocation" and @type="button"]');
        this.fullAddress = By.xpath('//textarea[@data-test-id="CT_component_textarea-controller_default"]');
        this.noteCourier = By.xpath('//input[@data-test-id="CT_component_input-controller_default" and @name="note"]');
        this.saveAddress = By.xpath('//button[@data-test-id="CT_Component_SubmitAddress" and @type="submit"]');
        this.selectNewAddress = By.xpath('//div[starts-with(@data-test-id, "CT_Component_AddressItem_") and .//p[text()="Arlingga-Candidate QA"]]');
        this.confirmAddress = By.xpath('//button[@data-test-id="CT_Component_ChooseAddress"]');
    }
   
    async inputAddress(addressString) {
        try {
            const clickSelectAddress = await this.driver.wait(until.elementLocated(this.selectAddress));
            await clickSelectAddress.click();

            const clickAddAddress = await this.driver.wait(until.elementLocated(this.addAddress));
            await clickAddAddress.click();

            // if the flow is edit address
            /* const clickEditAddress = await this.driver.wait(until.elementLocated(this.editAddress));
            await this.driver.wait(until.elementIsVisible(clickEditAddress));
            await clickEditAddress.click();

            const recepient = await this.driver.wait(until.elementLocated(this.recepientName));
            await this.driver.wait(until.elementIsVisible(recepient));
            await this.driver.executeScript("arguments[0].scrollIntoView();", recepient);

            await this.driver.wait(until.elementIsVisible(recepient));
            for (let i = 0; i < 8; i++) {
                await recepient.sendKeys(Key.BACK_SPACE);
            }
            await recepient.sendKeys(address.name);
            console.log('Successfully entered recipient name:', address.name); */

            //if flow is add new address
            const inputAddressLabel = await this.driver.wait(until.elementLocated(this.addressLabel));
            await inputAddressLabel.sendKeys(address.label);

            const recepient = await this.driver.wait(until.elementLocated(this.recepientName));
            await recepient.sendKeys(address.name);

            const inputPhoneNumber = await this.driver.wait(until.elementLocated(this.fillPhoneNumnber));
            await inputPhoneNumber.sendKeys(address.phoneNumber);

            const clickPinPointAddress = await this.driver.wait(until.elementLocated(this.pinPointAddress));
            await this.driver.wait(until.elementIsVisible(clickPinPointAddress));
            await clickPinPointAddress.click();
            const clickSelectLocation = await this.driver.wait(until.elementLocated(this.selectLocation));
            await this.driver.wait(until.elementIsVisible(clickSelectLocation));
            await clickSelectLocation.click();

            const clickSaveAddress = await this.driver.wait(until.elementLocated(this.saveAddress));
            await this.driver.wait(until.elementIsVisible(clickSaveAddress));
            await this.driver.executeScript("arguments[0].scrollIntoView();", clickSaveAddress);

            const inputFullAddress = await this.driver.wait(until.elementLocated(this.fullAddress));
            await this.driver.wait(until.elementIsVisible(inputFullAddress));
            await inputFullAddress.sendKeys(address.fullAddress);

            const inputNoteCourier = await this.driver.wait(until.elementLocated(this.noteCourier));
            await this.driver.wait(until.elementIsVisible(inputNoteCourier));
            await inputNoteCourier.sendKeys(address.note);

            await clickSaveAddress.click();

            const clickSaveNewAddress = await this.driver.wait(until.elementLocated(this.selectNewAddress));
            await this.driver.wait(until.elementIsVisible(clickSaveNewAddress));
            await clickSaveNewAddress.click();

            const clickConfirmAddress = await this.driver.wait(until.elementLocated(this.confirmAddress));
            await this.driver.wait(until.elementIsVisible(clickConfirmAddress));
            await clickConfirmAddress.click();

        } catch (error) {
            console.error('Error Input:', error);
        }
    }
}

module.exports = InputAddressPage;