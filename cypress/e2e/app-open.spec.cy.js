import { INGREDIENT_SELECTOR, INGREDIENT_MODAL, BUN_INGREDIENT, MAIN_INGREDIENT, SAUCE_INGREDIENT, BUN_CONTAINER, STUFF_CONTAINER } from '../../src/utils/test-constants.ts'

describe('ingredient modal work correctly', function () {

  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('should open when ingredient is clicked', function () {
    cy.get(INGREDIENT_SELECTOR).first().click();
    cy.get(INGREDIENT_MODAL).should('be.visible');
  });

  it('should close when overlay is clicked', function () {
    cy.get(INGREDIENT_SELECTOR).first().click();
    cy.get(INGREDIENT_MODAL).should('be.visible');
    cy.get('[data-testid="overlay"]').then($overlay => {
      const rect = $overlay[0].getBoundingClientRect();
      const x = rect.left + 40;
      const y = rect.top + 40;
      cy.get('[data-testid="overlay"]').click(x, y, { force: true });
    });
    cy.get(INGREDIENT_MODAL).should('not.exist');
  });

  it('should close when close icon is clicked', function () {
    cy.get(INGREDIENT_SELECTOR).first().click();
    cy.get(INGREDIENT_MODAL).should('be.visible');
    cy.get('[data-testid="close-icon"]').click()
    cy.get(INGREDIENT_MODAL).should('not.exist');
  });

});



describe('drag ingredients correctly', function () {

  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('should drag and drop bun ingredient to the constructor', () => {
    cy.get(BUN_INGREDIENT).as('bun').first().trigger('dragstart');
    cy.get(BUN_CONTAINER).trigger('drop');
    cy.get('@bun').should('exist');

  });
  it('should drag and drop ingredient to the constructor', () => {
    cy.get(MAIN_INGREDIENT).as('main').first().trigger('dragstart');
    cy.get(STUFF_CONTAINER).trigger('drop');
    cy.get(SAUCE_INGREDIENT).as('sauce').first().trigger('dragstart');
    cy.get(STUFF_CONTAINER).trigger('drop');
    cy.get('@main').should('exist');
    cy.get('@sauce').should('exist');
  });

});

describe('order modal works correctly', function () {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.visit('/');


    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessTokenToken")
    );
  });

  it('should open order modal', () => {
    cy.get(BUN_INGREDIENT).first().trigger('dragstart');
    cy.get(BUN_CONTAINER).trigger('drop');
    cy.get(MAIN_INGREDIENT).first().trigger('dragstart');
    cy.get(STUFF_CONTAINER).trigger('drop');
    cy.get(SAUCE_INGREDIENT).first().trigger('dragstart');
    cy.get(STUFF_CONTAINER).trigger('drop');
    cy.get('[data-testid="order-button"]').first().click();
    cy.get("[data-testid=order-number]").contains("123").should("exist");
  });

});