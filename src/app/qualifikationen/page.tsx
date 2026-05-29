import Link from "next/link";
import { Award, Shield, CheckCircle, GraduationCap, ChevronLeft, ArrowRight, Sparkles } from "lucide-react";
import CertificateShowcase from "../components/certificate-showcase";

export default function QualifikationenPage() {
  // Original Certificates Data
  const certificates = [
    {
      id: "fachpraktiker",
      title: "Geprüfter Fachpraktiker",
      subtitle: "für Massage, Wellness & Prävention",
      recipient: "Herr Damir Krasnic",
      date: "09.03.2023",
      issuer: "Wellness Heimstudium / WIP GmbH",
      accreditation: "TÜV-zertifizierte Bildungseinrichtung",
      inhalte: [
        "Grundlagen der Anatomie / Krankheitslehre",
        "Klassische Ganzkörpermassage",
        "Hot-Stone-Massage & Breuß-Massage",
        "Präventive Lymphdrainage",
        "Fußreflexzonenmassage",
        "Kräuterstempel-Massage & Mobile Massage",
        "Schröpfmassage & Shiatsu-Massage",
        "Existenzgründung, Marketing, Rechts- & Berufskunde"
      ],
      gold: true,
      image: "/images/cert_fachpraktiker.png"
    },
    {
      id: "fitness",
      title: "Professional Fitness Coach",
      subtitle: "A/B-Lizenz & Personal-Trainer (Medical Fitness)",
      recipient: "Herr Damir Krasnic",
      date: "22.03.2024",
      issuer: "WIP-Academy Berlin / WIP GmbH",
      accreditation: "Erfolgreich zertifiziertes WIP-Schulungszentrum",
      inhalte: [
        "Grundlagen Anatomie & Krankheitslehre",
        "Medizinisches Fitness- & Personal-Training",
        "Outdoor- & Functional-Training",
        "Cardio-Training & Stretching",
        "Sporternährung & Trainingsplanerstellung",
        "Anamnese, Check-up & Muskelfunktionstests",
        "SPA-Techniken, Marketing & Existenzgründung"
      ],
      gold: true,
      image: "/images/cert_fitness.png"
    },
    {
      id: "hijama",
      title: "Hijama Therapy",
      subtitle: "Zertifikat für traditionelle Schröpftherapie",
      recipient: "Damir Krasnic",
      date: "07.01.2023",
      issuer: "SENZOS UG (Traditional Medicine)",
      accreditation: "Zertifikats-Nr: HID20232548633",
      inhalte: [
        "Geschichte & Grundlagen der Hijama-Therapie",
        "Praktische Anwendung & Methodik des Schröpfens",
        "Hygienestandards & Kontraindikationen",
        "Traditionelle naturheilkundliche Praxis",
        "Betreuung & Nachsorge der Klienten"
      ],
      gold: false,
      image: "/images/cert_hijama.png"
    },
    {
      id: "baby",
      title: "Baby-Massage",
      subtitle: "Zertifikat für fachgerechte Säuglingsmassage",
      recipient: "Damir und Cagla Krasnic",
      date: "21.05.2023",
      issuer: "Wellness Heimstudium / WIP GmbH",
      accreditation: "Gemeinsame Ausbildung für Säuglingspflege & Wellness",
      inhalte: [
        "Geschichtliche Hintergründe der Babymassage",
        "Ausstattung & wohltuende Raumvorbereitung",
        "Lagerung & beruhigende Kontaktaufnahme",
        "Praktische Anwendung (Bauch- & Rückenlage)",
        "Abschluss und Integration in den Alltag"
      ],
      gold: false,
      image: "/images/cert_baby.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2B28] font-sans selection:bg-[#EFEBE4] selection:text-[#2D2B28] flex flex-col justify-between">
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#B69668]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-[#B69668] tracking-wider leading-none font-semibold">Damir & Cagla</span>
            <span className="text-[10px] md:text-xs text-[#6E6A64] uppercase tracking-widest mt-1.5 font-medium">Massage-Praxis</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#6E6A64] font-semibold">
            <Link href="/" className="hover:text-[#B69668] transition-colors">Startseite</Link>
            <Link href="/#about" className="hover:text-[#B69668] transition-colors">Über uns</Link>
            <Link href="/qualifikationen" className="text-[#B69668] transition-colors font-bold">Qualifikationen</Link>
            <Link href="/#treatments" className="hover:text-[#B69668] transition-colors">Behandlungen</Link>
            <Link href="/#praxis" className="hover:text-[#B69668] transition-colors">Praxis</Link>
            <Link href="/#contact" className="hover:text-[#B69668] transition-colors">Kontakt</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/booking" 
              className="bg-[#B69668] hover:bg-[#A08154] text-white font-bold py-2.5 px-5 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 shadow-md shadow-[#B69668]/10 cursor-pointer"
            >
              Termin Buchen
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-16">
        
        {/* Breadcrumbs & Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#6E6A64] hover:text-[#B69668] font-semibold uppercase tracking-widest transition-colors">
            <ChevronLeft className="w-4 h-4" /> Zurück zur Startseite
          </Link>
        </div>

        {/* Hero-like Title Section */}
        <div className="max-w-2xl mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B69668]/10 border border-[#B69668]/20 rounded-full text-[9px] uppercase tracking-widest text-[#B69668] font-bold mb-4">
            <Shield className="w-3.5 h-3.5" /> Offiziell verifiziert & zertifiziert
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2D2B28] leading-tight tracking-wide font-normal">
            Fachausbildungen & <br />
            <span className="text-[#B69668] italic font-normal font-serif">Qualifikations-Urkunden</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#B69668] my-6"></div>
          <p className="text-[#6E6A64] text-base leading-relaxed font-medium">
            Um Ihnen höchste Qualität, Sicherheit und physiologisch fundierte Behandlungen zu garantieren, bilden wir uns kontinuierlich in staatlich und TÜV-zertifizierten Instituten weiter. Entdecken Sie unsere echten, hochauflösenden Urkunden und Ausbildungsinhalte.
          </p>
        </div>

        {/* Staggered Portfolio Showcase */}
        <div className="mb-24">
          <CertificateShowcase certificates={certificates} />
        </div>

        {/* Detailed Breakdown Sektion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#B69668]/15 pt-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Qualitätssicherung</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2B28] font-semibold">TÜV-Zertifizierte Ausbildung</h2>
            <p className="text-[#6E6A64] text-sm leading-relaxed font-medium">
              Die Ausbildung zum Geprüften Fachpraktiker für Massage, Wellness und Prävention erfolgte an der renommierten *WIP GmbH / Wellness Heimstudium*, einer nach AZAV durch den TÜV-zertifizierten Bildungseinrichtung. 
            </p>
            <p className="text-[#6E6A64] text-sm leading-relaxed font-medium">
              Dies stellt sicher, dass alle erlernten Techniken – von der Klassischen Ganzkörpermassage über Hot Stone bis hin zur Präventiven Lymphdrainage – nach höchsten methodischen und physiologischen Standards erlernt und geprüft wurden.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Naturheilkunde & Prävention</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2B28] font-semibold">Therapeutischer Hintergrund</h2>
            <p className="text-[#6E6A64] text-sm leading-relaxed font-medium">
              Zusätzlich zu den klassischen Wellness-Techniken umfasst unser Portfolio fundiertes Wissen in der traditionellen Schröpftherapie (Hijama Therapy, lizenziert durch die SENZOS Traditional Medicine Academy) und im medizinischen Fitnesstraining (Personal Trainer A/B-Lizenz).
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B69668] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#6E6A64]">TÜV-Verifiziertes Ausbildungszentrum</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B69668] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#6E6A64]">Traditionelle Schröpf-Fachkunde</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B69668] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#6E6A64]">Medizinisches Personal Training</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B69668] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#6E6A64]">Hygiene- & Kontraindikations-Lehre</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-24 p-8 sm:p-12 bg-white border border-[#B69668]/20 rounded-sm text-center relative overflow-hidden shadow-premium">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 bg-[#B69668]/5 rounded-full pointer-events-none"></div>
          <Sparkles className="w-8 h-8 text-[#B69668] mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2B28] mb-4 font-semibold">Erleben Sie zertifizierte Qualität selbst</h2>
          <p className="text-[#6E6A64] text-sm max-w-md mx-auto mb-8 font-medium">
            Lassen Sie sich fachgerecht, diskret und vollkommen entspannt behandeln. Buchen Sie jetzt Ihren persönlichen Wunschtermin vor Ort in Garbsen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/booking" 
              className="bg-[#B69668] hover:bg-[#A08154] text-white font-bold py-3.5 px-8 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 shadow-md shadow-[#B69668]/15 cursor-pointer w-full sm:w-auto"
            >
              Termin online buchen
            </Link>
            <Link 
              href="/" 
              className="border border-[#2D2B28]/15 hover:border-[#B69668] hover:text-[#B69668] text-[#2D2B28] font-bold py-3.5 px-8 rounded-sm text-xs uppercase tracking-widest transition-all bg-white shadow-sm w-full sm:w-auto"
            >
              Zurück zur Übersicht
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#E5DFC9] border-t border-[#B69668]/15 text-center text-xs text-[#6E6A64] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-medium">
          <p>© {new Date().getFullYear()} Damir & Cagla's Massagepraxis. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[9px] font-bold">
            <Link href="/admin" className="hover:text-[#B69668] transition-colors">Admin Login</Link>
            <Link href="/" className="hover:text-[#B69668] transition-colors">Zurück Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
