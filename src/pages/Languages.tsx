import { lazy, Suspense, Component, ReactNode, useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import RegionDetails from "@/components/languages/RegionDetails"; // ← زدنا هادي

const RifMap = lazy(() => import("@/components/languages/RifMap"));

class MapErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[500px] w-full bg-red-50 rounded-xl flex flex-col items-center justify-center border border-red-200">
          <p className="text-red-600 font-bold text-lg">خطأ في تحميل الخريطة</p>
          <p className="text-red-500 text-sm mt-2">جرب تعمل ريفريش للصفحة</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const LanguagesPage = () => {
  // ← زدنا هادي: state باش نعرفو أشمن منطقة مختارة
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

              {/* النص: كياخد 2 من 5 */}
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-primary/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Linguistic Atlas · Rif
                </div>
                <h1 className="font-serif-display text-4xl md:text-6xl font-bold text-primary tracking-tight leading-[1.08]">
                 <span className="font-serif-display italic">Tribe by</span>{" "}
                 <span className="font-serif-display">Tribe.</span>
                 <br />
                  <span className="font-serif-display">
                    One map. Every dialect.
                  </span>
                 </h1>
                <p className="mt-6 text-lg text-slate-brand leading-relaxed max-w-xl">
                  A high-resolution interactive atlas of four distinct Riffian dialect zones, with detailed tribal-level insights. Click any region on the map to explore its linguistic profile.
                </p>
              </div>

              {/* الخريطة: كتاخد 3 من 5 */}
              <div className="order-1 lg:order-2 lg:col-span-3">
                <div className="glass-panel rounded-xl p-2 md:p-3 shadow-card-soft">
                  <div
                    className="w-full overflow-hidden ring-1 ring-border"
                    style={{ borderRadius: 12, height: "500px" }}
                  >
                    <MapErrorBoundary>
                      <Suspense fallback={
                        <div className="h-[500px] w-full bg-muted animate-pulse rounded-xl flex items-center justify-center">
                          <p>جاري تحميل الخريطة...</p>
                        </div>
                      }>
                        {/* ← زدنا onRegionClick هنا */}
                        <RifMap onRegionClick={setSelectedRegion} />
                      </Suspense>
                    </MapErrorBoundary>
                  </div>
                  <p className="mt-3 text-sm text-center text-slate-brand">
                    Click any region to explore · 4 major dialect zones mapped
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ← القسم الجديد: كيبان تحت الخريطة */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container">
            <RegionDetails selectedRegion={selectedRegion} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default LanguagesPage;