export class LoginCases{
    constructor(page)
    {
        this.page = page
        this.loginlink = "#login2"
        this.usernameInput = "#loginusername"
        this.passwordInput = "#loginpassword"
        this.loginBtn = "//button[normalize-space()='Log in']"
        this.logoutBtn = "#logout2"
    }

    async login(username, password)
    {
        await this.page.goto("https://demoblaze.com/")
        await this.page.locator(this.loginlink).click()
        await this.page.locator(this.usernameInput).fill(username)
        await this.page.locator(this.passwordInput).fill(password)
        await this.page.locator(this.loginBtn).click()
            
    }
}