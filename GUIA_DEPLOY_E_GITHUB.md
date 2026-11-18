# Guia Atualizado: Publicação no GitHub (`/Daniel-SLima`) e Deploy na Vercel

Os projetos independentes foram movidos para uma pasta irmã (`C:\Users\Usuario\Documents\projetos-github-daniel`) para manter o repositório do portfólio 100% limpo e evitar conflitos de submódulos Git.

---

## Estrutura Organizada no Seu Computador

1. **`C:\Users\Usuario\Documents\portfolio-daniel-lima`** → Aplicação Next.js completa do Portfólio (com CI Quality Gate, foto oficial, OpenGraph automático e os 5 CVs em PDF).
2. **`C:\Users\Usuario\Documents\projetos-github-daniel\playwright-erp-qa-suite`** → Repositório vitrine de Automação QA (Playwright + POM + BDD/Gherkin + API + CI).
3. **`C:\Users\Usuario\Documents\projetos-github-daniel\saas-gestao-comercial-architecture`** → Repositório de arquitetura SQL/Supabase RLS e testes de regras de negócio.
4. **`C:\Users\Usuario\Documents\projetos-github-daniel\github-profile-readme\README.md`** → Novo README atualizado para o perfil principal `github.com/Daniel-SLima`.

---

## Como Subir Rapidamente via GitHub CLI (`gh`)

Como o seu terminal já está autenticado na conta **`Daniel-SLima`**, basta rodar:

### 1. Subir o Portfólio no seu repositório `Daniel-SLima/Portfolio`
```powershell
cd C:\Users\Usuario\Documents\portfolio-daniel-lima
git init
git add .
git commit -m "feat: portfolio interativo QA & Full Stack com simulador SaaS e QA Lab"
git branch -M main
git remote add origin https://github.com/Daniel-SLima/Portfolio.git
git push -u origin main --force
```
*(Depois, na [Vercel](https://vercel.com), importe `Daniel-SLima/Portfolio` e clique em **Deploy**!)*

### 2. Criar e subir os 2 Repositórios de Vitrine
```powershell
cd C:\Users\Usuario\Documents\projetos-github-daniel\playwright-erp-qa-suite
git init
git add .
git commit -m "feat: suite Playwright E2E, API e BDD/Gherkin com Page Object Model"
git branch -M main
gh repo create Daniel-SLima/playwright-erp-qa-suite --public --source=. --remote=origin --push

cd C:\Users\Usuario\Documents\projetos-github-daniel\saas-gestao-comercial-architecture
git init
git add .
git commit -m "feat: arquitetura SQL/Supabase RLS e testes automatizados"
git branch -M main
gh repo create Daniel-SLima/saas-gestao-comercial-architecture --public --source=. --remote=origin --push
```
