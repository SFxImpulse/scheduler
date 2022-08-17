describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");

  });

  it("should navigate to Tuesday", () => { 
    cy.get("li")
    .contains("Tuesday")
    .click(); 
  });
  
  it("should contain the Tuesday element", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
    
});