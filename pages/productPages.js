const { By, until } = require('selenium-webdriver');

class ProductPage {
    constructor(driver) {
        this.driver = driver;
        /* if want to specify not in category bags and wathces
        this.navbarItems = By.xpath('//div[@data-test-id="CT_Second_Tier_Menu_content"]//a[not(contains(@href, "bags") or contains(@href, "watches"))]'); */
        
        // Use this xpath because only 3 that have more specific category that doesn't have bags and watches in category
        this.navbarItems = By.xpath('//div[@data-test-id="CT_Second_Tier_Menu_content"]//a[text()="Shoes" or text()="Clothing" or text()="Accessories"]');
        this.dropdownItems = By.xpath('//a[@data-test-id="CT_component_ThirdTierManualLinks_0"]');
        this.productItems = By.xpath('//span[@class="break-word clamp-1" and @id="base"]');
        this.addToBag = By.xpath('//span[@style="user-select: none;"]');
        this.goToShoppingBag = By.xpath('//button[@data-test-id="CT-cart-dropdown-place-order"]');
    }

    async hoverOverElementAndClick() {
        try {
            const actions = this.driver.actions({async: true});
            await this.driver.wait(until.elementLocated(this.navbarItems));
            const elements = await this.driver.findElements(this.navbarItems);
            console.log(`Found ${elements.length} elements`);

            if (elements.length === 0){
                console.log('No elements found for the given XPath.');
                return;
            }

            // Select a random element from the list    
            const randomIndex = Math.floor(Math.random() * elements.length);
            const randomElement = elements[randomIndex];     
            await this.driver.wait(until.elementIsVisible(randomElement));
            await this.driver.wait(until.elementIsEnabled(randomElement));
            await actions.move({ origin: randomElement }).perform();
            
            const seeAll = await this.driver.wait(until.elementLocated(this.dropdownItems));
            await this.driver.wait(until.elementIsVisible(seeAll));
            await seeAll.click();
        } catch (error) {
                console.error('Error hovering over element:', error);
    }
}
    
    async clickElementByPrice() {
        try {
            await this.driver.executeScript('window.scrollTo(0, 750);');
            const products = await this.driver.findElements(this.productItems);
            const belowPriceProducts = [];
            for (let element of products) {
                const text = await element.getText();
                // Remove the currency symbol and dots, then convert to a number
                const price = parseInt(text.replace(/[Rp.,\s]/g, ''));
                // Check if the price is less than 10,000,000
                if (price < 10000000) {
                    belowPriceProducts.push(element);
                }
            }

            if (belowPriceProducts.length === 0) {
                console.log('No products less than Rp. 10,000,000');
                return;
            }
                    
            const randomIndex = Math.floor(Math.random() * belowPriceProducts.length);
            const randomProduct = belowPriceProducts[randomIndex]; 
            
            await this.driver.wait(until.elementIsVisible(randomProduct));
            await this.driver.wait(until.elementIsEnabled(randomProduct));
            
            await randomProduct.click();
            const text = await randomProduct.getText();
            const price = parseInt(text.replace(/[Rp.,\s]/g, ''), 10);
            console.log(`Clicked on element with price: Rp.${price.toLocaleString()}`);

        } catch (error) {
            console.error('Error finding or clicking the element:', error);
        }
    }

    async addProductToBag() {
        try {
            await this.driver.wait(until.elementLocated(this.addToBag));
            const addToBag = await this.driver.findElement(this.addToBag);
            await addToBag.click();
            console.log('Product added to bag');
        } catch (error) {
            console.error('Error add to bag:', error);
        }
    }

    async openCartToCheckout() {
        try {
            const cart = await this.driver.findElement(this.goToShoppingBag);
            await cart.click();
            console.log('Redirecting to cart page');
        } catch (error) {
            console.error('Error go to cart:', error);
        }
    }
}

module.exports = ProductPage;
