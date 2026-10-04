import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

/* ─── Shared typographic styles ─────────────────────────────── */
const paragraph =
  "mt-5 text-[15px] leading-[1.75] text-[#0a0a0a]/75 md:text-base";
const lead =
  "mt-6 text-base leading-[1.75] text-[#0a0a0a]/80 md:text-[17px]";
const bulletList =
  "mt-4 list-disc space-y-2.5 border-l border-[#0a0a0a]/15 pl-6 text-[15px] leading-[1.7] text-[#0a0a0a]/75 md:text-base marker:text-[#0a0a0a]/40";

/* ─── Document metadata ─────────────────────────────────────── */
const metaRows = [
  { label: "Document", value: "Executive Overview" },
  { label: "Company", value: "RifData" },
  { label: "Subject", value: "Tarifit (Riffian) linguistic resources" },
  { label: "Date", value: "September 2026" },
  { label: "Status", value: "Current version" },
];

/* ─── Contents ──────────────────────────────────────────────── */
const contents = [
  { number: "1", title: "Our Vision", anchor: "sec-vision" },
  { number: "2", title: "Our Mission", anchor: "sec-mission" },
  { number: "3", title: "What Does RifData Provide?", anchor: "sec-provide" },
  {
    number: "4",
    title: "RifData Products and Solutions",
    anchor: "sec-products",
    children: [
      { title: "Product Tiers", anchor: "sec-tiers" },
      { title: "Dialectal Packages", anchor: "sec-dialectal" },
      { title: "Custom Solutions", anchor: "sec-custom" },
    ],
  },
  {
    number: "5",
    title: "Why RifData?",
    anchor: "sec-why",
    children: [
      { title: "What Sets RifData Apart?", anchor: "sec-apart" },
      { title: "Who We Serve", anchor: "sec-serve" },
      { title: "Our Commitment", anchor: "sec-commitment" },
    ],
  },
  {
    number: "6",
    title: "How We Work With Our Customers",
    anchor: "sec-customers",
    children: [
      { title: "Understanding Project Requirements", anchor: "sec-requirements" },
      { title: "Resource Development", anchor: "sec-development" },
      { title: "Delivery and Support", anchor: "sec-delivery" },
      { title: "Long-Term Partnerships", anchor: "sec-partnerships" },
    ],
  },
];

/* ─── Building blocks ───────────────────────────────────────── */
const Sheet = ({
  page,
  children,
}: {
  page: number;
  children: React.ReactNode;
}) => (
  <section className="relative w-full bg-white px-6 py-10 shadow-[0_1px_2px_rgba(10,10,10,0.10),0_18px_44px_-14px_rgba(10,10,10,0.20)] ring-1 ring-[#0a0a0a]/[0.05] sm:px-10 md:px-14 md:py-14">
    {children}
    <footer className="mt-12 border-t border-[#0a0a0a]/10 pt-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#0a0a0a]/40">
      Page {page} of 4
    </footer>
  </section>
);

const SectionHeading = ({
  id,
  number,
  title,
  first = false,
}: {
  id: string;
  number: string;
  title: string;
  first?: boolean;
}) => (
  <div
    id={id}
    className={`scroll-mt-28 pt-8 ${first ? "" : "mt-16 border-t border-[#0a0a0a]/15"}`}
  >
    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0a0a0a]/40">
      Section {number}
    </p>
    <h2 className="mt-3 font-serif-display text-2xl leading-tight tracking-[-0.02em] text-[#0a0a0a] md:text-[32px]">
      {title}
    </h2>
  </div>
);

const SubHeading = ({
  id,
  number,
  title,
  first = false,
}: {
  id: string;
  number: string;
  title: string;
  first?: boolean;
}) => (
  <h3
    id={id}
    className={`scroll-mt-28 font-serif-display text-xl leading-snug tracking-[-0.01em] text-[#0a0a0a] md:text-[22px] ${
      first ? "mt-10" : "mt-12 border-t border-[#0a0a0a]/10 pt-7"
    }`}
  >
    <span className="mr-3 font-mono text-[11px] font-normal tracking-[0.18em] text-[#0a0a0a]/40">
      {number}
    </span>
    {title}
  </h3>
);

