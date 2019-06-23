var home = require('./../pages/HomePage.js');

describe("Home Page Test Scenarios", () => {

    it("should be in the home page", () => {
        expect(home.titleContains("Home")).toBe(true);
    });

    describe("Conversations", () => {
        it("should list conversations", () => {
            expect(home.conversations.title.getText()).toBe("Conversations");
        })
    
        it("should list 8 conversation items", () => {
            expect(home.conversations.rowCount).toBe(8);
        })
    })

    describe("GitHub Original Series", () => {
        it("should list github original series", () => {
            expect(home.githubOriginalSeries.title.getText()).toBe("GitHub Original Series");
        })

        it("should list 4 items", () => {
            expect(home.githubOriginalSeries.rowCount).toBe(4);
        })
    })

    describe("Quick Links", () => {
        it("should have 2 items", () => {
            expect(home.quickLinks.links.count()).toBe(2);
        })

        it("should contain 'Register'", () => {
            //expect(home.quickLinks.getLink(0).getText()).toBe("Register");

            // a better approach is to test if the link is there without giving specific location
            expect(home.quickLinks.containsLink("Register")).toBe(true);
        })

        it("should contain 'Sign in'", () => {
            expect(home.quickLinks.containsLink("Sign in")).toBe(true);
        })
    })

});