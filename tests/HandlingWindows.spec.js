import { test, expect, chromium} from "@playwright/test";

test.skip('Handling Windows', async()=>{

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await context.newPage()
    await page1.goto("https://testautomationpractice.blogspot.com/")
    await expect(page1).toHaveURL("https://testautomationpractice.blogspot.com/")

    const page2 = await context.newPage()
    await page2.goto("https://demoblaze.com/")
    await expect(page2).toHaveURL("https://demoblaze.com/")

    await page1.waitForTimeout(3000)
    await page2.waitForTimeout(3000)

})

test("Handling windows and popups", async()=>{
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await context.newPage()

    await page1.goto("https://testautomationpractice.blogspot.com/")
    //assertion on page1
    await expect(page1).toHaveTitle("Automation Testing Practice")
    await expect(page1.locator("//h2[text()='Alerts & Popups']")).toBeVisible()
    
    //handling a window
    const page2 = context.waitForEvent('page')
    await page1.locator("//button[text()='New Tab']").click()

    const newpage = await page2
    //assertion on page2
    await expect(newpage).toHaveTitle("SDET-QA Blog")
    await expect(newpage.locator("//h1[normalize-space()='SDET-QA Blog']")).toBeVisible()

    //handling popup
    const page3 = context.waitForEvent('page')
    await page1.locator("#PopUp").click()
    const newpage2 = await page3
    //assertion on page3
    await expect(newpage2).toHaveTitle("Selenium")
    await expect(newpage2.locator("#Layer_1")).toBeVisible()


    await page1.waitForTimeout(3000)
    await newpage.waitForTimeout(3000)
    await newpage2.waitForTimeout(3000)
})