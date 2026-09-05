// /experience timeline. `outcome` is a one-line distillation of the real
// bullets below it — not a separate/fabricated metric.

export const jobs = [
  {
    title: 'Director of Information Technology', co: 'Large National Membership Organization', loc: 'Philadelphia, PA',
    range: 'Feb 2024 — Present', current: true,
    outcome: "Delivered the org's first NIST 800-53 / SOC 2-aligned security posture and first third-party pen test, built physical + cloud infrastructure from scratch, and stood up production MCP server infrastructure for non-human (agent) identities.",
    bullets: [
      'Lead IT strategy, engineering, and operations for a nationwide membership organization with large affiliate network scale.',
      'Designed and run production MCP server infrastructure connecting Claude to M365, Google Workspace, Cloudflare, Supabase, and Granola; established access patterns, scoping, and audit posture for non-human (agent) identities.',
      'Lead architect on a private member-platform product — headless React/Next.js portal (Cloudflare Pages → Node/Express middleware → Salesforce/Fonteva REST) with WebAuthn/passkey auth, role-based JWT, and webhook-driven document signing.',
      'Built physical + cloud infrastructure from the ground up — hypervisor environment, enterprise switching + UniFi access, AD remediation in tandem with Entra ID consolidation.',
      'Delivered org\'s first enterprise cybersecurity milestone — NIST 800-53 / CIS aligned with SOC 2-aligned controls. Commissioned org\'s first annual third-party pen test.',
      'Drive zero-touch employee lifecycle (M365/Entra ID provisioning, PowerShell automation, onboarding/offboarding SOPs); manage IT staff, annual budget, and vendor contracts; own incident response with structured root-cause analysis.',
    ],
  },
  {
    title: 'IT Manager', co: 'ERGOS Technology Partners', loc: 'Remote',
    range: 'Jul 2023 — Feb 2024',
    outcome: 'Held 98% SLA compliance across 50+ clients while cutting client downtime ~40% and operational overhead 15%.',
    bullets: [
      'Managed team of six engineers delivering IT services to 50+ clients, maintaining 98% SLA compliance across ticket, project, and escalation queues.',
      'Led infrastructure modernization initiatives that reduced client downtime by ~40%.',
      'Optimized licensing and renegotiated vendor contracts, cutting operational overhead by 15%.',
      'Owned staff coaching, performance feedback, and workload balancing; senior technical escalation point for the team.',
      'Standardized client onboarding workflows and documentation, accelerating ramp time for new accounts.',
      'Owned vendor relationships and renewal cycles for core MSP tooling — RMM, PSA, backup, and EDR stacks.',
      'Established weekly service-review and capacity-planning cadence with technical and sales leadership.',
    ],
  },
  {
    title: 'Lead Professional Service Engineer', co: 'SWK Technologies', loc: 'Remote',
    range: 'Apr 2022 — Jul 2023',
    outcome: "Shaped the executive decision to migrate the company's RMM platform from N-central to NinjaRMM through technical evaluation and feasibility analysis.",
    bullets: [
      'Influenced strategic migration of the company\'s RMM platform from N-central to NinjaRMM — contributed technical evaluation, feature comparison, and feasibility analysis that shaped the executive decision.',
      'Senior technical escalation point across Microsoft 365, firewalls, and backup/DR.',
      'Mentored helpdesk and junior engineers; partnered with sales on scoping and technical discovery for new client engagements.',
      'Owned end-to-end delivery of M365 tenant migrations, hypervisor refreshes, and SonicWall/FortiGate cutovers.',
      'Authored technical runbooks and post-implementation documentation consumed by the broader services team.',
      'Triaged Sev-1 incidents in production environments, driving root-cause analysis and corrective-action follow-through.',
    ],
  },
  {
    title: 'Network Engineer', co: 'Moving Forward IT', loc: 'Remote',
    range: 'Aug 2018 — Apr 2022',
    outcome: "Led the full lift-and-shift migration of a mission-critical government client's infrastructure (Essex County Courthouse) with minimal downtime.",
    bullets: [
      'Led full lift-and-shift migration of Essex County Courthouse infrastructure — planned and executed relocation of production systems from legacy on-prem to a modernized data center footprint with minimal downtime for a mission-critical government client.',
      'Designed, deployed, and maintained secure network infrastructures across Cisco, Ubiquiti, and Fortinet stacks.',
      'Led firewall rule audits and IPS tuning across client network estates.',
      'Tier-3 escalation owner for complex networking incidents.',
      'Designed VLAN segmentation, 802.1Q trunking, and IPsec site-to-site tunnels for multi-site SMB clients.',
      'Maintained backup/DR posture across client environments — verified restore drills, RTO/RPO tracking, and offsite replication.',
      'Stood up monitoring and alerting for client networks; reduced mean-time-to-acknowledge for critical events.',
    ],
  },
  {
    title: 'IT Contractor', co: 'Independent — Multi-Industry', loc: 'Philadelphia, PA / Remote',
    range: '2011 — 2018',
    outcome: 'Built returning-client relationships through reliability and follow-through — the foundation for the network engineering and MSP roles that followed.',
    bullets: [
      'Delivered contract desktop and network support to small and mid-sized businesses across a range of industries.',
      'Hands-on across Windows endpoints, peripherals, consumer-to-small-business networking gear, and Tier 1–2 troubleshooting.',
      'Built returning-client relationships through reliability and follow-through — foundation work that informed the network engineering and MSP roles that followed.',
    ],
  },
  {
    title: 'IT Support', co: 'Strongcity Technology Solutions', loc: 'Philadelphia, PA',
    range: '2009 — 2010',
    outcome: 'Resolved Tier-1 tickets and escalated complex issues — the entry point into a 16+ year IT career.',
    bullets: [
      'Provided desktop and end-user support across Windows environments — hardware troubleshooting, software installs, peripheral setup, and account resets.',
      'Triaged and resolved Tier-1 tickets; escalated complex issues to senior engineers.',
    ],
  },
  {
    title: 'Computer Literacy Instructor', co: 'Honickman Learning Center', loc: 'Philadelphia, PA',
    range: '2007 — 2009', award: true,
    outcome: 'Recognized with an instructional-contribution award for community computer literacy teaching.',
    bullets: [
      'Taught computer literacy to community learners — Windows fundamentals, Microsoft Office, internet navigation, and email essentials.',
      'Adapted lesson plans for mixed skill levels; coached students one-on-one when needed.',
      'Recipient of a recognition award for instructional contribution.',
    ],
  },
  {
    title: 'Director of IT (Volunteer)', co: 'Bensalem Volunteer Fire Dept.', loc: 'Bensalem, PA',
    range: 'Aug 2018 — Present', volunteer: true,
    outcome: 'Built and maintain bensalemvfd.org, and prototyped an API-driven crew-points system that replaced manual fire-call tracking.',
    bullets: [
      'Own IT direction, public-facing web presence, and digital tooling for crew operations.',
      'Built and maintain bensalemvfd.org; Tailwind-styled frontend with a Supabase backend for dynamic content, deployed on Cloudflare.',
      'Prototyped an API-driven points auto-award app — polls the First Due API to cross-reference on-scene roster data and automatically credit crew members for fire calls, replacing manual tracking.',
      'Manage station IT, dispatch integrations, and vendor relationships on a volunteer basis.',
      'Advise leadership on technology budgeting, grant-funded equipment refreshes, and member-facing communications.',
    ],
  },
];
