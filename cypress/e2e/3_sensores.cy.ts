describe("Cadastro de Sensores IoT", () => {

  it("Deve cadastrar e editar um sensor", () => {

    const serial = `SN-${Date.now()}`;
    const novoFabricante = "Positivo";

    // Login
    cy.visit("/login");

    cy.get('[formcontrolname="email"]').type("andreson@email.com");
    cy.get('[formcontrolname="senha"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.contains("Áreas Monitoradas").should("be.visible");

    // Ir para Sensores
    cy.contains("Sensores IoT").click();

    cy.contains("Sensores").should("be.visible");

    // Novo Sensor
    cy.contains("+ Novo Sensor").click();

    // Cadastro
    cy.get('[formcontrolname="serialNumber"]').type(serial);
    cy.get('[formcontrolname="fabricante"]').type("Bosch");
    cy.get('[formcontrolname="modelo"]').type("X100");
    cy.get('[formcontrolname="tipo"]').type("Temperatura");

    cy.get('[formcontrolname="status"]').select("Ativo", { force: true });
    cy.get('[formcontrolname="areaId"]').select("Area Sul", { force: true });

    cy.get('[formcontrolname="latitude"]').type("-3.10");
    cy.get('[formcontrolname="longitude"]').type("-60.01");
    cy.get('[formcontrolname="cicloLeitura"]').type("60");
    cy.get('[formcontrolname="dataInstalacao"]').type("2024-01-01", { force: true });

    cy.contains("Salvar").click();

    // Validar criação
    cy.contains(serial).should("be.visible");

    // EDITAR SENSOR
    cy.contains(serial)
      .parent()
      .contains("Editar")
      .click();

    // Alterar fabricante
    cy.get('[formcontrolname="fabricante"]')
      .clear()
      .type(novoFabricante);

    // Garantir área selecionada
    cy.get('[formcontrolname="areaId"]').select("Area Sul", { force: true });

    // Atualizar
    cy.contains("Atualizar").click();

  });

});