## Start
- Instalação
```bash
  npm install
```

- Comando para execultar as migrações e criar o Banco de Dados.
```bash
  npm run knex -- migrate:latest
```

- Comando no Knex para criar uma nova tabela
```bash
  npm run knex -- migrate:make table_name
```

- Comando para execultar a API
```bash
  npm run dev
```

---

# RF (Requisitos Funcionais)

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as refeições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  > *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta


# RN (Regra de Negócio)

- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
