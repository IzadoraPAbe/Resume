const by = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];

const runtimeStyles = document.createElement('style');
runtimeStyles.textContent = `
  .language-toggle { display:inline-flex; align-items:center; justify-content:center; min-width:33px; padding:7px 10px; border:1px solid var(--line); color:var(--ink); background:transparent; cursor:pointer; font:700 10px var(--mono); }
  .language-toggle:hover { border-color:#83a600; color:#668900; }
  body.dark-mode .language-toggle { background:#12354a; }
  body.dark-mode .primary { color:#071c2e; background:#d8ff5a; box-shadow:4px 4px 0 #e7f1f5; }
  body.dark-mode .primary:hover { box-shadow:2px 2px 0 #e7f1f5; }
  .portrait-placeholder { padding:0; }
  .portrait-placeholder img { width:100%; height:100%; display:block; object-fit:cover; object-position:center 22%; }
  .hero-actions .contact-options { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
  .hero-actions .contact-options .text-button { white-space:nowrap; }
  @media (max-width:800px) { .hero-actions .contact-options { align-items:flex-start; flex-direction:column; gap:12px; } }
  footer { min-height:145px; padding-top:25px; padding-bottom:20px; }
  @media (max-width:800px) { footer { min-height:195px; padding-top:28px; padding-bottom:25px; } }
`;
document.head.append(runtimeStyles);

const portraitPlaceholder = by('.portrait-placeholder');
portraitPlaceholder.innerHTML = '<img src="izadora-portrait-cropped.png" alt="Izadora Pivotto Abe">';

const contactOptions = document.createElement('div');
contactOptions.className = 'contact-options';
const heroEmail = by('.hero-actions .text-button');
heroEmail.parentNode.insertBefore(contactOptions, heroEmail);
contactOptions.append(heroEmail);
const heroLinkedIn = document.createElement('a');
heroLinkedIn.className = 'button text-button';
heroLinkedIn.href = 'https://www.linkedin.com/in/izadorapivottoabe';
heroLinkedIn.target = '_blank';
heroLinkedIn.rel = 'noreferrer';
contactOptions.append(heroLinkedIn);
const footerLinkedIn = by('.footer-contact .linkedin');
footerLinkedIn.target = '_blank';
footerLinkedIn.rel = 'noreferrer';

by('#year').textContent = new Date().getFullYear();

// Theme: use the operating-system preference until the visitor chooses a theme.
const themeToggle = by('#theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeText = themeToggle.querySelector('.theme-text');
const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  themeIcon.textContent = dark ? '☀' : '☾';
  themeText.textContent = dark ? (document.documentElement.lang === 'pt-BR' ? 'Modo claro' : 'Light mode') : (document.documentElement.lang === 'pt-BR' ? 'Modo escuro' : 'Dark mode');
  themeToggle.setAttribute('aria-label', dark ? (document.documentElement.lang === 'pt-BR' ? 'Ativar modo claro' : 'Enable light mode') : (document.documentElement.lang === 'pt-BR' ? 'Ativar modo escuro' : 'Enable dark mode'));
}

let theme = localStorage.getItem('izadora-theme');
setTheme(theme || (colorPreference.matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem('izadora-theme', theme);
  setTheme(theme);
});
colorPreference.addEventListener('change', (event) => {
  if (!localStorage.getItem('izadora-theme')) setTheme(event.matches ? 'dark' : 'light');
});

// Language control is created here so the existing layout remains untouched.
const languageToggle = document.createElement('button');
languageToggle.type = 'button';
languageToggle.className = 'language-toggle';
by('.topbar-actions').prepend(languageToggle);

