var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        './tests/HomeTests.js', 
        './tests/SignInTests.js'
    ],
    
    onPrepare: () => {
        browser.waitForAngularEnabled(true);
        browser.driver.manage().window().maximize();
        browser.get("https://github.community/");
        browser.waitForAngular();

        // jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        //     savePath: 'target'
        // }));
    },

    onComplete: () => {
        browser.sleep(2000);
    }
};