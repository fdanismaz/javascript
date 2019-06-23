const BasePage = require('./BasePage');

var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.element;

/**
 * A definition for managing the category list sections in the home page
 */
class CategoryList {
    constructor(locator) {
        this.root = element(locator);
        this.title = this.root.all(by.tagName("h2")).first();
        this.table = this.root.element(by.tagName("table"));
        this.rowCount = this.table.element(by.tagName("tbody")).all(by.tagName("tr")).count();
    }
}

/**
 * A definition for managing the Quick Links section in the home page
 */
class QuickLinks {
    constructor() {
        this.root = element(by.id("quickLinksTaplet"));
        this.links = this.root.all(by.tagName("li"));

        this.getLink = index => {
            return this.links.get(index).element(by.tagName("a"));
        }

        /**
         * @param value The text of the link to be search for
         * @returns true if there exists a link with the given value as argument
         */
        this.containsLink = (value) => {
            return new Promise(async (resolve) => {
                let contains = false;

                // we need to wait for the each method to be completed before resolving
                // otherwise this method will always resolve false
                await this.links.each((e, i) => {
                    e.getText().then(text => {
                        if (text === value) {
                            // set contains to true if the text of the link is equal to the given argument
                            contains = true;
                        }
                    });
                });

                // as of now, we have waited the each method to be resolved (thanks to "await").
                // now we can resolve the result
                resolve(contains);
            });
        }
    }
}

class HomePage extends BasePage {
    
    constructor() {
        super();

        this.conversations = new CategoryList(by.id("categorylistdisplay_0"));
        this.githubOriginalSeries = new CategoryList(by.id("categorylistdisplay_1"));
        this.quickLinks = new QuickLinks();
        this.signInLink = element(by.id("loginPageV2"));
    }

    signIn() {
        this.signInLink.click();
    }
}

module.exports = new HomePage();