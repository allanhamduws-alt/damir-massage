import Link from "next/link";
import { readData } from "@/lib/store";
import { site } from "@/lib/seed";
import { 
  Calendar, Clock, MapPin, Phone, Mail, Award, CheckCircle, 
  Flame, Shield, Gift, GraduationCap 
} from "lucide-react";
import CertificateShowcase from "./components/certificate-showcase";
import HeroVideo from "./components/hero-video";

export default function Home() {
  const data = readData();
  const activeServices = data.services.filter((s) => s.active);

  // Recreated Certificates Data
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2B28] font-sans selection:bg-[#EFEBE4] selection:text-[#2D2B28]">
      
      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#B69668]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-[#B69668] tracking-wider leading-none font-semibold">Damir & Cagla</span>
            <span className="text-[10px] md:text-xs text-[#6E6A64] uppercase tracking-widest mt-1.5 font-medium">Massage-Praxis</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#6E6A64] font-semibold">
            <a href="#home" className="hover:text-[#B69668] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#B69668] transition-colors">Über uns</a>
            <a href="#certificates" className="hover:text-[#B69668] transition-colors">Qualifikationen</a>
            <a href="#treatments" className="hover:text-[#B69668] transition-colors">Behandlungen</a>
            <a href="#praxis" className="hover:text-[#B69668] transition-colors">Praxis</a>
            <a href="#contact" className="hover:text-[#B69668] transition-colors">Kontakt</a>
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

      {/* Hero Section with Looping Background Image-Video */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Local Video Background */}
        <div className="absolute inset-0 z-0">
          <HeroVideo />
          {/* Elegant warm light gradient mask */}
          <div className="absolute inset-0 video-mask z-10"></div>
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-[#FAF7F2]/5 mix-blend-multiply"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B69668]/8 border border-[#B69668]/20 rounded-full text-[10px] uppercase tracking-widest text-[#B69668] font-bold">
              <Flame className="w-3.5 h-3.5" /> Zertifizierte Wellnesspraxis in Garbsen
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2D2B28] leading-tight tracking-wide font-normal">
              Entdecken Sie <br />
              <span className="text-[#B69668] font-normal italic font-serif">Damir & Cagla's</span> <br />
              Massage-Praxis
            </h1>
            
            <p className="max-w-lg text-[#6E6A64] text-base md:text-lg leading-relaxed font-medium">
              Erleben Sie tiefe Entspannung, professionelle Schmerzlinderung und Regeneration in privater Wohlfühlatmosphäre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link 
                href="/booking" 
                className="bg-[#B69668] hover:bg-[#A08154] text-white font-bold py-4 px-8 rounded-sm text-center uppercase tracking-widest text-xs transition-all duration-300 shadow-xl shadow-[#B69668]/15 cursor-pointer"
              >
                Jetzt Termin Buchen
              </Link>
              <a 
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2D2B28]/15 hover:border-[#B69668] hover:text-[#B69668] text-[#2D2B28] font-semibold py-4 px-8 rounded-sm text-center uppercase tracking-widest text-xs transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-sm"
              >
                Frage stellen
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:flex justify-center relative animate-fade-in animate-delay-200">
            {/* Elegant Passepartout Frame for Hero Image */}
            <div className="gallery-frame p-3 bg-white w-80 h-96">
              <img 
                src="/images/tools.png" 
                alt="Massage Treatment Tools" 
                className="w-full h-full object-cover scale-100 hover:scale-102 transition-transform duration-700 rounded-sm" 
              />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-4 rounded shadow-lg flex items-center gap-3 border border-[#B69668]/20">
              <Award className="w-8 h-8 text-[#B69668]" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-widest text-[#6E6A64] font-bold leading-none">Zertifiziert</p>
                <p className="text-xs font-serif font-bold text-[#2D2B28] mt-1">Fachpraktiker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wer Ist Damir Section with REAL downloaded portrait headshot */}
      <section id="about" className="py-24 bg-[#F3EFE9] border-y border-[#B69668]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(182,150,104,0.03),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8 relative z-10">
          <div className="gallery-frame p-2 w-44 h-44 rounded-full overflow-hidden bg-white shadow-xl">
            <img 
              src="/images/damir.jpg" 
              alt="Damir Krasnic - Certified Specialist" 
              className="w-full h-full object-cover relative z-10 rounded-full" 
            />
          </div>
          
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Wer ist</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2B28] mt-2 mb-6 font-semibold">Damir Krasnic</h2>
            
            <p className="text-[#6E6A64] text-base md:text-lg leading-relaxed mb-6 font-medium">
              „Ich bin ein zertifizierter Fachpraktiker für Wellness und Massageprävention. Meine Expertise und Hingabe in der Massage ermöglichen es mir, meinen Kunden eine Vielzahl von Behandlungen anzubieten. Mit Herz und Leidenschaft widme ich mich meinen Behandlungen, um Ihnen eine erholsame Auszeit zu ermöglichen. Meine Massagen sind darauf ausgelegt, Verspannungen zu lösen, Stress abzubauen und Ihr körperliches Wohlbefinden zu steigern.“
            </p>
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#B69668]/15 rounded-sm shadow-sm">
              <CheckCircle className="w-5 h-5 text-[#B69668]" />
              <span className="text-[10px] uppercase tracking-widest text-[#2D2B28] font-bold">Zertifizierter Fachpraktiker für Massage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifikationen & Zertifikate (Animated visual grid) */}
      <section id="certificates" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B69668]/3 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
          <GraduationCap className="w-8 h-8 text-[#B69668] mx-auto mb-3" />
          <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Nachgewiesene Expertise</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2B28] mt-2 font-semibold">Unsere Zertifikate & Qualifikationen</h2>
          <div className="w-12 h-0.5 bg-[#B69668] mx-auto mt-4"></div>
          <p className="text-[#6E6A64] text-xs mt-3">
            Die Zertifikate werden unten automatisch eingeblendet und können durch Anklicken in gestochen scharfer Auflösung eingesehen werden.
          </p>
        </div>

        <div className="relative z-10">
          <CertificateShowcase certificates={certificates} />
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="py-24 max-w-6xl mx-auto px-6 border-t border-[#B69668]/15">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Unsere Leistungen</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2B28] mt-2 font-semibold">Professionelle Behandlungen</h2>
          <div className="w-12 h-0.5 bg-[#B69668] mx-auto mt-4"></div>
          <p className="text-[#6E6A64] text-sm mt-4 font-medium">
            Jede Anwendung wird individuell auf Ihre Bedürfnisse und Wünsche abgestimmt. Bezahlt wird unkompliziert vor Ort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeServices.map((service) => (
            <div 
              key={service.id} 
              className="spa-card p-6 sm:p-8 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#B69668] bg-[#B69668]/5 px-2 py-1 border border-[#B69668]/10 rounded-sm font-bold">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#2D2B28] mt-3 group-hover:text-[#B69668] transition-colors duration-300 font-semibold leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xl sm:text-2xl font-serif text-[#B69668] font-bold">{service.priceEuro} €</span>
                    <span className="text-xs text-[#6E6A64] flex items-center gap-1 mt-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {service.durationMinutes} Min.
                    </span>
                  </div>
                </div>
                
                <p className="text-[#6E6A64] text-sm leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#B69668]/10 pt-4 mt-auto">
                <span className="text-[10px] text-[#6E6A64] font-semibold uppercase tracking-wider">Zahlung vor Ort (Bar / Karte)</span>
                <Link 
                  href={`/booking?service=${service.id}`} 
                  className="bg-[#B69668]/10 hover:bg-[#B69668] text-[#B69668] hover:text-white border border-[#B69668]/20 font-bold py-2 px-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  Buchen
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Praxis / Philosophy Section */}
      <section id="praxis" className="py-24 bg-[#F3EFE9] border-y border-[#B69668]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(182,150,104,0.03),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="gallery-frame p-1 h-64 bg-white">
              <img 
                src="/images/hero.png" 
                alt="Massage Room Ambient" 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div className="gallery-frame p-1 h-64 bg-white mt-8">
              <img 
                src="/images/tools.png" 
                alt="Massage Oils & Cups" 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-start gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Unsere Praxis</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2B28] leading-tight font-semibold">
              Gleichberechtigte Räumlichkeiten für Männer & Frauen
            </h2>
            <div className="w-12 h-0.5 bg-[#B69668]"></div>
            
            <p className="text-[#6E6A64] text-base leading-relaxed font-medium">
              In unserer Praxis in Garbsen legen wir allergrößten Wert auf Diskretion, Komfort und eine absolut entspannende Atmosphäre. Wir bieten getrennte, geschützte Räumlichkeiten für Damen und Herren, sodass sich jeder Gast rundum geborgen und wohl fühlen kann.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B69668]/10 rounded-sm text-[#B69668]">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#2D2B28]">Volle Diskretion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B69668]/10 rounded-sm text-[#B69668]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#2D2B28]">Höchste Hygienestandards</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B69668]/10 rounded-sm text-[#B69668]">
                  <Gift className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#2D2B28]">Massagen als Gutschein</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B69668]/10 rounded-sm text-[#B69668]">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#2D2B28]">Wohltuendes Ambiente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Kontakt</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2B28] mt-2 font-semibold">Wir freuen uns auf Sie</h2>
              <div className="w-12 h-0.5 bg-[#B69668] mt-4"></div>
            </div>

            <div className="flex flex-col gap-6 text-[#6E6A64] font-medium">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#B69668] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D2B28] mb-1">Adresse</h4>
                  <p>Gerhart-Hauptmann-Straße 16</p>
                  <p>30826 Garbsen</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#B69668] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D2B28] mb-1">Telefon / WhatsApp</h4>
                  <p className="hover:text-[#B69668] transition-colors"><a href="tel:015734368721">0157 34368 721</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#B69668] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D2B28] mb-1">E-Mail</h4>
                  <p className="hover:text-[#B69668] transition-colors"><a href="mailto:damir-cagla@hotmail.de">damir-cagla@hotmail.de</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#B69668] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D2B28] mb-1">Termine</h4>
                  <p>Termine ausschließlich nach vorheriger Online-Buchung oder telefonischer Absprache.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-2">
              <a 
                href={site.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/15 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all font-semibold text-xs shadow-sm cursor-pointer"
              >
                WA
              </a>
              <a 
                href={site.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/15 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all font-semibold text-xs shadow-sm cursor-pointer"
              >
                FB
              </a>
              <a 
                href={site.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/15 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all font-semibold text-xs shadow-sm cursor-pointer"
              >
                IG
              </a>
              <a 
                href={site.tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/15 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all font-semibold text-xs shadow-sm cursor-pointer"
              >
                TK
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-96 lg:h-auto min-h-[350px] rounded-sm overflow-hidden border border-[#B69668]/15 relative shadow-xl bg-white p-1">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x47b073003051ad35%3A0xe1db6ce59820fcf2!2sGerhart-Hauptmann-Stra%C3%9Fe%2016%2C%2030826%20Garbsen!5m2!1sde!2sde"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.02) brightness(1.01)" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#E5DFC9] border-t border-[#B69668]/15 text-center text-xs text-[#6E6A64] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-medium">
          <p>© {new Date().getFullYear()} Damir & Cagla's Massagepraxis. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[9px] font-bold">
            <Link href="/admin" className="hover:text-[#B69668] transition-colors">Admin Login</Link>
            <a href="#home" className="hover:text-[#B69668] transition-colors">Nach oben</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
