export const AboutStory = () => {
  const pillars = [
    {
      id: "01",
      title: "Expert linguistic auditing",
      description:
        "Every dataset passes through a multi-layer audit chain — native L1 reviewers, IPA-level phonetic verification, and senior linguists certifying schema, dialect, and provenance before delivery.",
    },
    {
      id: "02",
      title: "Cultural immersion",
      description:
        "We do not extract data; we live it. Our teams are embedded in the regions they document, ensuring every transcription respects the social, religious, and historical context behind the words.",
    },
    {
      id: "03",
      title: "High-fidelity collection",
      description:
        "Studio-grade capture, controlled acoustics, and rigorous metadata. Our pipelines are engineered to meet the most demanding fine-tuning and ASR benchmarks of frontier AI labs.",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#f5f1ea]">
      <div className="container">
        
        {/* الجزء 1: العنوان الرئيسي */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-6">
              THE RIFDATA CONSTITUTION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Three pillars.
              <br />
              <span className="text-slate-700">One standard for</span>
              <br />
              <span className="text-slate-700">serious AI.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 pt-4 lg:pt-8">
            <p className="text-lg text-slate-600 leading-relaxed">
              We exist to deliver the most accurate, ethical, and culturally-grounded speech 
              datasets for the world's most demanding AI teams. These are the principles every 
              dataset we ship is measured against.
            </p>
          </div>
        </div>

        {/* الجزء 2: 3 الأعمدة */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-8 rounded-2xl bg-[#ece8e0]"
            >
              <span className="text-xs font-mono text-slate-400">{pillar.id}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};