# 🚀 Projeto Reserva IoT (Interface) - Guia de Execução

Este guia tem como objetivo orientar como clonar, configurar e executar o projeto **Reserva IoT**, incluindo a API necessária para funcionamento completo do sistema e execução dos testes.

---

# 📦 1. Clonar o Projeto Frontend

```bash
git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
cd <NOME_DA_PASTA>
```

Instale as dependências:

```bash
npm install
```

---

# 🔌 2. Clonar e Executar a API (Obrigatório)

Para que o sistema funcione corretamente, é necessário rodar a API separadamente.

Clone o repositório da API:

```bash
git clone https://github.com/AndresonGlin/testes-api-reservaIot
cd testes-api-reservaIot
```

Instale as dependências:

```bash
npm install
```

Execute a API:

```bash
npm run dev
```

> ⚠️ Certifique-se de que a API está rodando antes de iniciar o frontend.

---

# 👤 3. Criar Usuário via Postman

Antes de acessar o sistema, é necessário criar um usuário manualmente.

### Endpoint:

```
POST http://localhost:6060/api/register
```

### Body (JSON):

```json
{
  "nome": "admin",
  "email": "admin@gmail.com",
  "senha": "12345678",
  "matricula": "12345",
  "especialidade": "TI",
  "titulacao": "Graduação",
  "dataNascimento": "1995-05-10"
}
```

---

# 🌐 4. Executar o Frontend

No diretório do projeto frontend:

```bash
npm start
```

A aplicação estará disponível em:

```
http://localhost:4200
```

---

# 🧪 5. Executar os Testes (Cypress)

Certifique-se de que:

* Frontend está rodando (`localhost:4200`)
* API está rodando (`localhost:6060`)

### Abrir o Cypress (modo interativo):

```bash
npx cypress open
```

### Ou rodar em modo headless:

```bash
npx cypress run
```

---

# 📁 Estrutura dos Testes

Os testes estão organizados por domínio:

```
cypress/
 └── e2e/
     └── ReservaIot/
         ├── areas.cy.js
         ├── sensores.cy.js
         └── pesquisadores.cy.js
```

---

# ⚠️ Observações Importantes

* A API deve estar ativa para que os testes funcionem corretamente.
* O usuário precisa ser criado antes de executar os testes.
* Alguns testes dependem de dados previamente cadastrados (ex: áreas para sensores).
* O uso de dados dinâmicos evita conflitos durante a execução dos testes.

---

# ✅ Pronto!

Agora você já pode:

* Rodar o sistema
* Executar os testes automatizados
* Validar todos os fluxos (Login, Áreas, Sensores e Pesquisadores)

---
