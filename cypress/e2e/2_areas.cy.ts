describe("Cadastro de Áreas Reservadas", () => {

  it("Deve cadastrar, editar e excluir uma área", () => {

    const nomeArea = `Área ${Date.now()}`;
    const nomeAtualizado = "Área Norte Atualizada";

    // Login
    cy.visit("/login");

    cy.get('[formcontrolname="email"]').type("andreson@email.com");
    cy.get('[formcontrolname="senha"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.contains("Áreas Monitoradas").should("be.visible");

    // Ir para Áreas Reservadas
    cy.contains("Áreas Reservadas").click();

    cy.contains("Áreas").should("be.visible");

    // Nova área
    cy.contains("+ Nova Área").click();

    cy.get('[formcontrolname="nome"]').type(nomeArea);
    cy.get('[formcontrolname="bioma"]').select("Floresta");
    cy.get('[formcontrolname="latitude"]').type("-3.10");
    cy.get('[formcontrolname="longitude"]').type("-60.01");
    cy.get('[formcontrolname="largura"]').type("2000");
    cy.get('[formcontrolname="comprimento"]').type("6000");
    cy.get('[formcontrolname="descricao"]').type("Área de teste automatizado");

    cy.contains("Salvar").click();

    // Validar criação
    cy.contains(nomeArea).should("be.visible");

    // EDITAR
    cy.contains(nomeArea)
      .parent() // sobe para o container da linha
      .contains("Editar")
      .click();

    // Atualizar nome
    cy.get('[formcontrolname="nome"]').clear().type(nomeAtualizado);

    cy.contains("Atualizar").click();

    // Validar atualização
    cy.contains(nomeAtualizado).should("be.visible");

    // Espera
    cy.wait(3000);

    // EXCLUIR
    cy.contains(nomeAtualizado)
      .parent()
      .contains("Excluir")
      .click();

    // Validar exclusão
    cy.contains(nomeAtualizado).should("not.exist");

  });

});