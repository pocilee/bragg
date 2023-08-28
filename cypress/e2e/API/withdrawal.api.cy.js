import apiPom from "../../POM/API/withdrawal_api_pom"
import data from "../../fixtures/data.json"

describe("Withdrawal page API tests", () => {

    beforeEach("Set default player state", () => {
        //reset the player state
        apiPom.resetState({}).then((response) => {

        })
        apiPom.changeConfig({})
    })

    it("Make a successfull withdrawal", () => {
        apiPom.createWithdrawal({})
        .then((response) => {
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("WD created")
        })
        //check status
        apiPom.getStatus({})
        .then((response) => {
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(1)
            expect(response.body.response_message.wd_restriction).to.be.true
        })
    })

    it("Make 3 withdrawals and block fourth one", () => {
        //create first 3 successful withdrawals
        for(let i = 0; i < 3; i++) {
            apiPom.createWithdrawal({})
            .then((response) => {
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("WD created")
         })
        }
        //make fourth withdrawal - should be unsuccessful
        apiPom.createWithdrawal({})
        .then((response) => {
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message).to.eq("max wd reached")
        })

        //check status
        apiPom.getStatus({})
        .then((response) => {
            expect(response.body.response_code).to.eq("OK")
            expect(response.body.response_message.account_state).to.be.true
            expect(response.body.response_message.wd_count).to.eq(3)
            expect(response.body.response_message.wd_restriction).to.be.true
        })
        
    })

})