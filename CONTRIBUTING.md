# Guia de Contribuição 🤝

Obrigado por querer contribuir com o Arena de Elite!

Este documento explica como você pode ajudar a melhorar o projeto.

## 📱 Comunidade

Antes de começar, entre no nosso grupo do WhatsApp para tirar dúvidas e interagir com outros contribuidores:

**[👉 Entrar no Grupo da Comunidade](https://chat.whatsapp.com/K6Ni8HK72Bw2us79Erk0t6)**

## 🚀 Como Contribuir

### 1. Encontre algo para trabalhar

- 🐛 **Bugs**: Veja as [issues abertas](https://github.com/seu-usuario/arena-de-elite/issues) com a label `bug`
- ✨ **Features**: Procure issues com a label `enhancement` ou `good first issue`
- 📝 **Documentação**: Sempre há espaço para melhorar a documentação!

### 2. Fork e Clone

```bash
# Fork o repositório no GitHub, depois:
git clone https://github.com/seu-usuario/arena-de-elite.git
cd arena-de-elite
```

### 3. Configure o ambiente

Siga as instruções no [README principal](README.md) para configurar o ambiente de desenvolvimento.

### 4. Crie uma branch

```bash
git checkout -b tipo/descricao-curta
```

**Tipos de branch:**
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `refactor/` - Refatoração de código
- `test/` - Adição de testes

**Exemplos:**
```bash
git checkout -b feature/filtro-ranking
git checkout -b fix/bug-pagamento-pix
git checkout -b docs/melhorar-readme
```

### 5. Faça suas alterações

- Escreva código limpo e legível
- Siga os padrões do projeto existente
- Adicione testes quando apropriado
- Atualize a documentação se necessário

### 6. Commit suas mudanças

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "tipo: descrição curta"
```

**Tipos de commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (não afeta lógica)
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Tarefas de manutenção

**Exemplos:**
```bash
git commit -m "feat: adiciona filtro por data no ranking"
git commit -m "fix: corrige cálculo de pontuação"
git commit -m "docs: melhora documentação da API"
```

### 7. Push e Pull Request

```bash
git push origin sua-branch
```

Depois, abra um Pull Request no GitHub:

1. Vá para o repositório original
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Preencha o template do PR
5. Aguarde a revisão

## 📋 Padrões de Código

### Backend (Java/Spring Boot)

- Siga as convenções de nomenclatura Java
- Use Lombok para reduzir boilerplate
- Cada use case em sua própria classe
- Testes unitários para lógica de negócio

### Frontend (TypeScript/React)

- Use TypeScript strict mode
- Componentes funcionais com hooks
- Siga a estrutura de features existente
- Estilização com TailwindCSS

## ✅ Checklist do Pull Request

Antes de submeter seu PR, verifique:

- [ ] O código compila sem erros
- [ ] Os testes passam (`mvn test` / `pnpm test`)
- [ ] O linting passa (`pnpm lint`)
- [ ] A documentação foi atualizada (se necessário)
- [ ] Os commits seguem o padrão Conventional Commits
- [ ] O PR tem uma descrição clara do que foi feito

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o bug
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** (se aplicável)
5. **Ambiente** (browser, sistema operacional, etc.)

## 💡 Sugerindo Features

Antes de sugerir uma feature:

1. Verifique se já não existe uma issue similar
2. Descreva o problema que a feature resolve
3. Proponha uma solução (se tiver)
4. Esteja aberto a discussões e alternativas

## 📜 Código de Conduta

Este projeto segue nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em respeitar suas diretrizes.

## ❓ Dúvidas?

- 💬 [Grupo do WhatsApp](https://chat.whatsapp.com/K6Ni8HK72Bw2us79Erk0t6)
- 🐛 [Abra uma issue](https://github.com/seu-usuario/arena-de-elite/issues)

---

Obrigado por contribuir! 🎉
