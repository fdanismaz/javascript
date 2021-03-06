var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // specs: [
    //     './tests/common/HomeTests.js', 
    //     './tests/common/SignInTests.js'
    // ],

    suites: {
        common: './tests/common/*Tests.js'
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },

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