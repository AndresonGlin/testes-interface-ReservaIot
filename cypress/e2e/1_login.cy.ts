describe("Login - Reserva IoT", () => {

  it("Deve fazer login com sucesso", () => {
    cy.visit("/login");

    cy.get('[formcontrolname="email"]').type("andreson@email.com");
    cy.get('[formcontrolname="senha"]').type("12345678");

    cy.get('button[type="submit"]').click();

    // Validação de que entrou na página correta
    cy.contains("Áreas Monitoradas").should("be.visible");
  });

});