export interface IndustryDomain {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  challengeOverview: string;
  keyUseCases: {
    title: string;
    description: string;
    impact: string;
  }[];
  architectureHighlights: string[];
}

export const INDUSTRY_DOMAINS: IndustryDomain[] = [
  {
    id: 'manufacturing-industrial',
    name: 'Manufacturing & Industrial Operations',
    slug: 'manufacturing-industrial',
    tagline: 'Streamlining high-complexity technical workflows, RFQ turnaround, and equipment data.',
    challengeOverview: 'Industrial leaders manage complex bills-of-materials, multi-page technical RFQs, and distributed plant equipment. Manual interpretation leads to quoting delays, lost orders, and uncoordinated maintenance.',
    keyUseCases: [
      {
        title: 'Intelligent RFQ & Spec Parsing',
        description: 'Extracting engineering tolerances, material grades, and quantities from incoming CAD/PDF bid packages to generate structured component lists.',
        impact: 'Dramatically accelerates quotation velocity and complex bid package readiness.'
      },
      {
        title: 'Predictive Equipment Health & Telemetry',
        description: 'Ingesting high-frequency IoT sensor telemetry to detect anomalous vibration, temperature, and pressure signatures before catastrophic failures.',
        impact: 'Minimizes unplanned downtime on critical production lines.'
      },
      {
        title: 'Legacy PLC/SCADA Integration',
        description: 'Building modern edge-to-cloud gateways that extract historical machine registers into analytical data lakes without disrupting active PLCs.',
        impact: 'Unifies operational visibility across brownfield facilities.'
      }
    ],
    architectureHighlights: [
      'Edge protocol adapters (OPC-UA, Modbus, MQTT)',
      'Multi-modal document vision models for technical drawings',
      'Time-series storage with automated anomaly thresholds'
    ]
  },
  {
    id: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    slug: 'logistics-supply-chain',
    tagline: 'Resilient shipping intelligence, automated documentation, and operational exception handling.',
    challengeOverview: 'Global supply networks face constant disruptions, volatile customs documentation requirements, and fragmented carrier systems where single clerical errors halt freight movements.',
    keyUseCases: [
      {
        title: 'Automated Bill of Lading & Customs Processing',
        description: 'Parsing multi-lingual customs documents, commercial invoices, and packing manifests, automatically cross-verifying HS tariff codes and vessel numbers.',
        impact: 'Eliminates clearance delays and manual customs re-keying.'
      },
      {
        title: 'Dynamic ETA & Route Risk Scoring',
        description: 'Combining port congestion data, weather models, and AIS vessel telemetry to generate calibrated delivery windows and early rerouting suggestions.',
        impact: 'Reduces detention and demurrage penalties across container shipments.'
      },
      {
        title: 'Automated Carrier Exception Resolution',
        description: 'Event-driven agent workflows that ingest carrier delay notices, draft customer advisories, and trigger automated inventory holds.',
        impact: 'Protects SLA compliance without ballooning dispatch headcount.'
      }
    ],
    architectureHighlights: [
      'Asynchronous webhook orchestration with retry guarantees',
      'Document classification and optical entity extraction',
      'Geospatial telemetry streaming pipelines'
    ]
  },
  {
    id: 'financial-professional-services',
    name: 'Financial & Professional Services',
    slug: 'financial-professional-services',
    tagline: 'Audit-ready compliance, structured document extraction, and governed analytical intelligence.',
    challengeOverview: 'Firms handle high-stakes regulatory reporting, complex advisory engagements, and sensitive client portfolios where security, confidentiality, and deterministic audit trails are strictly non-negotiable.',
    keyUseCases: [
      {
        title: 'Governed Knowledge Retrieval & Research',
        description: 'Grounded RAG assistants operating across thousands of historical transaction memorandums, tax rulings, and audit precedents with strict citation tracking.',
        impact: 'Substantially reduces research and comparative drafting cycles with traceable citations.'
      },
      {
        title: 'Automated Due Diligence Extraction',
        description: 'Processing virtual data rooms (VDRs) to flag key covenant terms, change-of-control clauses, and financial disclosures in M&A transactions.',
        impact: 'Surfaces contractual liabilities days ahead of traditional manual reviews.'
      },
      {
        title: 'Transaction Anomaly & Risk Auditing',
        description: 'Deterministic rule engines coupled with unsupervised anomaly models to identify suspicious multi-party transactions and policy discrepancies.',
        impact: 'Maintains comprehensive defensible audit trails for regulators.'
      }
    ],
    architectureHighlights: [
      'Zero-data-retention client-controlled API proxies',
      'Role-based vector access control (RBAC)',
      'Immutable cryptographic transformation logs'
    ]
  },
  {
    id: 'technology-software',
    name: 'Technology & Software Companies',
    slug: 'technology-software',
    tagline: 'Architecting intelligent product features, high-throughput backends, and scaling engineering delivery.',
    challengeOverview: 'SaaS platforms and software engineering teams face escalating pressure to embed real AI capability into product roadmaps while managing cloud compute bills and maintaining strict enterprise uptime and performance SLA standards.',
    keyUseCases: [
      {
        title: 'Embedded AI Feature Architecture',
        description: 'Designing and deploying native AI capabilities—such as semantic search, conversational copilots, and intelligent recommendation loops—into existing web applications.',
        impact: 'Delivers differentiated product value without architectural regressions.'
      },
      {
        title: 'High-Concurrency Backend Modernization',
        description: 'Refactoring bottlenecks in database queries, API routing, and queuing layers to scale systems from thousands to millions of daily active operations.',
        impact: 'Reduces p99 latency while lowering monthly cloud infrastructure costs.'
      },
      {
        title: 'Targeted Engineering Squad Augmentation',
        description: 'Embedding senior distributed systems and AI engineers directly into active product sprint squads to hit tight product launch deadlines.',
        impact: 'Avoids multi-month recruiting delays for critical technical capabilities.'
      }
    ],
    architectureHighlights: [
      'Distributed microservices with gRPC and event sourcing',
      'Production LLMOps pipelines with latency caching and fallback models',
      'Infrastructure as Code (Terraform) and automated canary releases'
    ]
  },
  {
    id: 'enterprise-operations',
    name: 'Enterprise Operations & Shared Services',
    slug: 'enterprise-operations',
    tagline: 'Eliminating cross-departmental friction, invoice matching bottlenecks, and administrative delay.',
    challengeOverview: 'Large organizations waste thousands of skilled operational hours transcribing data between ERPs, CRMs, and email inboxes, creating processing backlogs and delayed month-end closes.',
    keyUseCases: [
      {
        title: 'Intelligent Accounts Payable Reconciliation',
        description: 'Automating multi-page invoice line-item extraction, PO matching, and GL coding with automated discrepancy routing to responsible department heads.',
        impact: 'Dramatically compresses invoice processing cycles while eliminating manual re-keying errors.'
      },
      {
        title: 'Employee Operations & Policy Assistant',
        description: 'Centralized operational assistant answering complex queries across internal HR, IT security, and compliance documentation with source-linked answers.',
        impact: 'Substantially reduces administrative ticket volumes and speeds query resolution.'
      },
      {
        title: 'Cross-System Data Reconciliation',
        description: 'Automating periodic integrity verification between sales registers, CRM opportunities, and financial ledgers, flagging discrepancies proactively.',
        impact: 'Enables rapid, error-free financial month-end close procedures.'
      }
    ],
    architectureHighlights: [
      'Bidirectional enterprise ERP & CRM integration connectors',
      'Human-in-the-loop exception and approval management consoles',
      'Automated SLA monitoring and escalation notification engines'
    ]
  }
];
