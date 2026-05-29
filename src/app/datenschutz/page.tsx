import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2D2B28] font-sans py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-[#B69668]/15 p-8 md:p-12 shadow-xl rounded-sm">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B69668] hover:text-[#A08154] font-bold transition-colors mb-8"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-[#2D2B28] mb-8 pb-4 border-b border-[#B69668]/20">
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 text-sm text-[#6E6A64] leading-relaxed">
          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-[#2D2B28] font-semibold text-sm mb-1">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="mt-2 font-medium text-[#2D2B28]">
              <p>Damir & Cagla Krasnic</p>
              <p>Gerhart-Hauptmann-Straße 16</p>
              <p>30826 Garbsen</p>
              <p>Telefon: 0157 34368 721</p>
              <p>E-Mail: damir-cagla@hotmail.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">3. Datenerfassung auf unserer Website</h2>
            <h3 className="text-[#2D2B28] font-semibold text-sm mb-1">Cookies & Hosting</h3>
            <p>
              Unsere Website wird bei einem deutschen oder europäischen Hosting-Dienstleister gehostet. Dort werden automatisch Server-Log-Files erfasst (z.B. IP-Adresse, Datum/Uhrzeit des Abrufs, Browsertyp). Dies ist technisch notwendig, um die Sicherheit und Stabilität der Seite zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <h3 className="text-[#2D2B28] font-semibold text-sm mt-3 mb-1">Online-Terminbuchung</h3>
            <p>
              Wenn Sie über unser integriertes Online-Buchungstool einen Termin reservieren, erfassen wir Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer und den gewünschten Service. Diese Daten werden ausschließlich zur Organisation, Bestätigung und Durchführung Ihres Termins verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">4. Ihre Rechte als betroffene Person</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenden Sie sich hierzu einfach an die oben genannte Kontaktadresse.
            </p>
            <p className="mt-2">
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde (Landesbeauftragte für den Datenschutz Niedersachsen) zu.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
