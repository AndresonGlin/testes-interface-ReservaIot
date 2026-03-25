describe("Página de Pesquisadores", () => {

  it("Deve acessar a página de pesquisadores com sucesso", () => {

    // Login
    cy.visit("/login");

    cy.get('[formcontrolname="email"]').type("andreson@email.com");
    cy.get('[formcontrolname="senha"]').type("12345678");
    cy.get('button[type="submit"]').click();

    // Validar login
    cy.contains("Áreas Monitoradas").should("be.visible");

    // Acessar menu Pesquisadores
    cy.contains("Pesquisadores").click();

    // Validar página correta
    cy.contains("Pesquisadores").should("be.visible");

  });

});