const Tier = ({
  n,
  name,
  children,
}: {
  n: string;
  name: string;
  children: React.ReactNode;
}) => (
  <div className="mt-8 border-l-2 border-[#0a0a0a]/15 pl-5 md:pl-6">
    <h4 className="font-serif-display text-lg leading-snug text-[#0a0a0a] md:text-xl">
      <span className="mr-2.5 font-mono text-[11px] font-normal tracking-[0.18em] text-[#0a0a0a]/40">
        {n}
      </span>
      {name}
    </h4>
    <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-[#0a0a0a]/75 md:text-base">
      {children}
    </div>
  </div>
);

/* ─── Page ──────────────────────────────────────────────────── */
const ExecutiveOverview = () => (
  <div className="min-h-screen bg-[#e8e4db] text-[#0a0a0a]">
    <Header />
    <div className="px-3 py-10 sm:px-6 md:py-16">
      <main className="mx-auto flex w-full max-w-[880px] flex-col gap-6 md:gap-8">

        {/* ════════════════════════ PAGE 1 ════════════════════════ */}
        <Sheet page={1}>
          {/* Document meta */}
          <div className="border border-[#0a0a0a]/15">
            {metaRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] ${
                  index > 0 ? "border-t border-[#0a0a0a]/15" : ""
                }`}
              >
                <div className="border-r border-[#0a0a0a]/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/50 sm:px-5">
                  {row.label}
                </div>
                <div className="px-4 py-3 text-sm text-[#0a0a0a]/80 sm:px-5">
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          {/* Title */}
          <header className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0a0a0a]/40">
              RifData · Corporate Document
            </p>
            <h1 className="mt-4 font-serif-display text-[34px] leading-[1.05] tracking-[-0.02em] text-[#0a0a0a] md:text-5xl">
              Executive Overview of RifData
            </h1>
          </header>

          <p className={lead}>
            RifData is a specialized linguistic data company focused on
            producing high-quality digital language resources for Tarifit
            (Riffian). The project is designed to provide AI companies,
            universities, research institutions, and technology organizations
            with reliable, structured, and production-ready linguistic data for
            the development of modern language technologies.
          </p>
          <p className={paragraph}>
            RifData follows a standardized production methodology covering the
            full data lifecycle, from collecting original speech
            recordings—either produced by the RifData team or acquired from
            trusted partners under defined quality standards—to transcription,
            linguistic review, and the addition of morphological, syntactic,
            semantic, cultural, and other advanced annotation layers.
          </p>
          <p className={paragraph}>
            The final resources are delivered in structured technical formats
            designed for integration into artificial intelligence systems,
            research environments, and language technology applications.
          </p>

          {/* Contents */}
          <nav
            className="mt-12 border border-[#0a0a0a]/15"
            aria-label="Document contents"
          >
            <p className="border-b border-[#0a0a0a]/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/50">
              Contents
            </p>
            <ol>
              {contents.map((item, index) => (
                <li key={item.anchor}>
                  <a
                    href={`#${item.anchor}`}
                    className={`group flex items-baseline gap-4 px-5 py-2.5 transition-colors hover:bg-[#0a0a0a]/[0.03] ${
                      index > 0 ? "border-t border-[#0a0a0a]/10" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-[#0a0a0a]/45">
                      {item.number}
                    </span>
                    <span className="text-sm text-[#0a0a0a]/80 group-hover:text-[#0a0a0a]">
                      {item.title}
                    </span>
                  </a>
                  {item.children && (
                    <ul className="border-t border-[#0a0a0a]/10">
                      {item.children.map((child) => (
                        <li key={child.anchor}>
                          <a
                            href={`#${child.anchor}`}
                            className="group flex items-baseline gap-4 px-5 py-2 pl-12 transition-colors hover:bg-[#0a0a0a]/[0.03]"
                          >
                            <span className="font-mono text-xs text-[#0a0a0a]/30">
                              —
                            </span>
                            <span className="text-[13px] text-[#0a0a0a]/65 group-hover:text-[#0a0a0a]">
                              {child.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Our Vision */}
          <SectionHeading id="sec-vision" number="1" title="Our Vision" />
          <p className={paragraph}>
            RifData aims to build a leading digital infrastructure and reference
            resource for Tarifit, while contributing to its representation in
            modern artificial intelligence and natural language processing
            technologies.
          </p>
          <p className={paragraph}>
            Our vision is to ensure that Tarifit is represented accurately and
            systematically within global language technologies, while helping
            address the significant shortage of high-quality digital resources
            available for the language.
          </p>
          <p className={paragraph}>
            Compared with many better-resourced languages, Tarifit has a limited
            presence in publicly available digital datasets, which contributes
            to its underrepresentation across many modern language technologies
            and AI systems.
          </p>

          {/* 2. Our Mission */}
          <SectionHeading id="sec-mission" number="2" title="Our Mission" />
          <p className={paragraph}>
            The mission of RifData is to produce high-quality linguistic
            resources according to consistent professional standards, while
            maintaining scientific accuracy, rigorous quality assurance, privacy
            protection, and respect for intellectual property.
          </p>
          <p className={paragraph}>
            Our resources are designed to meet the needs of organizations
            working in artificial intelligence, language technology, speech
            technology, and academic research.
          </p>

          {/* 3. What Does RifData Provide? */}
          <SectionHeading
            id="sec-provide"
            number="3"
            title="What Does RifData Provide?"
          />
          <p className={paragraph}>
            RifData provides a comprehensive range of specialized linguistic
            resources, including:
          </p>
          <ul className={bulletList}>
            <li>High-quality speech recordings.</li>
            <li>
              Professionally transcribed text based on standardized
              transcription practices.
            </li>
            <li>Structured metadata.</li>
            <li>Structured JSON files.</li>
            <li>
              Morphological, syntactic, semantic, and cultural annotation
              layers.
            </li>
            <li>
              Customizable datasets tailored to specific customer requirements.
            </li>
          </ul>
          <p className={paragraph}>
            RifData is more than a data provider. We aim to serve as a
            specialized technology partner, delivering reliable linguistic
            resources that help organizations build more accurate AI solutions
            and enable language models to understand and process Tarifit in
            ways that more closely reflect its real-world use by native
            speakers.
          </p>
        </Sheet>

        {/* ════════════════════════ PAGE 2 ════════════════════════ */}
        <Sheet page={2}>
          {/* 4. RifData Products and Solutions */}
          <SectionHeading
            id="sec-products"
            number="4"
            title="RifData Products and Solutions"
            first
          />
          <p className={lead}>
            RifData offers a comprehensive portfolio of linguistic products
            designed to support organizations working in artificial
            intelligence, natural language processing, automatic speech
            recognition, and academic research.
          </p>
          <p className={paragraph}>
            Our products are structured to accommodate different project
            requirements, ranging from high-quality speech datasets to highly
            enriched, multilayer linguistic resources designed for advanced AI
            and research applications.
          </p>

          {/* 4.1 Product Tiers */}
          <SubHeading id="sec-tiers" number="4.1" title="Product Tiers" first />
          <p className={paragraph}>
            RifData offers three primary tiers of linguistic resources,
            differentiated by their level of linguistic processing, knowledge
            enrichment, and pricing model.
          </p>

          <Tier n="1" name="ASR Datasets">
            <p>
              Speech datasets designed for the development and training of
              Automatic Speech Recognition (ASR) systems.
            </p>
            <p>
              These datasets include high-quality speech recordings accompanied
              by corresponding transcriptions and are priced based on the number
              of hours of data produced or required.
            </p>
          </Tier>

          <Tier n="2" name="Standard Tier Dataset">
            <p>
              Structured linguistic resources representing the standard level of
              production offered by RifData.
            </p>
            <p>
              These datasets provide a solid level of linguistic processing and
              are suitable for a wide range of AI and language technology
              applications.
            </p>
            <p>
              Pricing is based on the number of hours of data produced or
              required.
            </p>
          </Tier>

          <Tier n="3" name="Gold Tier Dataset">
            <p>
              The Gold Tier Dataset represents the highest level of linguistic
              resources produced by RifData.
            </p>
            <p>
              It incorporates the full set of approved linguistic and
              knowledge-based annotation layers defined within the project,
              providing organizations with a highly enriched and rigorously
              structured resource for applications requiring the highest levels
              of quality, accuracy, and linguistic depth.
            </p>
            <p>
              Gold Tier resources are priced per file or dataset, based on the
              agreed scope of work and project requirements.
            </p>
          </Tier>

          {/* 4.2 Dialectal Packages */}
          <SubHeading
            id="sec-dialectal"
            number="4.2"
            title="Dialectal Packages"
          />
          <p className={paragraph}>
            RifData offers its resources through independent packages covering
            major regional varieties of Tarifit, including:
          </p>
          <ul className={bulletList}>
            <li>Central Rif package.</li>
            <li>Eastern Rif package.</li>
            <li>Western Rif package.</li>
            <li>Beni Znassen package.</li>
          </ul>
          <p className={paragraph}>
            Customers may purchase individual packages or combine multiple
            regional packages within a single project, depending on their
            technical requirements and intended applications.
          </p>

          {/* 4.3 Custom Solutions */}
          <SubHeading id="sec-custom" number="4.3" title="Custom Solutions" />
          <p className={paragraph}>
            In addition to its standard products, RifData provides customized
            linguistic data solutions tailored to individual customer
            requirements.
          </p>
          <p className={paragraph}>
            Customization may include the type of data, required fields, level
            of linguistic enrichment, dataset size, technical specifications,
            delivery format, and other project-specific requirements.
          </p>
          <p className={paragraph}>
            This approach enables organizations to obtain resources that align
            closely with their technical, research, and operational objectives.
          </p>
          <p className={paragraph}>
            RifData provides an integrated portfolio of linguistic products and
            services, giving customers the flexibility to choose the appropriate
            resource type, quality tier, regional package, and level of
            customization for both their current projects and future
            requirements.
          </p>
        </Sheet>

        {/* ════════════════════════ PAGE 3 ════════════════════════ */}
        <Sheet page={3}>
          {/* 5. Why RifData? */}
          <SectionHeading id="sec-why" number="5" title="Why RifData?" first />
          <p className={lead}>
            Artificial intelligence applications are increasingly dependent on
            high-quality linguistic data. Yet many languages with limited
            digital representation—including Tarifit (Riffian)—continue to face
            a significant shortage of structured, reliable, and AI-ready
            linguistic resources.
          </p>
          <p className={paragraph}>
            RifData was established to address this gap by producing reliable
            linguistic resources based on scientific and technical standards,
            serving organizations working across artificial intelligence,
            language technology, and academic research.
          </p>

          {/* 5.1 What Sets RifData Apart? */}
          <SubHeading
            id="sec-apart"
            number="5.1"
            title="What Sets RifData Apart?"
            first
          />
          <p className={paragraph}>
            RifData is built around a specialized model focused exclusively on
            developing linguistic resources for Tarifit. This specialization
            enables us to tailor data collection, production, review, and
            linguistic analysis to the specific characteristics and requirements
            of the language.
          </p>
          <p className={paragraph}>Our key strengths include:</p>
          <ul className="mt-4 list-disc space-y-3.5 border-l border-[#0a0a0a]/15 pl-6 text-[15px] leading-[1.7] text-[#0a0a0a]/75 md:text-base marker:text-[#0a0a0a]/40">
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                Dedicated specialization in Tarifit:
              </strong>{" "}
              Rather than spreading our efforts across dozens of languages, we
              focus on developing deep expertise in Tarifit and producing
              resources specifically designed for its linguistic
              characteristics.
            </li>
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                A standardized production methodology:
              </strong>{" "}
              Our methodology covers the complete data production lifecycle,
              from speech collection through transcription, annotation, quality
              assurance, and final delivery.
            </li>
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                Deep knowledge of regional varieties:
              </strong>{" "}
              Our approach accounts for phonological, morphological, syntactic,
              semantic, and cultural variation across Tarifit-speaking regions,
              helping ensure that our resources reflect authentic language use.
            </li>
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                Advanced linguistic and knowledge enrichment:
              </strong>{" "}
              Our resources can extend well beyond conventional transcription
              to include morphological, syntactic, semantic, cultural, and
              reasoning-oriented layers, together with additional layers
              required by a particular project or requested by a customer. This
              transforms raw data into high-value linguistic resources suitable
              for advanced AI applications.
            </li>
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                Flexible dataset development:
              </strong>{" "}
              Customers can request datasets tailored to their specific
              requirements, including dataset size, data type, linguistic
              processing level, technical format, and other specifications.
            </li>
            <li>
              <strong className="font-semibold text-[#0a0a0a]">
                An integrated operational and legal framework:
              </strong>{" "}
              Our work is supported by production standards, privacy policies,
              licensing agreements, and other organizational frameworks designed
              to strengthen customer confidence in the quality, governance, and
              long-term sustainability of the project.
            </li>
          </ul>

          {/* 5.2 Who We Serve */}
          <SubHeading id="sec-serve" number="5.2" title="Who We Serve" />
          <p className={paragraph}>
            RifData is designed to serve a broad range of organizations,
            including:
          </p>
          <ul className={bulletList}>
            <li>Artificial intelligence companies.</li>
            <li>Developers of large language models (LLMs).</li>
            <li>Natural language processing (NLP) companies.</li>
            <li>Universities and academic institutions.</li>
            <li>Research centers.</li>
            <li>Technology laboratories.</li>
            <li>
              Organizations involved in language preservation and digital
              documentation.
            </li>
          </ul>

          {/* 5.3 Our Commitment */}
          <SubHeading
            id="sec-commitment"
            number="5.3"
            title="Our Commitment"
          />
          <p className={paragraph}>
            Our commitment extends beyond supplying data. RifData aims to build
            long-term professional relationships with customers based on
            quality, transparency, technical consistency, and adherence to
            agreed specifications.
          </p>
          <p className={paragraph}>
            We strive to provide linguistic resources that organizations can
            rely on across both research and commercial applications.
          </p>
          <p className={paragraph}>
            RifData is a specialized linguistic data partner combining
            linguistic expertise, technical organization, and professional
            standards to deliver reliable resources that support the next
            generation of AI technologies for Tarifit.
          </p>
        </Sheet>

        {/* ════════════════════════ PAGE 4 ════════════════════════ */}
        <Sheet page={4}>
          {/* 6. How We Work With Our Customers */}
          <SectionHeading
            id="sec-customers"
            number="6"
            title="How We Work With Our Customers"
            first
          />
          <p className={lead}>
            At RifData, we believe that the success of a linguistic data project
            depends not only on the quality of the data, but also on
            understanding the customer's requirements and translating them into
            resources designed to achieve specific technical and research
            objectives.
          </p>
          <p className={paragraph}>
            For this reason, we follow a flexible collaboration model that
            enables us to develop solutions tailored to each project rather than
            simply providing off-the-shelf datasets.
          </p>

          {/* 6.1 Understanding Project Requirements */}
          <SubHeading
            id="sec-requirements"
            number="6.1"
            title="Understanding Project Requirements"
            first
          />
          <p className={paragraph}>
            Every engagement begins with an assessment of the customer's
            requirements, which may include:
          </p>
          <ul className={bulletList}>
            <li>The type of linguistic resources required.</li>
            <li>Target dataset size.</li>
            <li>Required regional varieties or linguistic domains.</li>
            <li>
              Required level of linguistic processing and annotation.
            </li>
            <li>Technical formats and delivery requirements.</li>
          </ul>
          <p className={paragraph}>
            This allows RifData to develop a production plan tailored to the
            specific needs of each project.
          </p>

          {/* 6.2 Resource Development */}
          <SubHeading
            id="sec-development"
            number="6.2"
            title="Resource Development"
          />
          <p className={paragraph}>
            Once the specifications have been agreed upon, the RifData team
            begins production according to the project's established
            methodology.
          </p>
          <p className={paragraph}>
            All stages of the process are carried out with defined quality
            assurance, review, and documentation procedures.
          </p>
          <p className={paragraph}>
            Each project is delivered according to an agreed scope, timeline,
            and set of technical specifications established with the customer in
            advance.
          </p>

          {/* 6.3 Delivery and Support */}
          <SubHeading
            id="sec-delivery"
            number="6.3"
            title="Delivery and Support"
          />
          <p className={paragraph}>
            Our relationship with customers does not necessarily end when the
            dataset is delivered.
          </p>
          <p className={paragraph}>
            RifData provides support for questions relating to delivered
            resources and can clarify their structure, components, metadata, and
            technical organization to facilitate integration into development
            environments or model-training pipelines.
          </p>
          <p className={paragraph}>
            Where required, we can also support future updates, expansions, or
            additional data production as customer requirements evolve.
          </p>

          {/* 6.4 Long-Term Partnerships */}
          <SubHeading
            id="sec-partnerships"
            number="6.4"
            title="Long-Term Partnerships"
          />
          <p className={paragraph}>
            RifData seeks to build lasting professional relationships with its
            customers based on trust, transparency, quality, and continuous
            improvement.
          </p>
          <p className={paragraph}>
            Our objective is not simply to complete a single data project, but
            to become a specialized linguistic data partner that organizations
            can rely on for the long-term development of high-quality Tarifit
            resources.
          </p>
          <p className={paragraph}>
            RifData is not focused solely on selling data. We aim to build
            strategic partnerships that give organizations access to reliable,
            scalable linguistic resources designed around their technical and
            research objectives.
          </p>

          {/* End of document */}
          <div className="mt-14 border-t border-[#0a0a0a]/15 pt-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0a0a0a]/40">
              — End of document —
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#0a0a0a]/45">
              RifData · Executive Overview · September 2026
            </p>
          </div>
        </Sheet>
      </main>
    </div>
    <Footer />
  </div>
);

export default ExecutiveOverview;
