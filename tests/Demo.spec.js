import { test,expect } from "@playwright/test";

/*test('login', async({page})=>{

    await page.goto("https://www.saucedemo.com/", {timeout: 60000})
    await page.fill('id=user-name', "standard_user")
    await page.fill('id=password', "secret_sauce")
    await page.click('id=login-button')
    await expect(page.locator("//div[text()='Swag Labs']")).toBeVisible();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page).toHaveTitle("Swag Labs")
})

//test('products', async({page}) =>{

    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    await expect(products).toBeVisible();
})

test('radiobuttons', async({page})=> {

    await page.goto("https://omayo.blogspot.com/")
    await page.click("id=radio1")

})

test("dropdown", async({page})=>{
    
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#country').selectOption({value: 'uk'})
    await expect(page.locator('#country')).toHaveValue("uk")

    const options = await page.$$('#country option');
await expect(options.length).toBe(10);

let status = false;

for (let option of options) {
    const text = await option.textContent();  // ✅ await here
    console.log(text);

    if (text.trim() === 'United Kingdom') {   // ✅ trim to avoid whitespace mismatch
        status = true;
        break;
    }
}

await expect(status).toBeTruthy();

})*/

test.skip('multidropdown', async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#colors').selectOption(['Red', 'Blue'])
    const selectedOptions = await page.$$eval('#colors option', options =>
   options.filter(option => option.selected).map(option => option.value)
  );
  console.log("seleced options: "+ selectedOptions)
  await expect(selectedOptions.length).toBe(2)
  await expect(selectedOptions).toEqual(expect.arrayContaining(['red','blue']))
    await page.waitForTimeout(5000)
})

test.skip('alerts', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe("I am an alert box!")
        await dialog.accept()
    })
    await page.click('#alertBtn')

    await page.waitForTimeout(5000)

})

test.skip('confirmDialog', async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe("Press a button!")
        await dialog.dismiss()

    })
    await page.click('#confirmBtn')
    await expect(page.locator('#demo')).toHaveText("You pressed Cancel!")
    await page.waitForTimeout(5000)
})

test.skip('promptDilog', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on('dialog', async dialog=>{
        expect(dialog.type()).toBe('prompt')
        expect(dialog.message()).toBe('Please enter your name:')
        expect(dialog.defaultValue()).toBe('Harry Potter')
        await dialog.accept('John')
    })
    await page.click('#promptBtn')
    await expect(page.locator('#demo')).toHaveText("Hello John! How are you today?")

    await page.waitForTimeout(5000)
})

test('checkbox', async({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/")
   const checkbox = await page.click("#sunday")
   await expect(page.locator('#sunday')).toBeChecked()
   await page.uncheck('#sunday')
   const ischecked =  await page.locator('#sunday').isChecked()
   await expect(ischecked).toBeFalsy()

})