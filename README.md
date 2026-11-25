# Portfólio Profissional — Daniel Santana Lima

<div align="center">

**QA & Automação de Testes • Desenvolvimento Full Stack • Sistemas ERP**

[![Live Site](https://img.shields.io/badge/Acessar_Portfólio-Online_(GitHub_Pages)-22C55E?style=flat&logo=github&logoColor=0F172A)](https://daniel-slima.github.io/Portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-@DanielLimaQA-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniellimaqa)
[![GitHub](https://img.shields.io/badge/GitHub-Daniel--SLima-181717?style=flat&logo=github&logoColor=white)](https://github.com/Daniel-SLima)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Diferenciais da Aplicação

- **Seletor de Visão para Recrutadores (`Híbrido`, `QA & Automação`, `Full Stack`, `Dados & ERP`):** adapta a apresentação, a ordenação das competências e o currículo principal. As visões Híbrido, QA e Dados/ERP usam o currículo QA, que inclui a experiência com sistemas ERP; Full Stack usa o currículo de desenvolvimento.
- **Currículos em português e inglês:** quatro opções atuais, com versões de QA & Automação e Desenvolvimento Full Stack em cada idioma. As versões em português são os documentos confirmados por Daniel; as versões em inglês traduzem o mesmo conteúdo, incluindo a previsão de conclusão do IFBA em 2028.1.
- **Simulador Interativo SaaS RBAC & SQL (`/saas-demo`):** permite testar na prática regras de alçada de desconto por perfil (`Administrador`, `Consultor Comercial`, `Gestor de Produção`), geração de Ordem de Produção, impressão em PDF e exportação CSV compatível com Excel, além de inspecionar o schema PostgreSQL/Supabase RLS.
- **Laboratório Interativo de QA (`/qa-lab`):** demonstra cenários BDD/Gherkin, scripts Playwright Page Object Model, testes de API REST, plano de carga JMeter/BlazeMeter e modelo corporativo de Bug Report.
- **OpenGraph Dinâmico & CI Quality Gate:** gera preview visual automático (`next/og`) para compartilhamento no LinkedIn/WhatsApp e valida tipagem, build, existência e cabeçalho dos quatro PDFs atuais via GitHub Actions.

## Currículos disponíveis

| Área | Português | Inglês |
| --- | --- | --- |
| QA & Automação | [Currículo QA](public/cv/Curriculo-Daniel-Lima-QA-Automacao.pdf) | [QA Resume](public/cv/Resume-Daniel-Lima-QA-EN.pdf) |
| Desenvolvimento Full Stack | [Currículo Full Stack](public/cv/Curriculo-Daniel-Lima-FullStack.pdf) | [Full Stack Resume](public/cv/Resume-Daniel-Lima-FullStack-EN.pdf) |

Os arquivos antigos de Dados/Operações, inglês genérico e exportação do LinkedIn foram retirados da seleção de currículos atuais. Seus caminhos foram preservados para manter o acesso por links já compartilhados; eles não são as versões atualizadas.

## Demonstrações no GitHub Pages

| Projeto | Demonstração | O que experimentar |
| --- | --- | --- |
| Floricultura Rosa | [Catálogo e pedidos](https://daniel-slima.github.io/Portfolio/demos/floricultura/) | Produtos fictícios, sacola, prévia de mensagem e painel local |
| Vlinix | [Gestão para detailers](https://daniel-slima.github.io/Portfolio/demos/vlinix/) | Clientes, veículos, serviços, agenda e finanças de exemplo |
| OrçaDemo | [Orçamentos e produção](https://daniel-slima.github.io/Portfolio/demos/orcamentos/) | Clientes, produtos, orçamentos, produção e PDFs demonstrativos |

As três versões usam dados fictícios e armazenam as alterações somente no navegador do visitante, em namespaces separados. A restauração de uma demo não apaga as outras. Não há acesso aos bancos de produção, envio de mensagens ou processamento de pagamentos. Os projetos reais continuam descritos separadamente de suas versões demonstrativas.

O workflow de publicação constrói OrçaDemo e Vlinix a partir dos commits exatos em [`scripts/demos/sources.json`](scripts/demos/sources.json). A demonstração da Floricultura é distribuída em `public/demos/floricultura/` como um artefato estático sanitizado, sem source maps ou configurações privadas. Os arquivos editáveis desse projeto permanecem no repositório privado.

Depois de compilar o portfólio com `GITHUB_PAGES=true`, execute `node scripts/demos/build-demos.mjs` para incluir os dois projetos públicos (Node 22 e Flutter 3.38.10). `python3 scripts/demos/verify-export.py` valida o artefato completo antes da publicação, incluindo currículos, páginas das três demos, caminhos de assets e os recursos locais do Flutter. Atualizações de fonte são incorporadas alterando os commits fixados no manifesto após a validação.

---

## Como Rodar Localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.
