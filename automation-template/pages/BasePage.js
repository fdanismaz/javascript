var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.element;
var ec = protractor.ExpectedConditions;

module.exports = class BasePage {
    isVisible(locator, time = 1000) {
        return browser.wait(ec.visibilityOf(locator), time);
    }

    isNotVisivle(locator, tıme = 1000) {
        return browser.wait(ec.invisibilityOf(locator), time);
    }

    inDom(locator, time = 1000) {
        return browser.wait(ec.presenceOf(locator), time);
    }

    isClickable(locator, time = 1000) {
        return browser.wait(ec.elementToBeClickable(locator), time);
    }

    hasText(locator, text, time = 1000) {
        return browser.wait(ec.textToBePresentInElement(locator, text), time);
    }

    valueHasText(locator, text, time = 1000) {
        return browser.wait(ec.textToBePresentInElementValue(locator, text), time);
    }

    titleIs(title, time = 1000) {
        return browser.wait(ec.titleIs(title), time);
    }

    titleContains(value, time = 1000) {
        return browser.wait(ec.titleContains(value), time);
    }

    hitEnter() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    currentUrl() {
        return browser.getCurrentUrl();
    }

    switchToNewWindow() {
        browser.getAllWindowHandles().then(handles => {
            browser.switchTo().window(handles[handles.length - 1]);
        });
    }

    closeCurrentWindow() {
        browser.getAllWindowHandles().then(handles => {
            browser.close();

            // the parent should be 2 less than the length of all found window handlers
            browser.switchTo().window(handles[handles.length - 2]);
        })
    }
}