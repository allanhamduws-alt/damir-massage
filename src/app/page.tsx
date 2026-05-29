import Link from "next/link";
import { readData } from "@/lib/store";
import { site } from "@/lib/seed";
import { 
  Calendar, Clock, MapPin, Phone, Mail, Award, CheckCircle, 
  Flame, Shield, Gift, GraduationCap 
} from "lucide-react";
import CertificateShowcase from "./components/certificate-showcase";

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
      gold: true
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
      gold: true
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
      gold: false
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
      gold: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#12110F] text-[#F4F1EA] font-sans selection:bg-[#C5A880] selection:text-[#12110F]">
      
      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-[#12110F]/85 backdrop-blur-md border-b border-[#C5A880]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-[#C5A880] tracking-wider leading-none">Damir & Cagla</span>
            <span className="text-[10px] md:text-xs text-[#A8A398] uppercase tracking-widest mt-1">Massage-Praxis</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider text-[#A8A398]">
            <a href="#home" className="hover:text-[#C5A880] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#C5A880] transition-colors">Über uns</a>
            <a href="#certificates" className="hover:text-[#C5A880] transition-colors">Qualifikationen</a>
            <a href="#treatments" className="hover:text-[#C5A880] transition-colors">Behandlungen</a>
            <a href="#praxis" className="hover:text-[#C5A880] transition-colors">Praxis</a>
            <a href="#contact" className="hover:text-[#C5A880] transition-colors">Kontakt</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/booking" 
              className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2.5 px-5 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C5A880]/10"
            >
              Termin Buchen
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Looping Background Image-Video */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Silent Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105"
            poster="/images/hero.png"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-massage-therapist-massaging-a-client-41908-large.mp4" type="video/mp4" />
          </video>
          {/* Subtle amber & dark mask overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12110F] via-[#12110F]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-[#12110F]/45 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110F] via-transparent to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-full text-xs uppercase tracking-widest text-[#C5A880]">
              <Flame className="w-3.5 h-3.5" /> Zertifizierte Wellnesspraxis in Garbsen
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F1EA] leading-tight tracking-wide">
              Entdecken Sie <br />
              <span className="text-[#C5A880] font-normal italic">Damir & Cagla's</span> <br />
              Massage-Praxis
            </h1>
            
            <p className="max-w-lg text-[#A8A398] text-base md:text-lg leading-relaxed">
              Erleben Sie tiefe Entspannung, professionelle Schmerzlinderung und Regeneration in privater Wohlfühlatmosphäre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link 
                href="/booking" 
                className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-4 px-8 rounded-sm text-center uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#C5A880]/10"
              >
                Jetzt Termin Buchen
              </Link>
              <a 
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#F4F1EA]/25 hover:border-[#C5A880] hover:text-[#C5A880] text-[#F4F1EA] font-semibold py-4 px-8 rounded-sm text-center uppercase tracking-wider transition-colors duration-300 bg-white/5 backdrop-blur-sm"
              >
                Frage stellen
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:flex justify-center relative animate-fade-in animate-delay-1">
            <div className="relative w-80 h-96 rounded-full overflow-hidden border-2 border-[#C5A880]/30 shadow-2xl">
              <div className="absolute inset-0 bg-[#C5A880]/5 z-10"></div>
              <img 
                src="/images/tools.png" 
                alt="Massage Treatment Tools" 
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700" 
              />
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-panel p-4 rounded-lg flex items-center gap-3 border border-[#C5A880]/20">
              <Award className="w-8 h-8 text-[#C5A880]" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-[#A8A398] leading-none">Zertifiziert</p>
                <p className="text-sm font-semibold mt-1">Fachpraktiker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wer Ist Damir Section with Real Portrait Headshot */}
      <section id="about" className="py-24 bg-[#1A1816] border-y border-[#C5A880]/10">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[#C5A880]/40 shadow-2xl">
            <img 
              src="/images/damir.png" 
              alt="Damir Krasnic - Certified Specialist" 
              className="w-full h-full object-cover relative z-10" 
            />
          </div>
          
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Wer ist</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4F1EA] mt-2 mb-6">Damir Krasnic</h2>
            
            <p className="text-[#A8A398] text-base md:text-lg leading-relaxed mb-6">
              „Ich bin ein zertifizierter Fachpraktiker für Wellness und Massageprävention. Meine Expertise und Hingabe in der Massage ermöglichen es mir, meinen Kunden eine Vielzahl von Behandlungen anzubieten. Mit Herz und Leidenschaft widme ich mich meinen Behandlungen, um Ihnen eine erholsame Auszeit zu ermöglichen. Meine Massagen sind darauf ausgelegt, Verspannungen zu lösen, Stress abzubauen und Ihr körperliches Wohlbefinden zu steigern.“
            </p>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#12110F] border border-[#C5A880]/15 rounded-sm">
              <CheckCircle className="w-5 h-5 text-[#C5A880]" />
              <span className="text-sm uppercase tracking-wider text-[#F4F1EA]">Zertifizierter Fachpraktiker für Massage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifikationen & Zertifikate (Interactive split pane CertificateShowcase) */}
      <section id="certificates" className="py-24 max-w-6xl mx-auto px-6 relative">
        {/* Soft elegant background radial-glow to lighten up the darkness */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A880]/3 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
          <GraduationCap className="w-8 h-8 text-[#C5A880] mx-auto mb-3" />
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Nachgewiesene Expertise</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] mt-2">Unsere Zertifikate & Qualifikationen</h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4"></div>
        </div>

        <div className="relative z-10">
          <CertificateShowcase certificates={certificates} />
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="py-24 max-w-6xl mx-auto px-6 border-t border-[#C5A880]/10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Unsere Leistungen</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] mt-2">Professionelle Behandlungen</h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4"></div>
          <p className="text-[#A8A398] text-sm mt-4">
            Jede Anwendung wird individuell auf Ihre Bedürfnisse und Wünsche abgestimmt. Bezahlt wird unkompliziert vor Ort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeServices.map((service) => (
            <div 
              key={service.id} 
              className="glass-panel p-6 sm:p-8 rounded-sm flex flex-col justify-between hover:border-[#C5A880]/40 transition-all duration-300 gold-border-glow group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] bg-[#C5A880]/5 px-2 py-0.5 border border-[#C5A880]/10 rounded-sm">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] mt-2 group-hover:text-[#C5A880] transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xl sm:text-2xl font-serif text-[#C5A880]">{service.priceEuro} €</span>
                    <span className="text-xs text-[#A8A398] flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {service.durationMinutes} Min.
                    </span>
                  </div>
                </div>
                
                <p className="text-[#A8A398] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#C5A880]/10 pt-4 mt-auto">
                <span className="text-xs text-[#A8A398]">Zahlung vor Ort (Bar / Karte)</span>
                <Link 
                  href={`/booking?service=${service.id}`} 
                  className="bg-[#C5A880]/10 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#12110F] border border-[#C5A880]/20 font-semibold py-2 px-4 rounded-sm text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Buchen
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Praxis / Philosophy Section */}
      <section id="praxis" className="py-24 bg-[#1A1816] border-y border-[#C5A880]/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="rounded-sm overflow-hidden h-64 border border-[#C5A880]/15">
              <img 
                src="/images/hero.png" 
                alt="Massage Room Ambient" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-sm overflow-hidden h-64 border border-[#C5A880]/15 mt-8">
              <img 
                src="/images/tools.png" 
                alt="Massage Oils & Cups" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-start gap-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Unsere Praxis</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] leading-tight">
              Gleichberechtigte Räumlichkeiten für Männer & Frauen
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]"></div>
            
            <p className="text-[#A8A398] text-base leading-relaxed">
              In unserer Praxis in Garbsen legen wir allergrößten Wert auf Diskretion, Komfort und eine absolut entspannende Atmosphäre. Wir bieten getrennte, geschützte Räumlichkeiten für Damen und Herren, sodass sich jeder Gast rundum geborgen und wohl fühlen kann.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-sm">
                  <Shield className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-sm font-medium">Volle Diskretion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-sm">
                  <CheckCircle className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-sm font-medium">Höchste Hygienestandards</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-sm">
                  <Gift className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-sm font-medium">Massagen als Gutschein</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-sm">
                  <Flame className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-sm font-medium">Wohltuendes Ambiente</span>
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
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Kontakt</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] mt-2">Wir freuen uns auf Sie</h2>
              <div className="w-12 h-0.5 bg-[#C5A880] mt-4"></div>
            </div>

            <div className="flex flex-col gap-6 text-[#A8A398]">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4F1EA] mb-1">Adresse</h4>
                  <p>Gerhart-Hauptmann-Straße 16</p>
                  <p>30826 Garbsen</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4F1EA] mb-1">Telefon / WhatsApp</h4>
                  <p className="hover:text-[#C5A880] transition-colors"><a href="tel:015734368721">0157 34368 721</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4F1EA] mb-1">E-Mail</h4>
                  <p className="hover:text-[#C5A880] transition-colors"><a href="mailto:damir-cagla@hotmail.de">damir-cagla@hotmail.de</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4F1EA] mb-1">Termine</h4>
                  <p>Termine ausschließlich nach vorheriger Online-Buchung oder telefonischer Absprache.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              <a 
                href={site.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-sm bg-[#1A1816] hover:bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] hover:text-[#F4F1EA] transition-all"
              >
                WA
              </a>
              <a 
                href={site.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-sm bg-[#1A1816] hover:bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] hover:text-[#F4F1EA] transition-all"
              >
                FB
              </a>
              <a 
                href={site.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-sm bg-[#1A1816] hover:bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] hover:text-[#F4F1EA] transition-all"
              >
                IG
              </a>
              <a 
                href={site.tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-sm bg-[#1A1816] hover:bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] hover:text-[#F4F1EA] transition-all"
              >
                TK
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-96 lg:h-auto min-h-[350px] rounded-sm overflow-hidden border border-[#C5A880]/15 relative shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x47b073003051ad35%3A0xe1db6ce59820fcf2!2sGerhart-Hauptmann-Stra%C3%9Fe%2016%2C%2030826%20Garbsen!5m2!1sde!2sde"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0B0A09] border-t border-[#C5A880]/10 text-center text-xs text-[#A8A398] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Damir & Cagla's Massagepraxis. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 uppercase tracking-wider text-[10px]">
            <Link href="/admin" className="hover:text-[#C5A880] transition-colors">Admin Login</Link>
            <a href="#home" className="hover:text-[#C5A880] transition-colors">Nach oben</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
