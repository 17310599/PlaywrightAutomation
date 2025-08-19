import { LoginCases} from "../POM_Pages/LoginCases";
import {test, expect} from "@playwright/test";

test.describe.configure({ mode: 'serial' });
test("Signing in with valid username and password", async({page})=>{

    const loginObj = new LoginCases(page)
    await loginObj.login("rachitha", "password")
    await page.waitForTimeout(5000)
    await expect(await page.locator(loginObj.logoutBtn)).toHaveText("Log out")

})

test("Signing in with invalid username", async({page})=>{
    const loginObj = new LoginCases(page)
    let status= false
    page.once('dialog', async dialog=>{
        console.log("message", dialog.message())
        if(dialog.message().includes("User does not exist."))
        {
            await dialog.accept()
            status = true;

        }
    })
    await loginObj.login("rachi", "password")
    await page.waitForTimeout(3000)
    expect(status).toBe(true)
})

test('Signing in with invalid password', async({page})=>{
    const loginObj = new LoginCases(page)
    let status1 = false
    page.once('dialog', async dialog=>{
        if(dialog.message().includes("Wrong password."))
        {
            console.log("message", await dialog.message())
            await dialog.accept()
            status1 = true
        }
    })
    await loginObj.login("rachitha", "password123")
    await page.waitForTimeout(3000)
    expect(status1).toBe(true)
})

test("Signing in without providing username and password", async({page})=>{

    const loginObj = new LoginCases(page)
    await page.goto("https://demoblaze.com/")
    let status2 = false
    //await page.locator(loginObj.loginlink).click()
    page.once('dialog', async dialog=>{
        if(dialog.message().includes("Please fill out Username and Password."))
        {
            await dialog.accept()
            status2 = true
        }
    })
    await loginObj.login("","")
    //await page.locator(loginObj.loginBtn).click()
    await page.waitForTimeout(3000)
    expect(status2).toBe(true)
    
})