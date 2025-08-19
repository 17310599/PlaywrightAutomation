import { LoginCases} from "../POM_Pages/LoginCases";
import {test, expect} from "@playwright/test";

test.describe.configure({ mode: 'serial' });
test("Signing in with valid username and password", async({page})=>{

    const loginObj = new LoginCases(page)
    await loginObj.login("rachitha", "password")
    await page.waitForTimeout(5000)
    await expect(await page.locator(loginObj.logoutBtn)).toHaveText("Log out")

})

test("Signing in with valid username and password", async({page})=>{

    const loginObj = new LoginCases(page)
    await loginObj.login("rachitha", "password123")
    await page.waitForTimeout(5000)
    await expect(await page.locator(loginObj.logoutBtn)).toHaveText("Log out")

})