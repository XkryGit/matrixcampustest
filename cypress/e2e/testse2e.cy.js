describe("Home Page and filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the podcast filter", () => {
    cy.get('input[placeholder="Filter podcast..."]').should("be.visible");
  });

  it("should display the podcast list", () => {
    cy.get(".podcast-list").should("be.visible");
  });

  it("should filter podcasts based on input", () => {
    cy.get('input[placeholder="Filter podcast..."]').type("The Joe");
    cy.get(".podcast-item").should("contain", "The Joe Budden Podcast");
  });
});

describe("Navigate to a episode and return", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should navigate to a episode", () => {
    cy.get(".podcast-item").eq(1).click();
    cy.get(".podcast-content-container").should("be.visible");
  });

  it("should navigate to a podcast", () => {
    cy.get(".podcast-item").eq(1).click();
    cy.get(".podcast-content-container a").eq(1).click();
    cy.get(".episode-audio").should("be.visible");
  });

  it("should navigate to a podcast and return to podcast", () => {
    cy.get(".podcast-item").eq(1).click();
    cy.get(".podcast-content-container a").eq(1).click();
    cy.get(".sidebar-link").first().click();
    cy.get(".podcast-content-container").should("be.visible");
  });

  it("should navigate to a podcast and return to home", () => {
    cy.get(".podcast-item").eq(1).click();
    cy.get(".podcast-content-container a").eq(1).click();
    cy.get(".topbar-title").first().click();
    cy.get(".podcast-list").should("be.visible");
  });
});