const ptRoles = [
  ['Especialista de Estratégia de Dados', 'Data Sourcing & Partnerships', ['Liderança do ciclo de aquisição e homologação de fontes externas, conectando requisitos, qualidade, cobertura, Jurídico e Compliance.', 'Estruturação de camadas analíticas, governança de KPIs e dashboards executivos para quatro unidades de negócio.', 'Redesenho e automação do ciclo de compras: redução do lead time de 60 para 30 dias.', 'Gestão de forecast e orçamento anual de dezenas de milhões de reais.'], ['Data Strategy', 'Governança', 'Power BI', 'Power Platform', 'IA Generativa']],
  ['Analista de Dados Sênior', '', ['Liderança e mentoria de cinco analistas em projetos de analytics e capital de giro.', 'Criação de dashboard financeiro unificado em Power BI para múltiplas empresas, com SQL, modelagem dimensional e RLS.', 'Desenvolvimento de pipelines ETL/ELT e automação de processos com Power Automate e Power Apps.'], ['Liderança', 'ETL/ELT', 'SQL', 'RLS']],
  ['Analista de Dados Pleno', '', ['Automação de pipelines e rotinas de dados com Power Platform, fortalecendo a eficiência operacional.', 'Criação de dashboards, indicadores e aplicativos internos para times ágeis e orientados por dados.'], ['Power BI', 'Power Platform', 'KPIs']],
  ['Analista de Dados Júnior', '', ['Tratamento, consolidação e análise de dados para relatórios gerenciais e tomada de decisão.', 'Automação de planilhas em Excel/VBA e desenvolvimento dos primeiros dashboards em Power BI.'], ['Excel', 'VBA', 'Power BI']],
  ['Consultora Financeira', '', ['Estruturação de planejamento financeiro, fluxo de caixa e análises de ROI para clientes.', 'Condução de controles e negociações com instituições financeiras, conectando estratégia e resultado.'], ['FP&A', 'Fluxo de Caixa', 'ROI']],
  ['Analista Financeira', '', ['Elaboração de relatórios financeiros, conciliação bancária e análise de taxas.', 'Apoio à redução de custos e à tomada de decisão baseada em indicadores financeiros.'], ['Finanças', 'Conciliação', 'Análise de Custos']]
];
const enRoles = [
  ['Data Strategy Specialist', 'Data Sourcing & Partnerships', ['Leading the acquisition and approval lifecycle for external data sources, aligning requirements, quality, coverage, Legal and Compliance.', 'Designing analytics layers, KPI governance and executive dashboards for four business units.', 'Redesigning and automating the data purchasing cycle, reducing lead time from 60 to 30 days.', 'Managing forecast and annual budget worth tens of millions of Brazilian reais.'], ['Data Strategy', 'Governance', 'Power BI', 'Power Platform', 'Generative AI']],
  ['Senior Data Analyst', '', ['Leading and mentoring five analysts across analytics and working-capital projects.', 'Building a unified Power BI financial dashboard for multiple companies, using SQL, dimensional modelling and RLS.', 'Delivering ETL/ELT pipelines and process automation with Power Automate and Power Apps.'], ['Leadership', 'ETL/ELT', 'SQL', 'RLS']],
  ['Mid-level Data Analyst', '', ['Automating data pipelines and routines with Power Platform to improve operational efficiency.', 'Creating dashboards, indicators and internal apps for agile, data-driven teams.'], ['Power BI', 'Power Platform', 'KPIs']],
  ['Junior Data Analyst', '', ['Cleaning, consolidating and analysing data for management reporting and decision-making.', 'Automating Excel/VBA spreadsheets and developing first Power BI dashboards.'], ['Excel', 'VBA', 'Power BI']],
  ['Financial Consultant', '', ['Developing financial planning, cash-flow and ROI analyses for clients.', 'Managing controls and negotiations with financial institutions, connecting strategy and results.'], ['FP&A', 'Cash Flow', 'ROI']],
  ['Financial Analyst', '', ['Preparing financial reports, bank reconciliations and rate analyses.', 'Supporting cost reduction and decisions based on financial indicators.'], ['Finance', 'Reconciliation', 'Cost Analysis']]
];

function renderRoles(roles) {
  all('.timeline .role').forEach((role, index) => {
    const [title, area, bullets, tags] = roles[index];
    const main = role.querySelector('.role-main');
    const company = main.querySelector('.company').outerHTML;
    main.innerHTML = `${company}<h3>${title}</h3>${area ? `<p class="role-area">${area}</p>` : ''}<ul>${bullets.map((item) => `<li>${item}</li>`).join('')}</ul><div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>`;
  });
}

