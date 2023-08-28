import data from "../../fixtures/data.json"

export default {

    getStatus({
        userId = data.userId,
        accessKey = data.accessKey,
        statusCode = 200
      }) {
        return cy
          .request({
            failOnStatusCode: false,
            method: "GET",
            url: `${Cypress.env("api")}/qa/status?user_id=${userId}`,
            headers: {
              "access-key": accessKey
            }
          }).then((response) => {
            expect(response.status).to.eq(statusCode);
            return response;
        });
      },

    resetState({
        userId = data.userId,
        accessKey = data.accessKey
    }) {
        return cy
          .request({
            failOnStatusCode: false,
            method: "POST",
            url: `${Cypress.env("api")}/qa/reset?user_id=${userId}`,
            headers: {
              "access-key": accessKey,
              "Content-Type": "application/json"
            },
            body: {
                user_id: userId
            }
          })
    },

    changeConfig({
        userState = true,
        wdRestriction = true,
        userId = data.userId,
        accessKey = data.accessKey
    }) {
        return cy
        .request({
          failOnStatusCode: false,
          method: "POST",
          url: `${Cypress.env("api")}/qa/changeconfig?user_id=${userId}`,
          headers: {
            "access-key": accessKey,
            "Content-Type": "application/json"
          },
          body: {
            user_state: userState,
            wd_restriction: wdRestriction
          }
        })
    },

    createWithdrawal({
        amount = 999,
        userId = data.userId,
        accessKey = data.accessKey,
        statusCode = 200
    }) {
        return cy
        .request({
          failOnStatusCode: false,
          method: "POST",
          url: `${Cypress.env("api")}/qa/createwd?user_id=${userId}`,
          headers: {
            "access-key": accessKey,
            "Content-Type": "application/json"
          },
          body: {
            user_id: userId,
            amount: amount
          }
        }).then((response) => {
            expect(response.status).to.eq(statusCode);
            return response;
        });
    }
    
}