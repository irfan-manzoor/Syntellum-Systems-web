export interface CapabilityPillar {
  id: string;
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  image: string;
  problemsAddressed: string[];
  typicalEngagements: {
    title: string;
    description: string;
  }[];
  whatWeDeliver: string[];
  coreTechnologies: string[];
  governanceAndControls: string[];
  outcomeCategories: string[];
}

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'ai-technology-advisory',
    slug: 'ai-technology-advisory',
    index: '01',
    title: 'AI & Technology Advisory',
    shortTitle: 'Advisory & Strategy',
    tagline: 'Translating strategic business priorities into clear architecture, investment clarity, and executable technology roadmaps.',
    summary: 'We work alongside executive teams, CIOs, and business leaders to identify where artificial intelligence and modern technology create tangible operational leverage—and where they do not.',
    image: '/assets/images/backgrounds/2_architecture-of-decisions_c931c652.jpg',
    problemsAddressed: [
      'Lack of a unified, defensible AI adoption roadmap aligned with commercial goals',
      'Fragmented tech investments producing isolated proofs of concept without production value',
      'Architectural uncertainty: evaluating build vs. buy, cloud vendor lock-in, and infrastructure cost models',
      'Governance ambiguity surrounding data rights, model safety, IP ownership, and operational liability',
      'Difficulty translating board-level mandates into realistic engineering sprints'
    ],
    typicalEngagements: [
      {
        title: 'AI Opportunity Assessment & Readiness Roadmap',
        description: 'Comprehensive evaluation of organizational data assets, workflow bottlenecks, and high-yield use cases to sequence initiatives by business impact and technical feasibility.'
      },
      {
        title: 'Enterprise Architecture & Cloud Strategy',
        description: 'Designing target-state architectures that decouple monolithic systems, establish modern data access, and support future AI integration with enterprise security.'
      },
      {
        title: 'Technical Due Diligence & Platform Evaluation',
        description: 'Independent evaluation of vendor platforms, proprietary codebases, or acquisition targets to assess technical debt, scalability, and security posture.'
      },
      {
        title: 'AI Governance & Operating Model Design',
        description: 'Establishing pragmatic governance frameworks, risk classification tiers, human oversight policies, and cross-functional delivery structures.'
      }
    ],
    whatWeDeliver: [
      'Multi-horizon technology and AI roadmap with sequenced milestones',
      'Target-state enterprise architecture diagrams and integration blueprints',
      'Data readiness and infrastructure gap audit reports',
      'Vendor selection scorecards and technical risk assessments',
      'Executive decision memos and investment business cases'
    ],
    coreTechnologies: [
      'Enterprise Architecture Frameworks',
      'Cloud Infrastructure Modeling (AWS, GCP, Azure)',
      'Security & Access Governance Systems',
      'Data Lineage & Compliance Tooling'
    ],
    governanceAndControls: [
      'Independent vendor-agnostic architecture recommendations',
      'Risk-adjusted feasibility matrices prior to capital deployment',
      'Explicit operational controls and regulatory alignment frameworks'
    ],
    outcomeCategories: [
      'Strategic capital allocation clarity',
      'Elimination of unviable exploratory initiatives',
      'De-risked architectural migrations',
      'Clear stakeholder alignment across business and engineering'
    ]
  },
  {
    id: 'generative-applied-ai',
    slug: 'generative-applied-ai',
    index: '02',
    title: 'Generative AI & Applied AI',
    shortTitle: 'Generative & Applied AI',
    tagline: 'Enterprise LLM systems, retrieval-augmented generation (RAG), and intelligent agents engineered for real-world precision.',
    summary: 'Moving beyond experimental prototypes into production-grade intelligence: domain-grounded knowledge systems, automated reasoning pipelines, and structured document intelligence backed by human-in-the-loop controls.',
    image: '/assets/images/backgrounds/3_the-intelligence-field-1_65f9899b.jpg',
    problemsAddressed: [
      'Hallucinations and ungrounded outputs in critical customer or enterprise workflows',
      'Unstructured enterprise knowledge locked in PDFs, legacy repositories, and technical manuals',
      'Fragile LLM wrapper scripts failing under production volume and variable inputs',
      'Absence of rigorous evaluation metrics to measure model accuracy, latency, and drift',
      'Compliance and IP leakage concerns when interacting with commercial model APIs'
    ],
    typicalEngagements: [
      {
        title: 'Enterprise Retrieval-Augmented Generation (RAG)',
        description: 'Domain-specific knowledge assistants querying internal policy, technical documentation, or contracts with citation-grounded responses and strict ACL permissions.'
      },
      {
        title: 'Multi-Agent Workflow Orchestration',
        description: 'Autonomous yet governed agent systems coordinating complex multi-step processes such as market analysis, document verification, and code synthesis.'
      },
      {
        title: 'Intelligent Document Understanding & Extraction',
        description: 'High-throughput parsing of complex semi-structured documents (technical drawings, RFQs, invoices, contracts) into validated structured database schemas.'
      },
      {
        title: 'Decision Support & Predictive Modeling',
        description: 'Machine learning systems predicting operational churn, demand fluctuations, equipment maintenance schedules, or resource allocation.'
      }
    ],
    whatWeDeliver: [
      'Production RAG pipelines with hybrid dense/sparse search and re-ranking',
      'Deterministic agent execution harnesses with rollback and audit trails',
      'Automated LLM evaluation suites (groundedness, relevance, latency)',
      'Human-in-the-loop triage consoles for low-confidence inferences',
      'Enterprise API endpoints with rate-limiting, caching, and fallback logic'
    ],
    coreTechnologies: [
      'Modern LLM & Multimodal Foundations',
      'Vector Stores & Hybrid Indexing (Qdrant, pgvector, Milvus)',
      'Orchestration & Agent Frameworks',
      'Evaluation & Guardrail Suites (Promptfoo, Langfuse, TruLens)'
    ],
    governanceAndControls: [
      'Citation-enforced grounding on authorized documents',
      'Strict input/output sanitization against prompt injection',
      'Configurable confidence thresholds triggering human review'
    ],
    outcomeCategories: [
      'Substantial reduction in internal search latency',
      'High extraction accuracy on complex semi-structured documents',
      'Zero unauthorized data egress through client-controlled routing',
      'Measurable analyst and engineer productivity leverage'
    ]
  },
  {
    id: 'ai-data-engineering',
    slug: 'ai-data-engineering',
    index: '03',
    title: 'AI, Data & Software Engineering',
    shortTitle: 'Data & Systems Engineering',
    tagline: 'Resilient data foundations, robust cloud backends, and disciplined MLOps engineered to support mission-critical operations.',
    summary: 'AI is only as reliable as the data pipelines feeding it and the software systems hosting it. We build clean, high-performance backends, streaming data platforms, and automated deployment infrastructure.',
    image: '/assets/images/backgrounds/6_blueprint-to-execution_d2a87b42.jpg',
    problemsAddressed: [
      'Fragmented data silos preventing unified real-time reporting and model inference',
      'Unmonitored batch scripts that fail silently and cause downstream data corruption',
      'Slow, manual model deployment cycles without automated testing or rollback',
      'High cloud egress and compute costs stemming from unoptimized queries and architectures',
      'Legacy monoliths unable to support modern high-throughput API demands'
    ],
    typicalEngagements: [
      {
        title: 'Cloud-Native Data Platform Modernization',
        description: 'Building modern lakehouses and data warehouses that unify transactional and analytical data with strict schema validation and lineage tracking.'
      },
      {
        title: 'Production MLOps & LLMOps Lifecycle Management',
        description: 'Automating model containerization, continuous integration, A/B canary deployments, and real-time inference latency monitoring.'
      },
      {
        title: 'High-Concurrency Backend & Microservices Engineering',
        description: 'Architecting distributed APIs in modern languages with resilient caching, queue-based decoupling, and horizontal auto-scaling.'
      },
      {
        title: 'Legacy System Modernization & API Integration',
        description: 'Creating secure, bi-directional integration layers bridging legacy on-premise systems with modern cloud services.'
      }
    ],
    whatWeDeliver: [
      'Scalable ETL/ELT pipelines with schema enforcement and error alerting',
      'Complete CI/CD deployment pipelines with zero-downtime rollouts',
      'Production-ready containerized microservices and API gateways',
      'Centralized telemetry, latency tracing, and data drift dashboards',
      'Full technical documentation and infrastructure-as-code scripts'
    ],
    coreTechnologies: [
      'Distributed Data Platforms & Warehouses (ClickHouse, Snowflake, BigQuery)',
      'Streaming & Messaging (Kafka, RabbitMQ, Redis)',
      'Backend Frameworks (Node.js/TypeScript, Python, Go)',
      'Cloud & Container Infrastructure (Kubernetes, Docker, Terraform)'
    ],
    governanceAndControls: [
      'Role-based access control (RBAC) and column-level encryption',
      'Immutable audit logging for sensitive data transformations',
      'Automated unit, integration, and performance regression suites'
    ],
    outcomeCategories: [
      'Deterministic sub-second query and inference response times',
      'High-availability architectures engineered for mission-critical reliability',
      'Substantial reduction in compute infrastructure waste',
      'Continuous deployment velocity for engineering teams'
    ]
  },
  {
    id: 'intelligent-operations',
    slug: 'intelligent-operations',
    index: '04',
    title: 'Intelligent Operations & Automation',
    shortTitle: 'Operations & Automation',
    tagline: 'End-to-end workflow discovery, intelligent document processing, and automated process orchestration across enterprise silos.',
    summary: 'We connect business workflows across legacy ERPs, CRMs, communication channels, and logistics platforms—eliminating manual re-keying, accelerating quote-to-cash cycles, and delivering measurable throughput.',
    image: '/assets/images/backgrounds/5_intelligence-at-work_c29801d7.jpg',
    problemsAddressed: [
      'Manual, error-prone data entry across disjointed enterprise platforms',
      'Lengthy quotation and RFQ turnaround times causing lost commercial opportunities',
      'Bottlenecks in invoice matching, purchase order verification, and vendor communications',
      'Lack of operational visibility into process cycle times and root causes of delay',
      'High employee fatigue caused by repetitive administrative tasks'
    ],
    typicalEngagements: [
      {
        title: 'Industrial RFQ & Quotation Automation',
        description: 'Automating the ingestion, technical spec matching, pricing lookup, and draft response generation for industrial RFQs to slash response times from days to minutes.'
      },
      {
        title: 'Intelligent Document & Invoice Reconciliation',
        description: 'Two-way and three-way automated matching of invoices against purchase orders and shipping manifests, flagging only discrepancies for human sign-off.'
      },
      {
        title: 'Cross-System Workflow Discovery & Orchestration',
        description: 'Mapping end-to-end operational flows, identifying non-value-added delays, and implementing robust event-driven automated handoffs.'
      },
      {
        title: 'Operational Analytics & Exception Management',
        description: 'Real-time operational command centers that surface pending exceptions, queue depths, and operational SLA adherence.'
      }
    ],
    whatWeDeliver: [
      'End-to-end automated workflow engines with fallback exception routing',
      'Custom ERP/CRM/WMS bi-directional synchronization connectors',
      'Unified operator review consoles for edge-case resolutions',
      'Automated alert and notification routing via email, Slack, or webhooks',
      'Operational velocity dashboards tracking throughput and error rates'
    ],
    coreTechnologies: [
      'Event-Driven Workflow Orchestration Engines',
      'Optical Character Recognition & Layout Parsing',
      'Enterprise Connectors (SAP, Salesforce, NetSuite, Custom DBs)',
      'Automated Notification & Escalation Pipelines'
    ],
    governanceAndControls: [
      'Strict separation of automated approvals vs. high-value human authorizations',
      'Comprehensive audit trails recording every automated transaction step',
      'Configurable validation thresholds preventing downstream data pollution'
    ],
    outcomeCategories: [
      'Drastic reduction in process turnaround times',
      'Minimization of manual transcription and re-keying errors',
      'Higher commercial responsiveness through rapid quote generation',
      'Freeing internal personnel for strategic, high-value client engagements'
    ]
  },
  {
    id: 'technology-resource-augmentation',
    slug: 'technology-resource-augmentation',
    index: '05',
    title: 'Technology Resource Augmentation',
    shortTitle: 'Specialist Talent Augmentation',
    tagline: 'High-caliber AI/ML engineers, data architects, and technical delivery leaders embedded directly into your teams.',
    summary: 'Not low-cost body shopping or generic outsourcing. We provide senior, vetted engineering capacity that integrates into your sprints, adopts your coding standards, and accelerates critical technical initiatives.',
    image: '/assets/images/backgrounds/8_abstract-systems-architecture_6b645614.jpg',
    problemsAddressed: [
      'Severe shortages of experienced AI, ML, and distributed systems engineers',
      'Lengthy and unpredictable recruitment cycles delaying roadmap milestones',
      'Need for senior architectural oversight during high-stakes platform rebuilds',
      'Risk of onboarding juniors who require extensive internal training and supervision',
      'Difficulty scaling engineering teams up or down based on project phases'
    ],
    typicalEngagements: [
      {
        title: 'Specialist AI/ML & Data Engineering Extension',
        description: 'Placing senior practitioners who can immediately contribute to model training, RAG pipeline engineering, or data warehouse optimization.'
      },
      {
        title: 'Fractional Technical Leadership & System Architecture',
        description: 'Providing experienced principal engineers or architects to guide technical direction, review PRs, and establish engineering standards.'
      },
      {
        title: 'Dedicated Project Delivery Squads',
        description: 'Assembling complete, autonomous delivery pods (tech lead, senior engineers, QA) focused on delivering a discrete product or service module.'
      },
      {
        title: 'Capability Transfer & Internal Upskilling',
        description: 'Working side-by-side with your permanent engineering team to transfer operational knowledge, MLOps best practices, and architecture principles.'
      }
    ],
    whatWeDeliver: [
      'Pre-vetted senior engineers matched for specific stack and domain requirements',
      'Direct integration into your Jira/GitHub workflows and daily standups',
      'Clear technical documentation and transparent code reviews',
      'Bi-weekly delivery reviews with Syntellum leadership oversight',
      'Flexible engagement terms aligned with your release schedules'
    ],
    coreTechnologies: [
      'AI/ML Stack (PyTorch, Hugging Face, LangChain, vLLM)',
      'Data Engineering (dbt, Apache Airflow, Kafka, Spark)',
      'Full-Stack Cloud (React, TypeScript, Node.js, Python, Go, Rust)',
      'DevOps & Infrastructure (Kubernetes, AWS, GCP, Terraform)'
    ],
    governanceAndControls: [
      'Strict client IP assignment and confidentiality agreements',
      'Direct client oversight of code quality and sprint deliverables',
      'Seamless transition protocols ensuring no knowledge lock-in'
    ],
    outcomeCategories: [
      'Immediate acceleration of product roadmap delivery',
      'Zero recruiter fees and minimized onboarding ramp-up overhead',
      'Elevated internal engineering standards through peer collaboration',
      'Scalable technical agility without long-term overhead commitment'
    ]
  }
];
