var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.element;

// page is non-angular
browser.ignoreSynchronization = true;

var BasePage = require("./BasePage");

class SignInPage extends BasePage {

    constructor() {
        super();
        this.username = element(by.id("login_field"));
        this.password = element(by.id("password"));
        this.signInButton = element(by.id("login")).element(by.css("input[type='submit']"));
        this.errorMessage = element(by.id("js-flash-container")).element(by.className('container'));
    }
    
    open(homePage) {
        homePage.signIn();
    }

    login(username, password) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.signInButton.click();
    }

    cleaForm() {
        this.username.clear();
        this.password.clear();
    }

    isErrorMessageDisplayed() {
        return this.hasText(this.errorMessage, "Incorrect username or password.");
    }
}

module.exports = new SignInPage();