function setLanguage(language) {
  const isPt = language === 'pt';
  document.documentElement.lang = isPt ? 'pt-BR' : 'en';
  document.documentElement.dataset.language = language;
  languageToggle.textContent = isPt ? 'EN' : 'PT';
  languageToggle.setAttribute('aria-label', isPt ? 'Switch to English' : 'Mudar para português');
  languageToggle.title = languageToggle.getAttribute('aria-label');
  all('nav a').forEach((link, index) => { link.textContent = (isPt ? ['Experiência', 'Formação', 'Projetos', 'Competências'] : ['Experience', 'Education', 'Projects', 'Skills'])[index]; });
  by('.contact-mini').innerHTML = `${isPt ? 'Vamos conversar' : "Let's talk"} <span>↗</span>`;
  by('.eyebrow').innerHTML = `<span></span> ${isPt ? 'Dados que movem decisões' : 'Data that drives decisions'}`;
  by('h1').innerHTML = isPt ? 'Estratégia de dados<br>para gerar <em>impacto.</em>' : 'Data strategy<br>that creates <em>impact.</em>';
  by('.hero-text').textContent = isPt ? 'Transformo dados complexos em soluções que conectam pessoas, operações e resultados de negócio.' : 'I turn complex data into solutions that connect people, operations and business results.';
  by('.hero-actions .primary').innerHTML = `${isPt ? 'Conheça minha trajetória' : 'Explore my journey'} <span>↓</span>`;
  heroEmail.innerHTML = `${isPt ? 'Enviar e-mail' : 'Email me'} <span>↗</span>`;
  heroLinkedIn.innerHTML = `LinkedIn <span>↗</span>`;
  all('.hero-meta div')[0].innerHTML = `<strong>+7 ${isPt ? 'anos' : 'years'}</strong><span>${isPt ? 'em dados, BI<br>e automação' : 'in data, BI<br>and automation'}</span>`;
  all('.hero-meta div')[1].innerHTML = `<strong>São Carlos</strong><span>São Paulo, Brazil</span>`;
  renderRoles(isPt ? ptRoles : enRoles);
  const automationSkills = by('.skill-group:nth-child(2) div');
  ['Cursor', 'LLMs', 'Prompt Engineering'].forEach((skill) => {
    if (!all('.skill-group:nth-child(2) span').some((item) => item.textContent === skill)) automationSkills.insertAdjacentHTML('beforeend', `<span>${skill}</span>`);
  });
  const education = isPt
    ? ['Pós-graduação em Estratégia e Desenvolvimento de Soluções de IA', 'Bacharelado em Ciência de Dados', 'MBA em Gestão de Negócios', 'Mestrado em Engenharia de Estruturas', 'Bacharelado em Engenharia Civil']
    : ['Postgraduate Program in AI Strategy and Solution Development', 'Bachelor’s Degree in Data Science', 'MBA in Business Management', 'Master’s Degree in Structural Engineering', 'Bachelor’s Degree in Civil Engineering'];
  all('.education-list h3').forEach((item, index) => { item.textContent = education[index]; });
  const credentials = isPt
    ? ['Power BI Data Analyst', 'Power Platform Fundamentals', 'Green Belt Lean Six Sigma', 'Scrum Master', 'Project Management Full Stack', 'Business & Strategy Finance']
    : ['Power BI Data Analyst', 'Power Platform Fundamentals', 'Lean Six Sigma Green Belt', 'Scrum Master', 'Full-Stack Project Management', 'Business & Strategy Finance'];
  all('.credential-grid h3').forEach((item, index) => { item.textContent = credentials[index]; });
  const projectTitles = isPt
    ? ['50% menos tempo<br>no ciclo de compras.', 'Dashboard financeiro unificado com RLS.', 'Processos internos prontos para auditoria.', 'Automação que devolve tempo ao time.']
    : ['50% less time<br>in the purchasing cycle.', 'Unified financial dashboard with RLS.', 'Internal processes ready for audit.', 'Automation that gives time back to the team.'];
  all('.project h3').forEach((item, index) => { item.innerHTML = projectTitles[index]; });
  const projectTypes = isPt
    ? ['Processos & Automação', 'Business Intelligence', 'Governança', 'Power Platform']
    : ['Processes & Automation', 'Business Intelligence', 'Governance', 'Power Platform'];
  const projectDescriptions = isPt
    ? ['Mapeamento, redesenho e automação ponta a ponta do ciclo de compras de dados — de 60 para 30 dias, preservando LGPD e TPRM.', 'Visão completa para múltiplos clientes em um único relatório Power BI, com acesso seguro e padronizado.', 'Documentação estruturada de fluxos, regras de negócio e controles, garantindo rastreabilidade.', 'Fluxos com Power Automate, apps em Power Apps e estruturas SharePoint para reduzir o trabalho manual.']
    : ['Mapping, redesigning and automating the full data purchasing cycle — from 60 to 30 days while preserving LGPD and TPRM requirements.', 'A complete view for multiple clients in one Power BI report, with secure and standardised access.', 'Structured documentation of workflows, business rules and controls, ensuring traceability.', 'Power Automate flows, Power Apps and SharePoint structures that reduce manual work.'];
  all('.project-type').forEach((item, index) => { item.innerHTML = `${projectTypes[index]} <span>↗</span>`; });
  all('.project > p:not(.project-type)').forEach((item, index) => { item.textContent = projectDescriptions[index]; });
  by('.project-result').innerHTML = `<b>60 → 30</b><span>${isPt ? 'dias de lead time' : 'days of lead time'}</span>`;
  const skillGroups = isPt ? ['Dados & BI', 'Automação & IA', 'Negócio & Gestão'] : ['Data & BI', 'Automation & AI', 'Business & Management'];
  all('.skill-group > p').forEach((item, index) => { item.textContent = skillGroups[index]; });
  const skillTranslation = {
    'Modelagem Dimensional': 'Dimensional Modelling', 'Governança de Dados': 'Data Governance', 'Qualidade de Dados': 'Data Quality',
    'Excel Avançado': 'Advanced Excel', 'Estratégia de Dados': 'Data Strategy', 'Orçamento': 'Budget', 'Liderança': 'Leadership',
    'Análise de Causa Raiz': 'Root Cause Analysis'
  };
  all('.skill-group span').forEach((item) => {
    if (isPt && skillTranslation[item.dataset.pt]) item.textContent = item.dataset.pt;
    if (!isPt && skillTranslation[item.textContent]) { item.dataset.pt = item.textContent; item.textContent = skillTranslation[item.textContent]; }
  });
  by('.language-name').innerHTML = `${isPt ? 'Inglês' : 'English'} <strong>${isPt ? 'avançado' : 'advanced'}</strong>`;
  const languageDetails = all('.language-card p:not(.language-name)');
  languageDetails[0].textContent = isPt ? 'B2 — ECCE, University of Michigan' : 'B2 — ECCE, University of Michigan';
  by('.language-card small').textContent = isPt ? 'Reuniões e negociações com fornecedores internacionais' : 'Meetings and negotiations with international suppliers';
  by('footer > div > p').textContent = isPt ? 'Dados, estratégia e impacto.' : 'Data, strategy and impact.';
  by('.footer-contact p').textContent = isPt ? 'Vamos criar algo relevante?' : 'Shall we create something meaningful?';
  by('footer code').textContent = isPt ? "SELECT * FROM carreira WHERE impacto = 'alto';" : "SELECT * FROM career WHERE impact = 'high';";
  // Key headings make the language change immediately clear throughout the page.
  const headings = isPt ? ['01 / Sobre mim', 'Onde a análise encontra<br><em>clareza para agir.</em>', '02 / Experiência profissional', 'Trajetória<br><em>em evolução.</em>', '03 / Formação acadêmica', 'Aprendizado<br><em>contínuo.</em>', '04 / Cursos & certificados', 'Especialização<br><em>que se aplica.</em>', '05 / Idiomas', 'Comunicação<br><em>sem fronteiras.</em>', '06 / Projetos em destaque', 'Resultados que<br><em>falam por si.</em>', '07 / Habilidades & competências', 'Ferramentas para<br><em>fazer acontecer.</em>'] : ['01 / About me', 'Where analysis meets<br><em>clarity to act.</em>', '02 / Professional experience', 'A journey<br><em>in progress.</em>', '03 / Education', 'Continuous<br><em>learning.</em>', '04 / Courses & certifications', 'Expertise<br><em>put into practice.</em>', '05 / Languages', 'Communication<br><em>without borders.</em>', '06 / Featured projects', 'Results that<br><em>speak for themselves.</em>', '07 / Skills & expertise', 'Tools to<br><em>make things happen.</em>'];
  const labels = all('.section-label'); const sectionHeads = all('.section-heading h2');
  by('.intro-band .section-label').textContent = headings[0]; by('.intro-band h2').innerHTML = headings[1];
  by('#sobre .section-label').textContent = isPt ? '01 / Sobre mim' : '01 / About me';
  by('#sobre h2').innerHTML = isPt ? 'Onde a análise encontra<br><em>clareza para agir.</em>' : 'Where analysis meets<br><em>clarity to act.</em>';
  by('#sobre > div > p').textContent = isPt
    ? 'Especialista de Estratégia de Dados na Serasa Experian. Atuo de ponta a ponta — dos requisitos e fontes aos dashboards executivos — unindo Business Intelligence, governança, automação e visão de negócio.'
    : 'Data Strategy Specialist at Serasa Experian. I work end to end — from requirements and data sources to executive dashboards — combining Business Intelligence, governance, automation and business insight.';
  labels.slice(1).forEach((item, index) => { item.textContent = headings[2 + index * 2]; sectionHeads[index].innerHTML = headings[3 + index * 2]; });
  setTheme(document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  localStorage.setItem('izadora-language', language);
}

const savedLanguage = localStorage.getItem('izadora-language');
setLanguage(savedLanguage || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'));
languageToggle.addEventListener('click', () => setLanguage(document.documentElement.dataset.language === 'pt' ? 'en' : 'pt'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
all('.reveal').forEach((element) => observer.observe(element));
