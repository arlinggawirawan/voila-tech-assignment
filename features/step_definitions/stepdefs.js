const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/loginPages');
const ProductPage = require('../../pages/productPages');
const CheckoutPage = require('../../pages/checkoutPages');
const InputAddressPage = require('../../pages/inputAddresPages');
const CourierPage = require('../../pages/courierPages');
const PaymentPage = require('../../pages/paymentPages');
const ValidationPrice = require('../../pages/validationPrice')
require('../support/hooks');

setDefaultTimeout(60 * 1000);

let loginPage;
let productPages;
let checkoutPages;
let inputAddresPages;
let courierPages;
let paymentPages;
let validationPrice;

Given('I am logged into the application', async function () {
    loginPage = new LoginPage(this.driver);
    await loginPage.signIn();
    await this.driver.sleep(2000);
});

When('I add a product to the cart with a price below IDR 10,000,000 that is not in category BAG or WATCH', async function () {
    productPages = new ProductPage(this.driver);
    await productPages.hoverOverElementAndClick();
    await this.driver.sleep(2000);
    await productPages.clickElementByPrice();
    await this.driver.sleep(2000);
    await productPages.addProductToBag();
    await this.driver.sleep(2000);
    await productPages.openCartToCheckout();
});

When('I proceed to checkout', async function () {
    checkoutPages = new CheckoutPage(this.driver);
    await checkoutPages.checkout();
});

When('I input my shipping address as {string}', async function (addressString) {
    inputAddresPages = new InputAddressPage(this.driver);
    await inputAddresPages.inputAddress(addressString);
    await this.driver.sleep(2000);
});

When('I choose the courier', async function () {
    courierPages = new CourierPage(this.driver);
    await courierPages.selectCourier();
    await this.driver.sleep(2000);
});

When('I choose "midtrans" as the payment method', async function () {
    paymentPages = new PaymentPage(this.driver);
    await paymentPages.scrollToPaymet();
    await paymentPages.selectPaymentMethod();
});

Then('I should see the correct transaction amount', async function () {
    validationPrice = new ValidationPrice(this.driver);
    await validationPrice.validatePrice();
});




