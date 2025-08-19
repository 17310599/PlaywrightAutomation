import { HomePage } from "../POM_Pages/HomePage";
import{test, expect} from "@playwright/test";

test('Signing in and Adding Product to the cart', async({page})=>{
    const home = new HomePage(page);
    home.gotoLogin();
    await page.waitForTimeout(5000)

    home.SelectingCategory();
    await page.waitForTimeout(5000)

    home.addProductToCart('MacBook Pro')
    await page.waitForTimeout(5000)
    
    const status = await home.gotoCart('MacBook Pro')
    expect(await status).toBe(true)
})