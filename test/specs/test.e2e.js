import { expect } from '@wdio/globals'


describe('Saucedemo Test Cases', () => {
    it('Test Case 1 - Verify Successful Login Redirects to Inventory Page', async () => {
        await browser.url('https://www.saucedemo.com/')
        //login
        const username =  await browser.$('input#user-name')
        const password =  await browser.$('input#password')
        const loginButton = await browser.$('input#login-button')
        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()
        //Verify Successfully Inventory Page Loaded
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        const webTitle = await browser.$("[data-test='title']")
        await webTitle.waitForDisplayed()
        await expect(webTitle).toHaveText('Products')
        
    })

    it('Test Case 2 - Successful Add Item to Cart', async () => {
        //Add Item to Cart
        const addToCartButton =  await browser.$('button#add-to-cart-sauce-labs-backpack')
        await addToCartButton.click()
        //Verify Cart Counter Increases
        const cartItemCounter = await browser.$("[data-test='shopping-cart-badge']")
        await cartItemCounter.waitForDisplayed()
        await expect(cartItemCounter).toHaveText('1')
        //Navigate to Cart Page
        const cartButton = await browser.$("[data-test='shopping-cart-link']")
        await cartButton.click()
        //Verify Successfully Inventory Page Loaded
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        const webTitle = await browser.$("[data-test='title']")
        await webTitle.waitForDisplayed()
        await expect(webTitle).toHaveText('Your Cart')
        //Verify Item Succesfully Added to Cart
        const itemName = await browser.$("[data-test='item-4-title-link']")
        await itemName.waitForDisplayed()
        await expect(itemName).toHaveText('Sauce Labs Backpack')
    })
})

