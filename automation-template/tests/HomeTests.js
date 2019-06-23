var homePage = require('./../pages/HomePage.js');

describe("Home Page Test Scenarios", () => {

    it("should be in the home page", () => {
        expect(homePage.titleContains("Home")).toBe(true);
    });

    describe("Conversations", () => {
        it("should list conversations", () => {
            expect(homePage.conversations.title.getText()).toBe("Conversations");
        })
    
        it("should list 8 conversation items", () => {
            expect(homePage.conversations.rowCount).toBe(8);
        })
    })

    describe("GitHub Original Series", () => {
        it("should list github original series", () => {
            expect(homePage.githubOriginalSeries.title.getText()).toBe("GitHub Original Series");
        })

        it("should list 4 items", () => {
            expect(homePage.githubOriginalSeries.rowCount).toBe(4);
        })
    })

    describe("Quick Links", () => {
        it("should have 2 items", () => {
            expect(homePage.quickLinks.links.count()).toBe(2);
        })

        it("should contain 'Register'", () => {
            //expect(home.quickLinks.getLink(0).getText()).toBe("Register");

            // a better approach is to test if the link is there without giving specific location
            expect(homePage.quickLinks.containsLink("Register")).toBe(true);
        })

        it("should contain 'Sign in'", () => {
            expect(homePage.quickLinks.containsLink("Sign in")).toBe(true);
        })
    })

});