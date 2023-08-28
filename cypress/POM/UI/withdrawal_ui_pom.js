/// <reference types="cypress" />

import data from "../../fixtures/data.json"

export default {

    get mainHeader() {
        return cy.get("h1");
    },
    get accessKeyLabel() {
        return cy.get("label[for='accessKey']")
    },
    get accessKeyInput() {
        return cy.get("input[id='accessKey']")
    },
    get userIdLabel() {
        return cy.get("label[for='userId']")
    },
    get  userIdInput() {
        return cy.get("input[id='userId']")
    },
    get okBtn() {
        return cy.get("button[id='okBtn']")
    },
    get amountContainer() {
        return cy.get("div[class='container']")
    },
    get amountLabel() {
        return cy.get("label[for='amount']")
    },
    get amountInput() {
        return cy.get("input[id='amount']")
    },
    get requestWithdrawalBtn() {
        return cy.get("button[id='submitBtn']")
    },

    assertElementsOnThePage() {
        this.mainHeader
        .should("be.visible")
        .and("have.text", data.mainHeader)
        this.accessKeyLabel.
        should("be.visible")
        .and("have.text", data.accessKeyLabel)
        this.accessKeyInput
        .should("be.visible")
        this.userIdLabel
        .should("be.visible")
        .and("have.text", data.userIdLabel)
        this.userIdInput.
        should("be.visible")
        this.amountContainer
        .should("be.visible")
        this.amountLabel
        .should("be.visible")
        .and("have.text", data.amountLabel)
        this.amountInput
        .should("be.visible")
        this.requestWithdrawalBtn
        .should("be.visible")
    },

    inputAccessKeyAndUserId(accessKey, userId) {
        this.accessKeyInput
        .should("be.visible")
        .clear()
        .type(accessKey)
        this.userIdInput
        .should("be.visible")
        .clear()
        .type(userId)
        this.okBtn
        .should("be.visible")
        .click()
    },

    makeWithdrawal(amount) {
        this.amountInput
        .should("be.visible")
        .clear()
        .type(amount)
        this.requestWithdrawalBtn
        .click()
    }
}