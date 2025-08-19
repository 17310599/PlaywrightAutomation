import {test, expect} from '@playwright/test'
import path from 'path';

test.skip('inputFields', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page).toHaveTitle("Automation Testing Practice")
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/")
    const name = await page.getByPlaceholder('Enter Name')
    name.fill('Rachitha')
    await expect(name).toHaveValue('Rachitha')
    const email = await page.getByPlaceholder('Enter EMail')
    email.fill('rachitha@gmail.com')
    await expect(email).toHaveValue('rachitha@gmail.com')
    await page.getByPlaceholder('Enter Phone').fill('9876543210')
    await expect(page.getByPlaceholder('Enter Phone')).toHaveValue('9876543210')
    await page.fill('#textarea', "Bangalore")
    await expect(page.locator('#textarea')).toHaveValue('Bangalore')
    await page.check('#female')
    await expect(page.locator('#female')).toBeChecked()
    await expect(page.locator('#male')).not.toBeChecked()
    await page.check('#sunday')
    await expect(page.locator('#sunday').isChecked()).toBeTruthy()
    const unchecked_Checkbox= await page.locator('#monday').isChecked()
    await expect(unchecked_Checkbox).toBeFalsy()
    await page.waitForTimeout(5000)

})


test.skip('iframes', async ({ page }) => {
  await page.goto("https://demoqa.com/nestedframes");

  // Get the parent iframe by URL
  const parentFrame = await page.frame({ url: 'https://demoqa.com/sampleiframe' });

  // Get the child frame inside the parent iframe
  const childFrame = parentFrame?.childFrames()[0];

  // Locate the paragraph element
  const textLocator = childFrame?.locator("//p[text()='Child Iframe']");

  // Optional: Print the text content to console (with await!)
  const actualText = await textLocator?.textContent();
  console.log("Text content:", actualText);

  // Assertion using locator directly
  await expect(textLocator).toHaveText("Child Iframe");
});


test.skip('ifrarmes', async({page})=>{
    await page.goto("https://demoqa.com/nestedframes")
    const parentframe =await page.frame({url: 'https://demoqa.com/sampleiframe'})
    const childframe=await parentframe.childFrames()
    const text = await childframe[0].locator("//p[text()='Child Iframe']")
    console.log("text:"+ await text.textContent())
    //await expect(text.textContent()).toHaveText("Child Iframe")
   // await expect(page.locator("//body[text()='Parent frame']")).toBeVisible()

})

test.skip('WebTables', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    const table = await page.locator("table[name='BookTable']")
    const rows = await page.locator("table[name='BookTable'] tbody tr")
    console.log("Number of rows:", await rows.count())
    const columns = await page.locator("table[name='BookTable'] tbody tr th")
    console.log("Number of columns:",await columns.count())

    for(let i=0;i<await rows.count();i++)
    {
        const row = rows.nth(i)
        const eachCell = row.locator('td')
        console.log(await eachCell.count())
        const prices = await page.locator("//table[@name='BookTable']/tbody/tr/td[4]")
        for(let j=0;j< await prices.count();j++)
        {
            //console.log(await prices.nth(j).textContent())
            if(await prices.nth(j).textContent() > 1000)
            {
                for(let j=0;j< await eachCell.count();j++)
                {
                    console.log(await eachCell.nth(j).textContent())
                }
            }
        }
       
    }
})

test.skip('DatePicker', async({page})=>{
    
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.click('#txtDate')
    const year = await page.locator('.ui-datepicker-year').textContent()
    const month = await page.locator('.ui-datepicker-month').textContent()
    console.log("year and month",year, month)
   /* while(year!== "2000" && month!=="Aug") 
    {
     await page.locator('.ui-icon ui-icon-circle-triangle-w')
    }*/

    const dates = await page.$$("//a[@class='ui-state-default']")
    for( let date of dates)
    {
        if(await date.textContent() == '10')
        {
            await date.click()
            await date.press('Enter')
            break
        }
    }
    
    await page.waitForTimeout(5000)
    
})

test.skip('mouse actions', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/#")
    const pointMe_button = await page.locator(".dropbtn")
    await pointMe_button.hover()
    const laptops = await page.locator("//a[text()='Laptops']")
    await laptops.hover()

    const popup = await page.locator("#PopUp")
    await popup.click({button : 'right'})

    const copyText_button = await page.locator("//button[text()='Copy Text']")
    await copyText_button.dblclick()
    const field_value = await page.locator('#field2').inputValue()
    await expect(field_value).toEqual("Hello World!")
    await page.waitForTimeout(5000)

    const drag = await page.locator('#draggable')
    const drop = await page.locator('#droppable')
    /*await drag.hover()
    await page.mouse.down()
    await drop.hover()
    await page.mouse.up()*/
    await drag.dragTo(drop)
    await expect(page.locator("//p[text()='Dropped!']")).toBeVisible()

})

test.skip('Keyboard actions', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/#')
    await page.locator('#input1').fill("hello world!!")
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')

    await page.locator('#input2').click()
    await page.keyboard.press('Control+V')

    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')
    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')

    await page.locator('#input3').click()
    await page.keyboard.press('Control+V')

    await page.waitForTimeout(5000)
})

test.skip('UploadSingleFile', async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/#")
        await page.locator('#singleFileInput').setInputFiles("tests\\uploadFiles\\testFile1.txt")
        const inputValue= await page.locator('#singleFileInput').inputValue()
        await expect(inputValue).toEqual("C:\\fakepath\\testFile1.txt")

        await page.waitForTimeout(5000)
})

test.skip('UploadMultipleFiles', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/#")
      const file1 = path.resolve('tests/uploadFiles/testFile1.txt');
  const file2 = path.resolve('tests/uploadFiles/testFile2.txt');
    await page.locator("#multipleFilesInput").setInputFiles([file1, file2])
    console.log("multipleFiles: ", await page.locator("#multipleFilesInput").inputValue())
    await page.locator('#multipleFilesInput').setInputFiles([])
    await page.waitForTimeout(10000)
})

test.skip('screenshots', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/#')
    const filepath = path.join('tests', 'Screenshots', 'screenshot2.png')
    await expect(page.locator('.jstart')).toBeVisible()
    //.screenshot({path:filepath, fullPage: true})
})

test('test1@a', async({page, browserName})=>{
    console.log("test1")
    if(browserName === 'firefox')
    {
        test.skip()
    }
})
test.fixme('test2@b', async({page})=>{
    test.setTimeout(5000)
    console.log("test2")
})
test('test3@a@b', async({page})=>{
    test.fail()
    console.log("test3")
})