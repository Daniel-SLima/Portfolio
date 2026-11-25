export type ProfileLensId = "hybrid" | "qa" | "fullstack" | "data_erp";

export interface ProfileLens {
  id: ProfileLensId;
  label: string;
  shortLabel: string;
  badgeText: string;
  headline: string;
  subheadline: string;
  summary: string;
  accent: "emerald" | "indigo" | "sky" | "amber";
  cvUrl: string;
  cvLabel: string;
  highlights: { label: string; value: string }[];
  priorityCategories: string[];
}

export interface ResumeOption {
  id: string;
  title: string;
  targetRole: string;
  language: "PT-BR" | "EN";
  filename: string;
  url: string;
  badge: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "QA" | "ERP & Suporte" | "Full Stack & QA";
  description: string;
  bullets: string[];
  tags: string[];
  lensRelevance: ProfileLensId[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  accent: "emerald" | "indigo" | "amber" | "sky";
  description: string;
  technicalHighlights: string[];
  stack: string[];
  demoHref?: string;
  demoLabel?: string;
  externalDemoUrl?: string;
  externalDemoLabel?: string;
  demoNotice?: string;
  demoCredentials?: { email: string; password: string };
  githubRepoName?: string;
  githubUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface SecondaryRepoItem {
  name: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  accent: "emerald" | "indigo" | "sky" | "amber";
  items: { name: string; context: string }[];
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBasePath(path: string): string {
  if (!BASE_PATH) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const CONTACT_INFO = {
  name: "Daniel Santana Lima",
  shortName: "Daniel Lima",
  age: 24,
  avatarUrl: withBasePath("/avatar-daniel.png"),
  location: "Salvador, Bahia, Brasil",
  phoneDisplay: "(71) 99934-6319",
  whatsappUrl: "https://wa.me/5571999346319",
  email: "Dan13setembro@outlook.com",
  linkedinHandle: "@DanielLimaQA",
  linkedinUrl: "https://www.linkedin.com/in/daniellimaqa",
  githubHandle: "/Daniel-SLima",
  githubUrl: "https://github.com/Daniel-SLima",
};

export const PROFILE_LENSES: Record<ProfileLensId, ProfileLens> = {
  hybrid: {
    id: "hybrid",
    label: "Perfil Híbrido (QA + Full Stack)",
    shortLabel: "Híbrido QA + Dev",
    badgeText: "QA & Automação + Desenvolvimento Full Stack",
    headline: "Garanto a qualidade de sistemas críticos e construo aplicações web em produção.",
    subheadline:
      "Experiência prática em Quality Assurance na Nasajon (ERP Finanças, Serviços e RH), suporte a ERP TOTVS Datasul e criação de sistema SaaS em uso real com Next.js, TypeScript e Supabase.",
    summary:
      "Graduando em Análise e Desenvolvimento de Sistemas pelo IFBA (5º semestre) e Técnico pelo SENAI CIMATEC. Combino olhar investigativo de QA (Playwright, BDD/Gherkin, APIs, Pytest, SQL e JMeter) com engenharia Full Stack (React, Next.js, TypeScript, Python/FastAPI e Java) e uso estratégico de agentes de IA para acelerar entregas confiáveis.",
    accent: "emerald",
    cvUrl: withBasePath("/cv/Curriculo-Daniel-Lima-QA-Automacao.pdf"),
    cvLabel: "Baixar CV Principal (QA & Tech)",
    highlights: [
      { label: "QA Corporativo", value: "Nasajon ERP (Finanças, Serviços, RH)" },
      { label: "SaaS em Produção", value: "OrçaDemo • Next.js + TypeScript + Supabase" },
      { label: "NASA Space Apps 2026", value: "Top 10 Regional & Avaliação Mundial" },
      { label: "Idiomas", value: "Inglês B2 + Francês (Intercâmbio 8m)" },
    ],
    priorityCategories: ["qa", "automation", "fullstack", "data_erp"],
  },
  qa: {
    id: "qa",
    label: "Foco QA & Automação",
    shortLabel: "QA & Automação",
    badgeText: "Quality Assurance Júnior • Testes Manuais & Automação",
    headline: "Analista de QA focado em regras de negócio complexas, BDD e automação com Playwright.",
    subheadline:
      "Atuação diária na Nasajon validando módulos críticos de ERP e sistemas Web com testes funcionais, exploratórios, de regressão, retestes, Gherkin e monitoramento de builds.",
    summary:
      "Experiência sólida em todo o ciclo de testes de software: levantamento de cenários em BDD/Gherkin, execução rigorosa em homologação, investigação de causa raiz em bancos SQL e APIs, reporte estruturado de bugs com evidências e desenvolvimento de suítes automatizadas com Playwright, Pytest e GitHub Actions.",
    accent: "emerald",
    cvUrl: withBasePath("/cv/Curriculo-Daniel-Lima-QA-Automacao.pdf"),
    cvLabel: "Baixar CV Foco QA (PDF)",
    highlights: [
      { label: "QA na Nasajon", value: "Testes E2E, Regressão & Homologação" },
      { label: "Automação & BDD", value: "Playwright + TypeScript + Gherkin" },
      { label: "Performance & API", value: "JMeter, BlazeMeter & Testes de API" },
      { label: "Gestão de Defeitos", value: "Evidências, Retestes & Regras ERP" },
    ],
    priorityCategories: ["qa", "automation", "data_erp", "fullstack"],
  },
  fullstack: {
    id: "fullstack",
    label: "Foco Full Stack",
    shortLabel: "Full Stack Dev",
    badgeText: "Desenvolvedor Full Stack Júnior • Next.js, React, TypeScript & Python",
    headline: "Desenvolvedor Full Stack construindo SaaS reais com Next.js, TypeScript e SQL.",
    subheadline:
      "Criador e mantenedor de aplicação SaaS de Gestão Comercial e Orçamentos em uso real, com RBAC, geração dinâmica de PDFs, exportação Excel e código testado de ponta a ponta.",
    summary:
      "Base técnica formada no SENAI CIMATEC e aprimorada no IFBA (ADS). Experiência real com React, Next.js, TypeScript, Tailwind CSS, Supabase/SQL, Python (FastAPI/Flask), Docker e Java, unindo desenvolvimento orientado a regras de negócio com cultura forte de qualidade e CI/CD.",
    accent: "indigo",
    cvUrl: withBasePath("/cv/Curriculo-Daniel-Lima-FullStack.pdf"),
    cvLabel: "Baixar CV Full Stack (PDF)",
    highlights: [
      { label: "Frontend Moderno", value: "Next.js, React, TypeScript & Tailwind" },
      { label: "Backend & Dados", value: "Supabase, SQL, FastAPI, Docker & Java" },
      { label: "Features Reais", value: "PDFs Dinâmicos, RBAC, Anexos & Excel" },
      { label: "Finalista Hackathon", value: "Salvador Lab & Bahia Tech (Lirdio)" },
    ],
    priorityCategories: ["fullstack", "automation", "qa", "data_erp"],
  },
  data_erp: {
    id: "data_erp",
    label: "Foco Dados, ERP & Processos",
    shortLabel: "Dados & ERP",
    badgeText: "Tecnologia • Dados • Operações • Sistemas ERP",
    headline: "Visão analítica de processos corporativos, ERPs (Nasajon e TOTVS) e SQL.",
    subheadline:
      "Experiência combinada em validação de rotinas financeiras/RH/serviços, suporte técnico ao TOTVS Datasul, gestão de chamados (Zendesk/Fluig) e apoio à tomada de decisão.",
    summary:
      "Perfil orientado à confiabilidade operacional e melhoria contínua. Vivência com suporte a usuários corporativos, controle de acessos, análise de indicadores (Top 10 Regional no NASA Space Apps 2026), consultas SQL e manipulação de relatórios estratégicos em Excel.",
    accent: "sky",
    cvUrl: withBasePath("/cv/Curriculo-Daniel-Lima-QA-Automacao.pdf"),
    cvLabel: "Baixar CV QA com experiência em ERP (PDF)",
    highlights: [
      { label: "Sistemas ERP", value: "Nasajon ERP & TOTVS Datasul" },
      { label: "Dados & Análise", value: "SQL (Xperiun) & Excel Intermediário" },
      { label: "Operações & ITSM", value: "Zendesk, Fluig & Gestão de Acessos" },
      { label: "NASA Space Apps 2026", value: "Análise de Indicadores (Top 10)" },
    ],
    priorityCategories: ["data_erp", "qa", "fullstack", "automation"],
  },
};

export const RESUME_OPTIONS: ResumeOption[] = [
  {
    id: "qa",
    title: "Currículo QA & Automação",
    targetRole: "Analista de Testes / QA Júnior — Playwright, BDD/Gherkin, APIs, ERP e CI/CD",
    language: "PT-BR",
    filename: "Curriculo-Daniel-Lima-QA-Automacao.pdf",
    url: withBasePath("/cv/Curriculo-Daniel-Lima-QA-Automacao.pdf"),
    badge: "QA • Português",
  },
  {
    id: "fullstack",
    title: "Currículo Desenvolvedor Full Stack",
    targetRole: "Desenvolvedor Full Stack Júnior — Next.js, React, TypeScript, Python, Supabase e SQL",
    language: "PT-BR",
    filename: "Curriculo-Daniel-Lima-FullStack.pdf",
    url: withBasePath("/cv/Curriculo-Daniel-Lima-FullStack.pdf"),
    badge: "Full Stack • Português",
  },
  {
    id: "qa_en",
    title: "QA & Test Automation Resume",
    targetRole: "Quality Assurance / Software Testing — Playwright, BDD, APIs, ERP and CI/CD",
    language: "EN",
    filename: "Resume-Daniel-Lima-QA-EN.pdf",
    url: withBasePath("/cv/Resume-Daniel-Lima-QA-EN.pdf"),
    badge: "QA • English",
  },
  {
    id: "fullstack_en",
    title: "Full Stack Developer Resume",
    targetRole: "Junior Full Stack Developer — Next.js, React, TypeScript, Python, Supabase and SQL",
    language: "EN",
    filename: "Resume-Daniel-Lima-FullStack-EN.pdf",
    url: withBasePath("/cv/Resume-Daniel-Lima-FullStack-EN.pdf"),
    badge: "Full Stack • English",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "nasajon",
    company: "Nasajon Sistemas",
    role: "Estagiário de Quality Assurance (QA) | Testes de Software",
    period: "Outubro de 2025 – Presente",
    location: "Remoto / Híbrido — Salvador, BA",
    type: "QA",
    description:
      "Atuação direta na área de Qualidade de Software validando o ERP Nasajon (módulos de Finanças, Serviços e Recursos Humanos) e aplicações Web em ambiente de homologação.",
    bullets: [
      "Execução de testes manuais, funcionais, exploratórios e de regressão, além de retestes rigorosos e validação de correções.",
      "Validação de regras de negócio complexas e cenários personalizados para clientes corporativos.",
      "Investigação, reprodução e reporte estruturado de bugs com evidências, passos de reprodução e comportamento esperado.",
      "Estruturação e padronização de cenários de teste no formato BDD/Gherkin.",
      "Acompanhamento de builds e colaboração em melhorias nos processos de automação de testes junto ao time de desenvolvimento.",
    ],
    tags: ["ERP Nasajon", "Finanças, Serviços & RH", "BDD / Gherkin", "Regressão", "Homologação", "Automação & Builds"],
    lensRelevance: ["hybrid", "qa", "data_erp"],
  },
  {
    id: "gnaritas",
    company: "Gnaritas Sistemas",
    role: "Estagiário de TI | Suporte ERP TOTVS",
    period: "Agosto de 2024 – Fevereiro de 2025",
    location: "Salvador, BA",
    type: "ERP & Suporte",
    description:
      "Suporte técnico e sustentação corporativa com foco no ERP TOTVS Datasul, investigando incidentes e validando novas rotinas de desenvolvimento.",
    bullets: [
      "Atendimento e suporte técnico a usuários do ERP TOTVS Datasul, com investigação de incidentes e orientação de regras de negócio.",
      "Gerenciamento, manutenção e liberação de usuários, acessos e permissões críticas.",
      "Execução de testes funcionais em novas rotinas desenvolvidas no ERP antes da liberação.",
      "Administração e acompanhamento completo de tickets de chamados via Zendesk e Fluig.",
    ],
    tags: ["TOTVS Datasul", "Testes Funcionais", "Zendesk", "Fluig", "Controle de Acessos", "Regras de Negócio"],
    lensRelevance: ["hybrid", "data_erp", "qa"],
  },
  {
    id: "lirdio",
    company: "Lirdio",
    role: "Desenvolvedor Full Stack & QA Performance",
    period: "Janeiro de 2023 – Dezembro de 2023",
    location: "Salvador, BA",
    type: "Full Stack & QA",
    description:
      "Plataforma de streaming de audiolivros desenvolvida em equipe — projeto reconhecido como Finalista no Salvador Lab e no Bahia Tech Experience.",
    bullets: [
      "Prototipagem e design de experiência de usuário no Figma.",
      "Desenvolvimento front-end responsivo e interativo utilizando HTML, CSS, JavaScript e Bootstrap.",
      "Integração de funcionalidades de player e catálogo de áudios utilizando JavaScript e SQL.",
      "Execução de testes de desempenho e carga no sistema com Apache JMeter e BlazeMeter.",
    ],
    tags: ["Finalista Salvador Lab", "Bahia Tech Experience", "JavaScript", "SQL", "Bootstrap", "JMeter & BlazeMeter"],
    lensRelevance: ["hybrid", "fullstack", "qa"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "saas-gestao",
    title: "OrçaDemo — Sistema SaaS de Gestão Comercial e Produção",
    subtitle: "Aplicação real com demonstração isolada • Next.js & TypeScript",
    badge: "Produto real • Demo local",
    accent: "indigo",
    description:
      "Plataforma desenvolvida e mantida em ambiente real para organizar orçamentos, clientes, produtos, produção e compras. A demonstração no GitHub Pages permite experimentar esses fluxos com dados fictícios salvos somente no navegador.",
    technicalHighlights: [
      "A aplicação original utiliza autenticação, perfis de acesso (RBAC) e políticas Supabase RLS; a demo usa uma sessão e uma base locais.",
      "Criação, edição, clonagem e reordenação de itens de orçamento com histórico e fluxo de produção por setores.",
      "Geração dinâmica de orçamentos e ordens de produção em PDF e exportação de relatórios para Excel.",
      "Evolução contínua com Git/GitHub, Claude Code, Codex e agentes de IA.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL / RLS", "Tailwind CSS", "PDF & Excel"],
    externalDemoUrl: withBasePath("/demos/orcamentos/"),
    externalDemoLabel: "Explorar OrçaDemo",
    demoNotice: "Dados de exemplo no seu navegador. Entrada sem senha e opção de restaurar a demonstração.",
    demoHref: "/saas-demo",
    demoLabel: "Simulador RBAC & SQL",
    githubRepoName: "gerador_orcamentos_demo",
    githubUrl: "https://github.com/Daniel-SLima/gerador_orcamentos_demo",
    metrics: [
      { label: "Status", value: "Uso Real" },
      { label: "Exportação", value: "PDF & Excel" },
      { label: "Segurança", value: "RBAC + RLS" },
    ],
  },
  {
    id: "floricultura-rosa",
    title: "Floricultura Rosa — Catálogo e Pedidos",
    subtitle: "Catálogo digital para floriculturas • React, Vite & Tailwind CSS",
    badge: "Demonstração local",
    accent: "emerald",
    description:
      "Projeto de catálogo que organiza a seleção de produtos para atendimento pelo WhatsApp. Nesta versão demonstrativa, o visitante explora o catálogo, monta a sacola e vê a prévia do pedido com produtos fictícios.",
    technicalHighlights: [
      "Busca, filtros e ordenação do catálogo, com detalhes e quantidades dos produtos.",
      "Carrinho, revisão do pedido e prévia da mensagem, sem enviar mensagens para uma loja.",
      "Painel de produtos e histórico de pedidos de exemplo, com alterações e restauração apenas no navegador.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "localStorage"],
    externalDemoUrl: withBasePath("/demos/floricultura/"),
    externalDemoLabel: "Explorar Floricultura",
    demoNotice: "Demonstração com dados fictícios. Nenhum pedido é enviado e nenhum estoque real é alterado.",
    metrics: [
      { label: "Experiência", value: "Catálogo & Sacola" },
      { label: "Dados", value: "Somente local" },
    ],
  },
  {
    id: "vlinix-detailer",
    title: "Vlinix — Gestão para Detailers",
    subtitle: "Organização do profissional de estética automotiva • Flutter & Dart",
    badge: "Demonstração local",
    accent: "sky",
    description:
      "Aplicativo para organizar a carteira de clientes, os veículos, os serviços, os agendamentos e o controle financeiro de um profissional de limpeza automotiva. A versão web demonstra os fluxos com uma base fictícia independente da operação real.",
    technicalHighlights: [
      "Telas do próprio aplicativo para clientes, agenda, serviços e finanças.",
      "Cadastros e alterações persistidos apenas no navegador do visitante.",
      "Modo demonstração sem autenticação real, com dados iniciais e restauração da base de exemplo.",
    ],
    stack: ["Flutter", "Dart", "Flutter Web", "Armazenamento local"],
    externalDemoUrl: withBasePath("/demos/vlinix/"),
    externalDemoLabel: "Explorar Vlinix",
    demoNotice: "Dados de exemplo no seu navegador. A demonstração não acessa o banco de clientes real.",
    githubRepoName: "vlinix",
    githubUrl: "https://github.com/Daniel-SLima/vlinix",
    metrics: [
      { label: "Organização", value: "Clientes & Agenda" },
      { label: "Gestão", value: "Finanças" },
    ],
  },
  {
    id: "playwright-qa-suite",
    title: "Automação QA com Playwright, BDD/Gherkin & Bug Hunting",
    subtitle: "Testes E2E, Contratos de API, Sessões Exploratórias & Evidências Reais",
    badge: "Vitrine QA & Automação",
    accent: "emerald",
    description:
      "Conjunto prático de automação Web e API com Playwright, unindo Page Object Model, cenários em Gherkin/BDD e diagnóstico real de defeitos de fronteira e status HTTP documentados com evidências.",
    technicalHighlights: [
      "Diagnóstico real em loja virtual: identificação de bug de valor limite no frete grátis (R$ 200,00) e falha de validação na API (HTTP 200 em vez de 422) isolada com test.fail().",
      "Cenários padronizados em BDD/Gherkin cobrindo cálculos financeiros, RBAC e fluxos de ERP.",
      "Arquitetura Page Object Model (POM) em TypeScript/JavaScript com relatórios HTML e evidências visuais.",
      "Integração com esteiras CI/CD no GitHub Actions validando rotas e ativos automaticamente.",
    ],
    stack: ["Playwright", "TypeScript / JS", "BDD / Gherkin", "API Testing", "Evidências QA", "GitHub Actions"],
    demoHref: "/qa-lab",
    demoLabel: "Abrir Laboratório QA",
    githubRepoName: "teste-tecnico-qa-verzel",
    githubUrl: "https://github.com/Daniel-SLima/teste-tecnico-qa-verzel",
    metrics: [
      { label: "Cobertura", value: "E2E + API" },
      { label: "Padrão", value: "BDD + POM" },
      { label: "Diagnóstico", value: "Bugs Reais" },
    ],
  },
  {
    id: "ragtest-ai",
    title: "RagTest — Arquitetura RAG Híbrida, Avaliação & CI",
    subtitle: "Projeto de Engenharia & Qualidade de IA • FastAPI, Qdrant, Docker & Testes",
    badge: "IA, Testes & CI",
    accent: "sky",
    description:
      "Sistema modular de Retrieval-Augmented Generation (RAG) com busca híbrida, verificação de grounding (fidelidade às fontes), suíte de avaliação automatizada, testes e integração contínua.",
    technicalHighlights: [
      "Pipeline de retrieval híbrido integrado ao banco vetorial Qdrant com API em Python/FastAPI.",
      "Mecanismos de avaliação de qualidade de respostas e verificação de grounding para mitigar alucinações.",
      "Ambiente conteinerizado com Docker, cliente mobile em React Native e execução automatizada em CI.",
    ],
    stack: ["Python", "FastAPI", "Qdrant", "Docker", "React Native", "Testes & CI"],
    githubRepoName: "RagTest",
    githubUrl: "https://github.com/Daniel-SLima/RagTest",
    metrics: [
      { label: "Busca", value: "RAG Híbrido" },
      { label: "Qualidade IA", value: "Grounding Eval" },
      { label: "Infra", value: "Docker + CI" },
    ],
  },
  {
    id: "nasa-and-lirdio",
    title: "NASA Space Apps 2026 (Top 10) & Lirdio Streaming",
    subtitle: "Premiações em Inovação, Análise de Indicadores & Performance JMeter",
    badge: "Top 10 Regional & 2x Finalista",
    accent: "amber",
    description:
      "Destaques competitivos em inovação tecnológica: protótipo de telemetria médica espacial encaminhado para avaliação mundial da NASA e plataforma de streaming de audiolivros testada sob carga.",
    technicalHighlights: [
      "NASA Space Apps 2026 (Top 10 Regional): monitoramento da saúde de astronautas com análise de indicadores para tomada de decisão.",
      "Lirdio (Finalista Salvador Lab & Bahia Tech Experience): plataforma Full Stack de audiolivros prototipada no Figma e construída com JS, Bootstrap e SQL.",
      "Execução de testes de desempenho e carga no player de áudio utilizando Apache JMeter e BlazeMeter.",
    ],
    stack: ["Indicadores & Dados", "JMeter", "BlazeMeter", "JavaScript", "SQL", "Figma"],
    metrics: [
      { label: "NASA 2026", value: "Top 10 Regional" },
      { label: "Lirdio", value: "2x Finalista" },
      { label: "Carga", value: "JMeter/BlazeMeter" },
    ],
  },
];

export const MORE_GITHUB_REPOS: SecondaryRepoItem[] = [
  {
    name: "playwright-erp-qa-suite",
    title: "Playwright ERP & SaaS QA Suite — POM, BDD & API",
    description:
      "Framework de automação E2E e API em TypeScript com Page Object Model, cenários Gherkin (PT-BR), Plano de Testes, Bug Report modelo e GitHub Actions.",
    stack: ["Playwright", "TypeScript", "BDD / Gherkin", "POM", "GitHub Actions"],
    url: "https://github.com/Daniel-SLima/playwright-erp-qa-suite",
  },
  {
    name: "saas-gestao-comercial-architecture",
    title: "Arquitetura SQL & Supabase RLS — SaaS Comercial",
    description:
      "Repositório complementar ao OrçaDemo demonstrando a modelagem PostgreSQL, Row Level Security para os 6 perfis (perfis_usuarios) e testes automatizados.",
    stack: ["PostgreSQL", "Supabase RLS", "TypeScript", "RBAC", "Node Test"],
    url: "https://github.com/Daniel-SLima/saas-gestao-comercial-architecture",
  },
  {
    name: "Vira_Financas",
    title: "Vira Finanças — App Android Offline com CI",
    description:
      "Aplicativo mobile de finanças pessoais com planejamento, backup local seguro, persistência SQLite e pipeline GitHub Actions.",
    stack: ["Kotlin", "Android", "SQLite", "Gradle", "GitHub Actions"],
    url: "https://github.com/Daniel-SLima/Vira_Financas",
  },
  {
    name: "OrganizaBot",
    title: "OrganizaBot — Automação com Prévia & Pytest",
    description:
      "Aplicação web local em Python/Flask para organização inteligente de arquivos com prévia segura, confirmação e suíte de testes automatizados.",
    stack: ["Python", "Flask", "Pytest", "Automação"],
    url: "https://github.com/Daniel-SLima/OrganizaBot",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "qa",
    title: "Quality Assurance & Metodologias",
    subtitle: "Garantia da qualidade em sistemas ERP, Web e APIs",
    accent: "emerald",
    items: [
      { name: "Testes Funcionais & Manuais", context: "Validação de regras de negócio complexas" },
      { name: "Testes Exploratórios & Regressão", context: "Estabilidade contínua em homologação" },
      { name: "Retestes & Gestão de Bugs", context: "Evidências, passos e comportamento esperado" },
      { name: "BDD & Gherkin", context: "Especificação executável em fluxo padronizado" },
      { name: "Testes de API REST", context: "Validação de payloads, status HTTP e contratos" },
      { name: "JMeter & BlazeMeter", context: "Testes de carga, estresse e desempenho" },
    ],
  },
  {
    id: "automation",
    title: "Automação, CI/CD & Engenharia com IA",
    subtitle: "Aceleração de testes e pipelines confiáveis",
    accent: "sky",
    items: [
      { name: "Playwright (TS / JS)", context: "Automação E2E resiliente com Page Objects" },
      { name: "Pytest & Testes Unitários", context: "Validação automatizada de serviços e regras" },
      { name: "Git, GitHub & Actions CI", context: "Versionamento, PRs e esteiras automatizadas" },
      { name: "Claude Code & Codex", context: "Agentes de IA aplicados a testes e evolução" },
      { name: "Docker", context: "Ambientes isolados e reprodutíveis para testes" },
      { name: "Zendesk & Fluig", context: "Gestão de chamados, incidentes e fluxos ITSM" },
    ],
  },
  {
    id: "fullstack",
    title: "Desenvolvimento Full Stack",
    subtitle: "Construção de aplicações web, APIs e mobile",
    accent: "indigo",
    items: [
      { name: "Next.js & React", context: "App Router, SSR e interfaces modernas" },
      { name: "TypeScript & JavaScript", context: "Tipagem estrita e regras de negócio limpas" },
      { name: "Python (FastAPI & Flask)", context: "APIs rápidas, automação e sistemas RAG" },
      { name: "Java & Kotlin", context: "Orientação a objetos e apps Android nativos" },
      { name: "Tailwind CSS & Bootstrap", context: "Design systems responsivos e acessíveis" },
      { name: "PDF & Excel Export", context: "Emissão dinâmica de orçamentos, OPs e planilhas" },
    ],
  },
  {
    id: "data_erp",
    title: "Dados, Bancos & Sistemas ERP",
    subtitle: "Sustentação corporativa e análise analítica",
    accent: "amber",
    items: [
      { name: "SQL, PostgreSQL & SQLite", context: "Consultas analíticas, integridade e modelagem" },
      { name: "Supabase (Auth & RLS)", context: "Segurança por linha e controle por perfis" },
      { name: "ERP Nasajon", context: "Validação nos módulos Finanças, Serviços e RH" },
      { name: "ERP TOTVS Datasul", context: "Suporte técnico, acessos e novas rotinas" },
      { name: "Microsoft Excel Intermediário", context: "Análise de indicadores e relatórios gerenciais" },
      { name: "Qdrant & Busca Vetorial", context: "Indexação híbrida em aplicações de IA" },
    ],
  },
];

export const EDUCATION = [
  {
    institution: "IFBA — Instituto Federal da Bahia",
    course: "Tecnólogo em Análise e Desenvolvimento de Sistemas (Noturno)",
    period: "Previsão de conclusão: 2028.1 (1º semestre de 2028)",
    status: "5º Semestre em andamento",
  },
  {
    institution: "SENAI CIMATEC",
    course: "Técnico em Desenvolvimento de Sistemas",
    period: "Agosto de 2022 – Dezembro de 2023",
    status: "Concluído",
  },
];

export const CERTIFICATIONS_AND_LANGUAGES = {
  certifications: [
    { name: "NASA Space Apps Challenge 2026", issuer: "Top 10 Regional (Encaminhado para Avaliação Mundial)", year: "2026" },
    { name: "Finalista Salvador Lab & Bahia Tech Experience", issuer: "Projeto Lirdio", year: "2023" },
    { name: "Mini Curso de SQL", issuer: "Xperiun", year: "2025" },
    { name: "Microsoft Excel Intermediário", issuer: "Fundação Bradesco", year: "2024" },
  ],
  languages: [
    { name: "Português", level: "Nativo", detail: "Comunicação técnica e documentação" },
    { name: "Inglês", level: "Intermediário / Profissional (B2)", detail: "Certificado Voxy — Leitura, escrita e reuniões" },
    { name: "Francês", level: "Básico / Intermediário", detail: "Intercâmbio presencial de 8 meses na França" },
  ],
};

export const QA_SHOWCASE_DATA = {
  gherkinSnippet: `# language: pt
Funcionalidade: Emissão e Aprovação de Orçamento Comercial no SaaS
  Como um Consultor Comercial autenticado
  Quero gerar um orçamento com cálculo automático de impostos e desconto por perfil
  Para convertê-lo em Ordem de Produção e exportar em PDF/Excel sem inconsistências

  Contexto:
    Dado que estou autenticado com o perfil "Comercial"
    E existem produtos ativos cadastrados no catálogo SQL

  @e2e @regressao @regras-de-negocio
  Cenário: Aplicar desconto permitido e converter orçamento aprovado em Ordem de Produção
    Quando seleciono o cliente "Indústria Baiana de Componentes Ltda"
    E adiciono 10 unidades do item "Painel de Controle Industrial" (R$ 1.250,00)
    E aplico o desconto comercial autorizado de 5%
    Então o valor líquido calculado deve ser "R$ 11.875,00"
    Quando aprovo o orçamento para produção
    Então uma nova Ordem de Produção vinculada deve ser criada com status "Em Produção"
    E o relatório Excel exportado deve conter o registro atualizado

  @seguranca @rbac
  Cenário: Bloquear desconto acima da alçada para perfil não-administrador
    Quando tento aplicar 25% de desconto sem permissão de "Administrador"
    Então o sistema deve bloquear a operação e exibir "Alçada máxima excedida para este perfil"`,

  playwrightSnippet: `import { test, expect } from "@playwright/test";
import { OrcamentoPage } from "../../pages/OrcamentoPage";

test.describe("Fluxo Comercial & RBAC - SaaS Orçamentos @e2e", () => {
  test("deve calcular desconto de alçada e gerar Ordem de Produção", async ({ page }) => {
    const orcamento = new OrcamentoPage(page);

    await orcamento.acessarComoPerfil("Comercial");
    await orcamento.criarOrcamento({
      cliente: "Indústria Baiana de Componentes Ltda",
      produto: "Painel de Controle Industrial",
      quantidade: 10,
      descontoPercentual: 5,
    });

    await expect(orcamento.valorLiquidoLabel).toHaveText("R$ 11.875,00");

    await orcamento.aprovarParaProducao();
    await expect(orcamento.statusBadge).toHaveText("Em Produção");

    // Validação de integridade do download CSV/Excel
    const download = await orcamento.exportarRelatorioExcel();
    expect(download.suggestedFilename()).toMatch(/relatorio-orcamentos.*\\.csv$/);
  });

  test("deve retornar 403 na API ao tentar aprovar desconto sem perfil Admin", async ({ request }) => {
    const response = await request.post("/api/orcamentos/aprovar-desconto", {
      headers: { "x-user-role": "comercial" },
      data: { orcamentoId: "ORC-2026-041", descontoPercentual: 25 },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.error).toContain("Alçada máxima excedida");
  });
});`,

  bugReportExample: {
    id: "BUG-ERP-418",
    title: "Divergência no arredondamento de ISS em lote na validação de NFS-e (Módulo Serviços)",
    severity: "Alta",
    priority: "P1 — Bloqueante de Homologação",
    environment: "Homologação ERP Web v4.18.2 | PostgreSQL 15 | Chrome 131",
    reproSteps: [
      "1. Acessar o módulo Serviços > Faturamento em Lote no ambiente de homologação.",
      "2. Selecionar 3 ordens de serviço com alíquota de ISS de 2,5% e valores terminados em dízima.",
      "3. Clicar em 'Calcular Totais e Gerar Prévia Fiscal'.",
      "4. Comparar a soma dos itens individuais com o total consolidado no rodapé e na query SQL.",
    ],
    expectedBehavior:
      "O total do ISS deve respeitar o arredondamento ABNT NBR 5891 por item antes da totalização do lote (R$ 142,38).",
    actualBehavior:
      "O sistema arredonda apenas na exibição final, gerando diferença de R$ 0,02 (R$ 142,36) e causando rejeição na validação do XML.",
    evidence: "Log da API /api/servicos/calcular-lote (HTTP 200 com payload divergente) + Query SQL comparativa anexada.",
  },
};
