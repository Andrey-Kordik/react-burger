describe('ingredient modal work correctly', function () {

  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:3000');
  });

  it('should open when ingredient is clicked', function () {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="ingredient-details"]').should('be.visible');
  });

  it('should close when overlay is clicked', function () {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="ingredient-details"]').should('be.visible');
    cy.get('[data-testid="overlay"]').then($overlay => {
      const rect = $overlay[0].getBoundingClientRect();
      const x = rect.left + 40;
      const y = rect.top + 40;
      cy.get('[data-testid="overlay"]').click(x, y, { force: true });
    });
    cy.get('[data-testid="ingredient-details"]').should('not.exist');
  });

  it('should close when close icon is clicked', function () {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="ingredient-details"]').should('be.visible');
    cy.get('[data-testid="close-icon"]').click()
    cy.get('[data-testid="ingredient-details"]').should('not.exist');
  });

});



describe('drag ingredients correctly', function () {

  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:3000');
  });

  it('should drag and drop bun ingredient to the constructor', () => {
    cy.get('[data-testid="ingredient"][data-type="bun"]').first().trigger('dragstart');
    cy.get('[data-testid="bun-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient"][data-type="bun"]').should('exist');

  });
  it('should drag and drop ingredient to the constructor', () => {
    cy.get('[data-testid="ingredient"][data-type="main"]').first().trigger('dragstart');
    cy.get('[data-testid="ing-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient"][data-type="sauce"]').first().trigger('dragstart');
    cy.get('[data-testid="ing-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient"][data-type="main"]').should('exist');
    cy.get('[data-testid="ingredient"][data-type="sauce"]').should('exist');
  });

});

describe('order modal works correctly', function () {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.visit('http://localhost:3000');


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
    cy.get('[data-testid="ingredient"][data-type="bun"]').first().trigger('dragstart');
    cy.get('[data-testid="bun-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient"][data-type="main"]').first().trigger('dragstart');
    cy.get('[data-testid="ing-constructor"]').trigger('drop');
    cy.get('[data-testid="ingredient"][data-type="bun"]').should('exist');
    cy.get('[data-testid="ingredient"][data-type="sauce"]').first().trigger('dragstart');
    cy.get('[data-testid="ing-constructor"]').trigger('drop');
    cy.get('[data-testid="order-button"]').first().click();
    cy.get("[data-testid=order-number]").contains("123").should("exist");
  });

});