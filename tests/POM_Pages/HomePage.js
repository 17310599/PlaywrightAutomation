export class HomePage{

    constructor(page){
        this.page = page
        this.loginlink = "#login2"
        this.usernameInput = "#loginusername"
        this.passwordInput = "#loginpassword"
        this.loginBtn = "//button[normalize-space()='Log in']"
        this.laptopsCategory = "//a[normalize-space()='Laptops']"
        this.product_list ="//h4[@class='card-title']"
        this.addToCartBtn = "//a[normalize-space()='Add to cart']"
        this.cartBtn = "#cartur"
        this.products_inCart = "tbody tr td"
    }

    async gotoLogin(){
        await this.page.goto("https://demoblaze.com/")
        await this.page.locator(this.loginlink).click();
        await this.page.locator(this.usernameInput).fill('rachitha')
        await this.page.locator(this.passwordInput).fill('password')
        await this.page.locator(this.loginBtn).click()
      
    }
    async SelectingCategory()
    {
        await this.page.locator(this.laptopsCategory).click()
    }

    async addProductToCart(productName){
        const products= await this.page.$$(this.product_list)
        for(let product of products)
        {
            if(await product.textContent() === productName)
            {
                await product.click()
                break;

            }
        }

        await this.page.on('dialog', async dialog=>{
            if(await dialog.message().includes('Product added'))
            {
                await dialog.accept();
            }
        })
        await this.page.locator(this.addToCartBtn).click()
    }

    async gotoCart(productName)
    {
        await this.page.locator(this.cartBtn).click()
        await this.page.waitForTimeout(10000)
        const Allproducts = await this.page.$$(this.products_inCart)
        for(let product of Allproducts)
        {
            //console.log("productname", await product.textContent())
            if(await product.textContent() === productName)
            {
                console.log(await product.textContent())
                return true;
                break;
            }
        }


    }

}