var homePage = require('./../pages/HomePage.js');
var signInPage = require('./../pages/SignInPage');
var data = require('./testdata/LoginData');
var using = require('jasmine-data-provider');

describe("Home Page Test Scenarios", () => {

    it("should navigate to sign-in page", () => {
        homePage.signIn();
        expect(signInPage.titleContains("Sign in")).toBe(true);
    })

    using(data.InvalidCredentials, (credential, description) => {
        it("should not be logged in with invalid credentials" + description, ()=> {
            signInPage.login(credential.username, credential.password);
            signInPage.cleaForm();
            expect(signInPage.isErrorMessageDisplayed()).toBe(true);
        })

    })
    
});