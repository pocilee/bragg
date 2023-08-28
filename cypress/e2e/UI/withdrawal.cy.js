import uiPom from "../../POM/UI/withdrawal_ui_pom"
import apiPom from "../../POM/API/withdrawal_api_pom"
import data from "../../fixtures/data.json"

describe("Withdrawal page e2e tests", () => {

    beforeEach("Visit the Withdrawal page and set default player state", () => {
        cy.intercept({
            method: "GET",
            url: `${Cypress.env("api")}/qa/status?user_id=${data.userId}`,
          }).as("status");
        
        cy.intercept({
            method: "POST",
            url: `${Cypress.env("api")}/qa/createwd`,
            }).as("wdCreated");

        cy.visit("/withdrawal")

        //reset the player state
        apiPom.resetState({})
        apiPom.changeConfig({})
    })

    it("Assert all the elements on the page", () => {
        uiPom.assertElementsOnThePage()
    })

    it("Log default player/user", () => {
        uiPom.inputAccessKeyAndUserId(data.accessKey, data.userId)
        cy.wait("@status").then(({response}) => {
            expect(response.body.response_code).to.eq("OK");
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(0)
            expect(response.body.response_message.wd_restriction).to.be.true
        })
    })

    it("Make 3 withdrawals", () => {
        uiPom.inputAccessKeyAndUserId(data.accessKey, data.userId)

        uiPom.makeWithdrawal(999)
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains("WD created");
            })
        cy.on('window:confirm', () => true)
        cy.wait("@wdCreated").then(({response}) => {
            console.log("OVDEEEEE:", response)
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("WD created")
        })
        
        cy.wait("@status").then(({response}) => {
            expect(response.body.response_code).to.eq("OK");
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(0)
            expect(response.body.response_message.wd_restriction).to.be.true
        })


        uiPom.makeWithdrawal(888)
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains("WD created");
            })
        cy.on('window:confirm', () => true)
        cy.wait("@wdCreated").then(({response}) => {
            console.log("OVDEEEEE:", response)
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("WD created")
        })
        cy.wait("@status").then(({response}) => {
            expect(response.body.response_code).to.eq("OK");
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(1)
            expect(response.body.response_message.wd_restriction).to.be.true
        })

        uiPom.makeWithdrawal(777)
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains("WD created");
            })
        cy.on('window:confirm', () => true)
        cy.wait("@wdCreated").then(({response}) => {
            console.log("OVDEEEEE:", response)
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("WD created")
        })
        cy.wait("@status").then(({response}) => {
            expect(response.body.response_code).to.eq("OK");
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(2)
            expect(response.body.response_message.wd_restriction).to.be.true
        })

    })

})