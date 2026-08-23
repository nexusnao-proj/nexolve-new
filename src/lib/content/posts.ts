import type { Post } from "./types";

/**
 * Insights — procurement, source-to-pay and platform delivery notes from the
 * Nexolve team. Plain-spoken; every claim is something we can evidence from
 * delivered programmes.
 */
export const posts: Post[] = [
  {
    slug: "ariba-programmes-stall-after-stage-two",
    cover: {
      src: "/images/editorial/insight-ariba-stage-two.webp",
      alt: "Four people studying a wall-mounted network of metal conduits",
    },
    title: "Why Ariba programmes stall after stage two",
    excerpt:
      "Most Ariba implementations configure sourcing and stop. The value sits in stages three and four — integration and adoption — and that is where planning usually runs out.",
    category: "SAP Ariba",
    date: "2026-06-18",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "the-pattern",
        heading: "The pattern we keep seeing",
        body: [
          "A programme goes live on sourcing, sometimes contracts. The steering committee celebrates, the implementation partner rolls off, and eighteen months later the business still emails most of its suppliers. The platform was bought for the full source-to-pay chain; it is being used for a fraction of it.",
          "This is not a configuration problem. It is a sequencing problem. Upstream modules are demonstrable — a sourcing event makes a good screenshot. Integration and adoption are unglamorous: interface monitoring, supplier wave planning, catalogue ownership. Programmes stall because the unglamorous stages were never staffed.",
        ],
      },
      {
        id: "what-stage-three-needs",
        heading: "What stages three and four actually need",
        body: [
          "Integration needs an interface catalogue with named owners, error handling agreed with both system owners, and testing against real release cycles — not just go-live day. An Ariba-to-S/4HANA interface that fails silently will be discovered at month-end, by finance, in the worst possible way.",
          "Adoption needs the things nobody demos: supplier segmentation, wave plans, templated communications, guided enablement, and weekly metrics. Agree the adoption numbers before the programme starts, or you will never be able to say whether it worked.",
        ],
      },
      {
        id: "the-fix",
        heading: "The fix is boring and known",
        body: [
          "Plan all four stages — upstream, downstream, integration, adoption — with the same rigour, before configuration starts. Staff supplier onboarding as a managed workstream with its own milestones. Keep the team that configured the platform accountable for the adoption numbers.",
          "None of this is novel. It is simply what gets cut when a programme is priced to win rather than priced to deliver.",
        ],
      },
    ],
    related: ["guided-buying-easiest-route", "spend-baseline-before-savings"],
  },
  {
    slug: "spend-baseline-before-savings",
    cover: {
      src: "/images/editorial/insight-spend-baseline.webp",
      alt: "Two people arranging white and grey sample tiles on a black table",
    },
    title: "The spend baseline comes before the savings claim",
    excerpt:
      "Every procurement function claims savings. Few can show a baseline that finance signed. Until that exists, every number is negotiable.",
    category: "Analytics",
    date: "2026-05-27",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "the-argument",
        heading: "The argument that repeats every year",
        body: [
          "Procurement reports savings. Finance asks where they show up in the P&L. Procurement answers with a spreadsheet; finance answers with scepticism. The cycle repeats at every budget review, and both sides leave with less trust than they brought.",
          "The root cause is almost never effort or intent. It is that the two functions are counting from different baselines, with different category trees, refreshed at different times.",
        ],
      },
      {
        id: "what-a-baseline-is",
        heading: "What a real baseline looks like",
        body: [
          "A spend baseline is a reconciled cube: last-twelve-months spend, by category, supplier and entity, tied back to the general ledger. Finance signs it. Savings are then measured as movements against that signed position, using a methodology — price reduction, demand reduction, avoidance — that was agreed in advance.",
          "This is unglamorous data work: supplier normalisation, category mapping, entity reconciliation. It takes weeks, not days. It is also the only version of savings reporting that survives a CFO question.",
        ],
      },
      {
        id: "start-here",
        heading: "Where to start",
        body: [
          "Start with the top categories by addressable spend, not with a perfect taxonomy. Baseline those, agree the methodology on one live sourcing event, and expand. A baseline that covers 80 percent of spend and is signed beats a perfect model nobody trusts.",
          "Tools help — we run this on SpendConsole and SAP Analytics Cloud — but the signature from finance is the deliverable, not the dashboard.",
        ],
      },
    ],
    related: ["ariba-programmes-stall-after-stage-two", "integration-fabric-release-cycles"],
  },
  {
    slug: "guided-buying-easiest-route",
    cover: {
      src: "/images/editorial/insight-guided-buying.webp",
      alt: "Worker retrieving a part from organized storage drawers",
    },
    title: "Guided buying works when it is the easiest route, not the mandated one",
    excerpt:
      "Maverick buying is rarely defiance. It is a rational response to a compliant route that is slower than the workaround. Fix the route, not the policy memo.",
    category: "Source-to-Pay",
    date: "2026-04-30",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "why-users-go-around",
        heading: "Why users go around the system",
        body: [
          "A site engineer needs a part. The catalogue has last year's prices, the punchout supplier takes four days to confirm, and the local vendor answers the phone in one ring. She buys local and expense-claims it. Every compliance report then flags her, and procurement issues another memo.",
          "The memo will not work, because her decision was rational. The compliant route cost her two days; the workaround cost ten minutes.",
        ],
      },
      {
        id: "design-for-the-rational-user",
        heading: "Design for the rational user",
        body: [
          "Guided buying succeeds when catalogue content is current, search actually finds the item, and approval cycles are measured in hours. That means catalogue ownership with a maintenance cadence, not a one-time content load. It means wave-planned supplier enablement so the channels users need are actually live.",
          "It also means accepting that some tail spend should stay simple. A well-designed buying channel includes an easy route for genuine one-offs — governed, visible, but fast.",
        ],
      },
      {
        id: "measure-the-right-thing",
        heading: "Measure the right thing",
        body: [
          "Track channel adoption by category, not just transaction counts. If one category's compliant-channel share drops, the answer is in the content or the supplier channel, not in stricter policy.",
          "Adoption metrics should be agreed before go-live and reported weekly during rollout. What gets measured gets fixed.",
        ],
      },
    ],
    related: ["ariba-programmes-stall-after-stage-two", "supplier-portals-build-or-configure"],
  },
  {
    slug: "s4hana-migration-master-data-first",
    cover: {
      src: "/images/editorial/insight-s4hana-master-data.webp",
      alt: "Worker sorting identical metal cylinders into compartment trays",
    },
    title: "S/4HANA migration: the master data decision you make too late",
    excerpt:
      "Every S/4HANA programme says data migration is a workstream. Few treat it as the critical path it is. The cutover date will not move because the data is not ready.",
    category: "ERP & SAP",
    date: "2026-03-19",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "the-late-discovery",
        heading: "The discovery that arrives in month nine",
        body: [
          "The blueprint is signed, configuration is underway, and then someone profiles the vendor master. Duplicates across entities, bank details of uncertain provenance, materials described in free text by plant. The migration workstream triples in size overnight, and the cutover date does not move.",
          "This is predictable. Master data quality is invisible until you profile it, and most programmes profile it late because early attention goes to process design.",
        ],
      },
      {
        id: "profile-in-week-two",
        heading: "Profile in week two, not month nine",
        body: [
          "Run data profiling in the first fortnight of the programme: business partner, vendor, material and purchasing views, across every entity in scope. The output is not a cleansing project yet — it is a scope statement. You now know what the migration will actually cost.",
          "Governance design comes next: who owns a vendor record, who can create a material, what validation runs at creation. Cleansing without governance is re-done within a year.",
        ],
      },
      {
        id: "the-procurement-angle",
        heading: "Why this matters double for procurement",
        body: [
          "Procurement platforms inherit the core's data. An Ariba rollout on top of unprofiled vendor masters produces duplicate suppliers, broken catalogues and matching exceptions — and the platform gets blamed for the data underneath it.",
          "Sequence it honestly: profile early, govern before you cleanse, and align the MM scope with the platform design above it. Boring, dated, and the difference between a cutover that holds and one that slides.",
        ],
      },
    ],
    related: ["integration-fabric-release-cycles", "spend-baseline-before-savings"],
  },
  {
    slug: "integration-fabric-release-cycles",
    cover: {
      src: "/images/editorial/insight-integration-fabric.webp",
      alt: "Technician inspecting a cable connection on a large black equipment frame",
    },
    title: "Integration is a product you maintain, not a project you finish",
    excerpt:
      "Ariba releases quarterly. S/4HANA patches. APIs version. An integration estate without monitoring and ownership decays on a schedule you did not choose.",
    category: "Integration",
    date: "2026-02-12",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "the-quiet-failure",
        heading: "The failure mode nobody alerts on",
        body: [
          "The loudest integration failures are easy: the interface is down, someone notices, someone fixes it. The expensive failures are quiet — an interface that runs but drops a field, a mapping that no longer matches a new release, a reconciliation gap discovered by finance at month-end.",
          "Quiet failures happen because most integration estates have no monitoring worth the name. Success is assumed when no error was thrown.",
        ],
      },
      {
        id: "the-catalogue",
        heading: "Start with an interface catalogue",
        body: [
          "Every interface gets a row: systems, direction, owner on both sides, business impact if it fails, reconciliation method. This is one document, maintained, that turns integration from tribal knowledge into an operated asset.",
          "Reconciliation is the discipline that matters most. For each critical flow, something — a report, a control total, a count — proves the two sides agree. Absence of errors is not evidence of success.",
        ],
      },
      {
        id: "release-discipline",
        heading: "Test against the release calendar",
        body: [
          "Ariba's CI upgrades and quarterly releases change behaviour underneath your mappings. The estates that survive this share one habit: release notes are read by a named person, affected interfaces are regression-tested in the preview window, and the business hears about changes before they land.",
          "Integration is the fabric the whole estate hangs on. Treat it as a product with an owner and a maintenance budget, not as go-live plumbing.",
        ],
      },
    ],
    related: ["s4hana-migration-master-data-first", "spend-baseline-before-savings"],
  },
  {
    slug: "supplier-portals-build-or-configure",
    cover: {
      src: "/images/editorial/insight-supplier-portals.webp",
      alt: "Warehouse worker using a tablet at a counter beside steel lockers",
    },
    title: "Supplier portals: when to configure, when to build",
    excerpt:
      "Ariba already gives suppliers a network. A custom portal earns its cost only for journeys the platform does not serve well. Here is the honest decision frame.",
    category: "Software Engineering",
    date: "2026-01-22",
    author: { name: "Nexolve Technologies", role: "Delivery team" },
    sections: [
      {
        id: "the-wrong-default",
        heading: "The two wrong defaults",
        body: [
          "Default one: build a portal because the platform UI feels dated, then spend the budget re-implementing registration, onboarding and document exchange the platform already does. Default two: force every supplier journey through the network UI, including the ones it genuinely handles poorly — guided onboarding for low-digital-readiness suppliers, status visibility for logistics partners, brand-sensitive experiences.",
          "Both waste money. The question is not build or buy; it is which journeys justify custom software.",
        ],
      },
      {
        id: "the-decision-frame",
        heading: "A decision frame that holds",
        body: [
          "Configure when the journey maps to a platform capability: registration, sourcing events, PO flip, invoice status. The network already does these at scale, and your suppliers' other customers use the same flows.",
          "Build when the journey is yours alone: a branded onboarding experience for a fragmented supplier base, a status portal combining Ariba data with your logistics feeds, an internal intake tool shaped to your operating model. Custom software earns its cost when it combines platform APIs with context the platform does not have.",
        ],
      },
      {
        id: "build-on-the-apis",
        heading: "If you build, build on the APIs",
        body: [
          "A supplier portal should sit on top of the platform, never beside it. Ariba APIs carry the transaction; the portal carries the experience. That way the portal can be replaced, reskinned or extended without touching the system of record.",
          "And plan the support model before build starts: who owns the portal after go-live, under what service level, with what release discipline. An unmaintained portal is worse than none — suppliers remember the one that stopped working.",
        ],
      },
    ],
    related: ["guided-buying-easiest-route", "ariba-programmes-stall-after-stage-two"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category?: string): Post[] {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  if (!category) return sorted;
  return sorted.filter((p) => p.category === category);
}
