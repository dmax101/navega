# Navega

> Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.16.

---

## Como rodar o projeto

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   ng serve
   ```
   Acesse [http://localhost:4200](http://localhost:4200) no navegador. O app recarrega automaticamente ao salvar arquivos.

---

## Como gerar componentes, serviços, etc

Use o Angular CLI:
```bash
ng generate component nome-componente
ng generate service nome-servico
ng generate module nome-modulo
```
Veja outros comandos em [Angular CLI Reference](https://angular.io/cli).

---

## Como fazer build para produção

```bash
ng build
```
Os arquivos finais ficam na pasta `dist/`.

---

## Como executar os testes unitários (Jest)

1. **Executar todos os testes**:
   ```bash
   npm run test
   ```
   Ou para modo watch:
   ```bash
   npm run test:watch
   ```

2. **Cobertura de testes**:
   ```bash
   npm run test:coverage
   ```
   O relatório será gerado na pasta `coverage/`.

---

## Como executar testes end-to-end (E2E)

> Este projeto não possui configuração E2E padrão. Para adicionar, instale um pacote como Cypress ou Protractor.

---

## Dicas e ajuda

- Para mais comandos do Angular CLI:
  ```bash
  ng help
  ```
- Documentação oficial: [Angular CLI Overview](https://angular.io/cli)

---

## Estrutura do projeto

```
├── src/
│   ├── app/                # Código principal da aplicação
│   ├── libs/shared-auth/   # Biblioteca de autenticação reutilizável
│   └── assets/             # Arquivos estáticos
├── angular.json            # Configuração do Angular
├── package.json            # Dependências e scripts
├── tsconfig*.json          # Configuração TypeScript
└── README.md               # Este arquivo
```
