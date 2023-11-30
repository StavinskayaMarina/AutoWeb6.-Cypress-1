describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
  });

  //тесты с лекции

  it("test login", () => {
    cy.visit("localhost:3000");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.get("#pass").type("test");
    cy.get("[type=submit]").click();
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("test empty email", () => {
    cy.visit("localhost:3000");
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("test");
    cy.get("[type=submit]").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("test incorrect password", () => {
    cy.visit("localhost:3000");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.get("#pass").type(".");
    cy.get("[type=submit]").click();
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.true;
    });
  });
});
