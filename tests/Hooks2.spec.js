import {test, expect} from "@playwright/test";


test.beforeAll('Login', async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.click("#login-button")

})

test('AddtoCart', async({page})=>{
    const AddToCart_Buttons = await page.locator("//button[text()='Add to cart']").first()
    await AddToCart_Buttons.click()
    await page.locator('.shopping_cart_link').click()
    await expect(page.locator('.inventory_item_name')).toBeVisible()
    await page.waitForTimeout(5000)
})

test('Filter', async({page})=>{
    await page.goto("https://www.saucedemo.com/inventory.html")
    await page.locator('.product_sort_container').selectOption({index: 3})
    await page.waitForTimeout(5000)
})

test.afterAll('Logout', async({page})=>{
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#logout_sidebar_link').click()

})