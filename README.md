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

- [ ] Deve ser possível criar um usuário
- [ ] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  > *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência de refeições dentro da dieta


# RN (Regra de Negócio)

- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou