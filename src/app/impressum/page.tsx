import Link from "next/link";

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="space-y-6 text-sm text-[#6E6A64] leading-relaxed">
          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="font-medium text-[#2D2B28]">Damir & Cagla's Massagepraxis</p>
            <p>Gerhart-Hauptmann-Straße 16</p>
            <p>30826 Garbsen</p>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">Kontakt</h2>
            <p>Telefon: 0157 34368 721</p>
            <p>E-Mail: damir-cagla@hotmail.de</p>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">Vertreten durch</h2>
            <p>Damir Krasnic</p>
            <p>Cagla Krasnic</p>
            <p className="text-[11px] text-[#FAF7F2]/0 mt-1">
              (Zertifizierte Fachpraktiker für Massage & Prävention)
            </p>
          </section>

          <section>
            <h2 className="text-[#2D2B28] font-bold text-base mb-2">Aufsichtsbehörde</h2>
            <p>Gesundheitsamt Region Hannover</p>
            <p>Weinstraße 2, 30159 Hannover</p>
          </section>

          <section className="pt-6 border-t border-[#B69668]/10 space-y-4">
            <h2 className="text-[#2D2B28] font-serif text-lg font-normal mb-2">Haftungsausschluss (Disclaimer)</h2>
            
            <div>
              <h3 className="text-[#2D2B28] font-bold text-xs uppercase tracking-wider mb-1">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div>
              <h3 className="text-[#2D2B28] font-bold text-xs uppercase tracking-wider mb-1">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            <div>
              <h3 className="text-[#2D2B28] font-bold text-xs uppercase tracking-wider mb-1">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

            <div>
              <h3 className="text-[#2D2B28] font-bold text-xs uppercase tracking-wider mb-1">Streitschlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#B69668] hover:underline ml-1">https://ec.europa.eu/consumers/odr/</a>.<br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
