import Link from "next/link";
import { readData } from "@/lib/store";
import { site } from "@/lib/seed";
import { 
  Calendar, Clock, MapPin, Phone, Mail, Award, CheckCircle, 
  Flame, Shield, Gift, GraduationCap, ArrowRight, Sparkles 
} from "lucide-react";
import HeroVideo from "./components/hero-video";

export default function Home() {
  const data = readData();
  const activeServices = data.services.filter((s) => s.active);

  // Map service ID to their custom, highly consistent spa images
  const getServiceImage = (id: string) => {
    switch (id) {
      case "triggerpunkt-45":
        return "/images/service_trigger_teil.png";
      case "triggerpunkt-90":
        return "/images/service_trigger_ganz.png";
      case "schroepfen-45":
        return "/images/service_schroepfen.png";
      case "entspannung-45":
        return "/images/service_entspannung.png";
      case "gutschein-60":
        return "/images/service_gutschein.png";
      case "schwangerschaft":
        return "/images/service_schwangerschaft.png";
      default:
        return "/images/tools.png";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2B28] font-sans selection:bg-[#EFEBE4] selection:text-[#2D2B28]">
      
      {/* Floating Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#B69668]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-[#B69668] tracking-wider leading-none font-semibold">Damir & Cagla</span>
            <span className="text-[10px] md:text-xs text-[#6E6A64] uppercase tracking-widest mt-1.5 font-medium">Massage-Praxis</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#6E6A64] font-semibold">
            <a href="#home" className="hover:text-[#B69668] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#B69668] transition-colors">Über uns</a>
            <Link href="/qualifikationen" className="hover:text-[#B69668] transition-colors">Qualifikationen</Link>
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
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B69668]/10 border border-[#B69668]/20 rounded-full text-[10px] uppercase tracking-widest text-[#B69668] font-bold">
              <Flame className="w-3.5 h-3.5 animate-pulse" /> Zertifizierte Wellnesspraxis in Garbsen
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
          
          <div className="lg:col-span-5 hidden lg:flex justify-center relative animate-fade-in-up animate-delay-200">
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

      {/* Wer Ist Damir Section with ENLARGED profile photo, thin border, and luxury backing stamp */}
      <section id="about" className="py-24 bg-[#F3EFE9] border-y border-[#B69668]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(182,150,104,0.04),transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8 relative z-10">
          
          {/* Overlapping layered photo container */}
          <div className="relative">
            {/* Enlarged photo with thin border */}
            <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-white shadow-2xl p-1.5 border-[0.5px] border-[#B69668]/30">
              <img 
                src="/images/damir.jpg" 
                alt="Damir Krasnic - Certified Specialist" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>

            {/* Elegant circular gold seal (sticker) overlapping at the bottom right */}
            <div className="absolute -bottom-4 -right-2 bg-[#FAF7F2] border-double border-4 border-[#B69668] w-24 h-24 rounded-full flex flex-col items-center justify-center text-center p-2.5 rotate-12 shadow-xl z-20 pointer-events-none select-none">
              <span className="text-[7px] uppercase tracking-widest text-[#B69668] font-bold">100%</span>
              <span className="font-serif text-[10px] font-bold text-[#2D2B28] mt-0.5 leading-none">Geprüfter</span>
              <span className="text-[7px] uppercase tracking-widest text-[#6E6A64] mt-0.5 font-semibold">Spezialist</span>
            </div>
          </div>
          
          <div className="max-w-2xl mt-4 animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">Wer ist</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2B28] mt-2 mb-6 font-semibold">Damir Krasnic</h2>
            
            <p className="text-[#6E6A64] text-base md:text-lg leading-relaxed mb-8 font-medium">
              „Ich bin ein zertifizierter Fachpraktiker für Wellness und Massageprävention. Meine Expertise und Hingabe in der Massage ermöglichen es mir, meinen Kunden eine Vielzahl von Behandlungen anzubieten. Mit Herz und Leidenschaft widme ich mich meinen Behandlungen, um Ihnen eine erholsame Auszeit zu ermöglichen. Meine Massagen sind darauf ausgelegt, Verspannungen zu lösen, Stress abzubauen und Ihr körperliches Wohlbefinden zu steigern.“
            </p>
            
            {/* Overhauled, highly active, premium shine badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3.5 gold-shine-badge rounded-full text-xs uppercase tracking-widest text-[#2D2B28] font-bold transition-all duration-300">
              <Sparkles className="w-4 h-4 text-[#B69668] animate-spin-slow" />
              <span>Zertifizierter Fachpraktiker für Massage & Prävention</span>
              <Shield className="w-4 h-4 text-[#B69668]" />
            </div>
          </div>
        </div>
      </section>

      {/* Qualifikationen & Zertifikate (ELEGANT TEASER Sektion) */}
      <section id="certificates" className="py-24 max-w-6xl mx-auto px-6 relative border-b border-[#B69668]/15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B69668]/2 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Side: Teaser Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B69668]/10 border border-[#B69668]/20 rounded-full text-[9px] uppercase tracking-widest text-[#B69668] font-bold">
              <GraduationCap className="w-3.5 h-3.5" /> Offizielle Qualifikationen
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2B28] font-semibold leading-tight">
              TÜV-zertifizierte Fachkompetenz & Ausbildung
            </h2>
            <div className="w-12 h-0.5 bg-[#B69668]"></div>
            
            <p className="text-[#6E6A64] text-sm sm:text-base leading-relaxed font-medium">
              Damir Krasnic ist hochqualifizierter Experte für Massage, Personal Training und präventive Gesundheit. Jedes unserer Zertifikate steht für hunderte Stunden fundierte Fachpraxis und eine erfolgreich abgelegte theoretische wie praktische Prüfung.
            </p>
            
            <p className="text-[#6E6A64] text-xs leading-relaxed font-medium italic">
              Unsere Ausbildungsinhalte basieren auf staatlich anerkannten und nach AZAV zertifizierten Schulungsprogrammen (u.a. WIP Academy Berlin und Wellness Heimstudium).
            </p>

            <Link 
              href="/qualifikationen" 
              className="inline-flex items-center gap-2 bg-[#B69668] hover:bg-[#A08154] text-white font-bold py-4 px-8 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#B69668]/15 cursor-pointer mt-2"
            >
              Zertifikatsmappe öffnen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Side: Elegant overlapping stack preview of certifications */}
          <div className="lg:col-span-6 flex justify-center items-center relative animate-fade-in-up animate-delay-200">
            {/* Back Certificate (Personal Trainer) */}
            <div className="gallery-frame p-2 bg-white w-64 aspect-[4/3] rotate-[-6deg] translate-x-8 translate-y-4 opacity-75 shadow-lg pointer-events-none">
              <img 
                src="/images/cert_fitness.png" 
                alt="Fitness Coach Certificate Teaser" 
                className="w-full h-full object-contain filter contrast-[1.01]" 
              />
            </div>
            
            {/* Front Certificate (Fachpraktiker) */}
            <div className="gallery-frame p-2 bg-white w-72 aspect-[4/3] rotate-[3deg] absolute shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-102">
              <div className="absolute inset-0 bg-[#2D2B28]/3 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link href="/qualifikationen" className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#B69668]/20 shadow-md text-[9px] uppercase tracking-widest text-[#2D2B28] font-bold flex items-center gap-1.5 cursor-pointer">
                  Zertifikate ansehen <ArrowRight className="w-3.5 h-3.5 text-[#B69668]" />
                </Link>
              </div>
              <img 
                src="/images/cert_fachpraktiker.png" 
                alt="Fachpraktiker Certificate Teaser" 
                className="w-full h-full object-contain filter contrast-[1.01]" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="py-24 max-w-6xl mx-auto px-6">
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
              className="spa-card overflow-hidden rounded-sm flex flex-col justify-between group"
            >
              <div>
                {/* Stunning 16:9 Widescreen Image Header */}
                <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-[#B69668]/15 bg-[#FAF8F5]">
                  <img 
                    src={getServiceImage(service.id)} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
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
                  
                  <p className="text-[#6E6A64] text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 flex items-center justify-between border-t border-[#B69668]/10 mt-auto">
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
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/10 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all shadow-sm cursor-pointer"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.424 9.865-9.864.001-2.636-1.02-5.115-2.875-6.97s-4.333-2.876-6.974-2.877c-5.44 0-9.863 4.424-9.865 9.864-.001 1.797.482 3.55 1.398 5.11l-.993 3.628 3.734-.979zm11.187-5.182c-.302-.151-1.788-.882-2.057-.981-.27-.099-.467-.149-.662.151-.195.3-.757.98-1.011 1.268-.254.29-.508.326-.81.175-1.012-.515-1.8-1.002-2.521-2.247-.195-.336-.039-.533.108-.721.272-.347.508-.662.662-.882.155-.219.1-.383-.05-.683-.15-.3-.662-1.6-.908-2.189-.239-.575-.487-.497-.662-.505-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.37-.27.295-1.028 1.01-1.028 2.462 0 1.452 1.048 2.858 1.196 3.059.148.2 2.062 3.15 4.996 4.417.697.301 1.242.482 1.668.618.7.223 1.338.192 1.843.117.563-.083 1.788-.731 2.042-1.439.254-.707.254-1.314.178-1.44-.076-.124-.282-.196-.583-.346z"/></svg>
              </a>
              <a 
                href={site.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/10 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all shadow-sm cursor-pointer"
                title="Instagram"
              >
                <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href={site.tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/10 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all shadow-sm cursor-pointer"
                title="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.01 1.63 4.14.99 1.09 2.37 1.82 3.86 2.05v3.87c-1.74-.03-3.41-.6-4.78-1.68-.2-.16-.39-.33-.57-.51v7.6c0 1.95-.53 3.88-1.57 5.48-1.65 2.53-4.52 4-7.51 3.81-2.92-.19-5.59-2-6.72-4.7-1.28-3.04-.6-6.66 1.71-9 1.53-1.56 3.66-2.43 5.82-2.43.29 0 .58.01.87.04v3.83c-.88-.26-1.85-.15-2.65.34-.99.6-1.59 1.67-1.6 2.82 0 1.58 1.13 2.97 2.7 3.12 1.34.13 2.64-.67 3.07-1.94.13-.38.18-.79.17-1.19V.02z"/></svg>
              </a>
              <a 
                href={site.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded bg-white hover:bg-[#B69668]/10 border border-[#B69668]/20 flex items-center justify-center text-[#B69668] hover:text-[#A08154] transition-all shadow-sm cursor-pointer"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-96 lg:h-auto min-h-[350px] rounded-sm overflow-hidden border border-[#B69668]/15 relative shadow-xl bg-white p-1">
            <iframe 
              src="https://maps.google.com/maps?q=Gerhart-Hauptmann-Stra%C3%9Fe%2016,%2030826%20Garbsen&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
      <footer className="bg-[#1C1A17] text-[#FAF7F2]/80 border-t border-[#B69668]/20 pt-16 pb-8 px-6 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg text-white font-normal tracking-wide">
              Damir & Cagla's<br />
              <span className="text-[#B69668] italic font-serif">Massagepraxis</span>
            </h3>
            <p className="text-xs text-[#FAF7F2]/60 leading-relaxed">
              Ihre Oase der Ruhe und Prävention in Garbsen. Professionelle Fachpraktiken für ganzheitliche Entspannung, Regeneration und Schmerzlinderung.
            </p>
            <div className="flex gap-2.5 mt-2">
              <a 
                href={site.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-[#B69668]/10 hover:bg-[#B69668] hover:text-white border border-[#B69668]/30 flex items-center justify-center text-[#B69668] transition-all cursor-pointer"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.424 9.865-9.864.001-2.636-1.02-5.115-2.875-6.97s-4.333-2.876-6.974-2.877c-5.44 0-9.863 4.424-9.865 9.864-.001 1.797.482 3.55 1.398 5.11l-.993 3.628 3.734-.979zm11.187-5.182c-.302-.151-1.788-.882-2.057-.981-.27-.099-.467-.149-.662.151-.195.3-.757.98-1.011 1.268-.254.29-.508.326-.81.175-1.012-.515-1.8-1.002-2.521-2.247-.195-.336-.039-.533.108-.721.272-.347.508-.662.662-.882.155-.219.1-.383-.05-.683-.15-.3-.662-1.6-.908-2.189-.239-.575-.487-.497-.662-.505-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.37-.27.295-1.028 1.01-1.028 2.462 0 1.452 1.048 2.858 1.196 3.059.148.2 2.062 3.15 4.996 4.417.697.301 1.242.482 1.668.618.7.223 1.338.192 1.843.117.563-.083 1.788-.731 2.042-1.439.254-.707.254-1.314.178-1.44-.076-.124-.282-.196-.583-.346z"/></svg>
              </a>
              <a 
                href={site.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-[#B69668]/10 hover:bg-[#B69668] hover:text-white border border-[#B69668]/30 flex items-center justify-center text-[#B69668] transition-all cursor-pointer"
                title="Instagram"
              >
                <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href={site.tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-[#B69668]/10 hover:bg-[#B69668] hover:text-white border border-[#B69668]/30 flex items-center justify-center text-[#B69668] transition-all cursor-pointer"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.01 1.63 4.14.99 1.09 2.37 1.82 3.86 2.05v3.87c-1.74-.03-3.41-.6-4.78-1.68-.2-.16-.39-.33-.57-.51v7.6c0 1.95-.53 3.88-1.57 5.48-1.65 2.53-4.52 4-7.51 3.81-2.92-.19-5.59-2-6.72-4.7-1.28-3.04-.6-6.66 1.71-9 1.53-1.56 3.66-2.43 5.82-2.43.29 0 .58.01.87.04v3.83c-.88-.26-1.85-.15-2.65.34-.99.6-1.59 1.67-1.6 2.82 0 1.58 1.13 2.97 2.7 3.12 1.34.13 2.64-.67 3.07-1.94.13-.38.18-.79.17-1.19V.02z"/></svg>
              </a>
              <a 
                href={site.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-[#B69668]/10 hover:bg-[#B69668] hover:text-white border border-[#B69668]/30 flex items-center justify-center text-[#B69668] transition-all cursor-pointer"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Opening Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B69668]">Öffnungszeiten</h4>
            <ul className="text-xs text-[#FAF7F2]/60 flex flex-col gap-2 leading-relaxed">
              <li className="flex justify-between border-b border-[#FAF7F2]/10 pb-1">
                <span>Montag - Samstag:</span>
                <span className="text-white font-medium">09:00 - 20:00 Uhr</span>
              </li>
              <li className="flex justify-between border-b border-[#FAF7F2]/10 pb-1">
                <span>Sonntag & Feiertage:</span>
                <span className="text-[#B69668] italic font-medium">Nach Absprache</span>
              </li>
              <li className="text-[10px] text-[#FAF7F2]/40 italic mt-1 leading-normal">
                Hinweis: Termine ausschließlich nach vorheriger Online-Buchung oder telefonischer Absprache.
              </li>
            </ul>
          </div>
          
          {/* Column 3: Navigation & Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B69668]">Rechtliches & Links</h4>
            <ul className="text-xs text-[#FAF7F2]/60 flex flex-col gap-2">
              <li>
                <a href="#about" className="hover:text-[#B69668] transition-colors">Über uns</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#B69668] transition-colors">Behandlungen</a>
              </li>
              <li>
                <Link href="/qualifikationen" className="hover:text-[#B69668] transition-colors">Zertifikate & Qualifikationen</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#B69668] transition-colors">Online-Terminbuchung</Link>
              </li>
              <li>
                <a href="/impressum" className="hover:text-[#B69668] transition-colors">Impressum</a>
              </li>
              <li>
                <a href="/datenschutz" className="hover:text-[#B69668] transition-colors">Datenschutzerklärung</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B69668]">Kontakt</h4>
            <ul className="text-xs text-[#FAF7F2]/60 flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B69668] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Gerhart-Hauptmann-Straße 16<br />
                  30826 Garbsen
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B69668] shrink-0" />
                <span>0157 34368 721</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B69668] shrink-0" />
                <a href="mailto:damir-cagla@hotmail.de" className="hover:text-[#B69668] transition-colors break-all">damir-cagla@hotmail.de</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Footer bottom divider and copyright */}
        <div className="border-t border-[#B69668]/15 pt-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-[#FAF7F2]/50 font-medium">
          <p>© {new Date().getFullYear()} Damir & Cagla's Massagepraxis. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-[#B69668] transition-colors uppercase tracking-widest text-[9px] font-bold">Nach oben</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
