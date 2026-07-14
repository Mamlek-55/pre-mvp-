import { ArrowRight, List, Users } from 'lucide-react';

interface Props {
  onNouvelleVisite: () => void;
  onVoirVisites: () => void;
  onVoirProfils: () => void;
  nombreVisites: number;
}

export function LandingPage({ onNouvelleVisite, onVoirVisites, onVoirProfils, nombreVisites }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 bg-white overflow-hidden">

        {/* Scattered gold dots — exact pitch-deck aesthetic */}
        <span className="absolute top-[12%] left-[14%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-60" />
        <span className="absolute top-[18%] right-[18%] w-1 h-1 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute top-[52%] left-[8%] w-1 h-1 rounded-full bg-[#C4963A] opacity-50" />
        <span className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute bottom-[22%] left-[22%] w-1 h-1 rounded-full bg-[#C4963A] opacity-30" />
        <span className="absolute bottom-[14%] right-[28%] w-1 h-1 rounded-full bg-[#C4963A] opacity-50" />
        <span className="absolute top-[38%] right-[6%] w-1 h-1 rounded-full bg-[#C4963A] opacity-30" />
        <span className="absolute top-[82%] left-[6%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-25" />

        {/* Logo image — prominent center */}
        <div className="mb-6 select-none">
          <img
            src="/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg"
            alt="MAMLEK Logo"
            className="w-24 h-24 object-contain mx-auto drop-shadow-sm"
          />
        </div>

        {/* Wordmark */}
        <h1
          className="text-[64px] leading-none font-black tracking-tight text-[#0F0F0F] uppercase mb-2 select-none"
          style={{ fontStretch: 'condensed', letterSpacing: '-0.02em' }}
        >
          MAMLEK
        </h1>

        {/* Divider with label — exact pitch deck style */}
        <div className="flex items-center gap-3 mb-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-[#C4963A]" />
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#C4963A] uppercase whitespace-nowrap">
            Real Estate Intelligence
          </p>
          <div className="flex-1 h-px bg-[#C4963A]" />
        </div>

        <p className="text-[10px] tracking-[0.18em] text-gray-400 uppercase mb-10">
          Infrastructure · 2026
        </p>

        {/* CTA Buttons */}
        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={onNouvelleVisite}
            className="w-full bg-[#0F0F0F] text-white rounded-xl py-4 px-6 font-bold text-sm
                       uppercase tracking-widest flex items-center justify-center gap-3
                       hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-lg"
          >
            Nouvelle visite
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onVoirVisites}
            className="w-full border border-gray-200 bg-white text-[#0F0F0F] rounded-xl py-4 px-6
                       font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-3
                       hover:border-[#C4963A] hover:bg-[#FEFBF4] active:scale-[0.98] transition-all"
          >
            <List className="w-4 h-4" />
            Mes visites
            {nombreVisites > 0 && (
              <span className="bg-[#C4963A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {nombreVisites}
              </span>
            )}
          </button>

          <button
            onClick={onVoirProfils}
            className="w-full border border-gray-200 bg-white text-[#0F0F0F] rounded-xl py-4 px-6
                       font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-3
                       hover:border-[#C4963A] hover:bg-[#FEFBF4] active:scale-[0.98] transition-all"
          >
            <Users className="w-4 h-4" />
            Mes profils / leads
          </button>
        </div>
      </section>

      {/* ── SECTION : LE PROBLEME ── */}
      <section className="bg-[#FAFAF8] px-6 py-14 border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C4963A] uppercase mb-3">
            Le probleme
          </p>
          <h2 className="text-3xl font-black leading-tight text-[#0F0F0F] uppercase mb-4">
            Un marche<br />
            <span className="text-[#C4963A]">sans systeme</span><br />
            de verite
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Aucune source fiable, aucune reference commune. Chacun decide avec ses propres chiffres — et personne n'a la meme verite.
          </p>

          {/* Price chaos cards */}
          <div className="mt-8 space-y-3">
            <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex justify-between items-center">
              <p className="text-[10px] tracking-widest text-gray-400 uppercase">Annonce A</p>
              <p className="text-lg font-black text-[#0F0F0F]">2 450 000 DA</p>
            </div>
            <div className="bg-[#C4963A] rounded-xl px-5 py-4 flex justify-between items-center">
              <p className="text-[10px] tracking-widest text-white/70 uppercase">Meme quartier ?</p>
              <p className="text-lg font-black text-white">1 980 000 DA ?</p>
            </div>
            <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex justify-between items-center">
              <p className="text-[10px] tracking-widest text-gray-400 uppercase">Annonce B</p>
              <p className="text-lg font-black text-[#0F0F0F]">3 100 000 DA</p>
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-[#C4963A] font-bold tracking-wider">+/- 40% d'ecart</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : LE FRAMEWORK ── */}
      <section className="bg-white px-6 py-14 border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C4963A] uppercase mb-3">
            Le framework
          </p>
          <h2 className="text-3xl font-black leading-tight text-[#0F0F0F] uppercase mb-8">
            Trois niveaux<br />de verite
          </h2>

          <div className="space-y-4">
            {[
              { num: '01', title: 'Quartier', desc: 'La vue macro du marche local et de ses dynamiques.' },
              { num: '02', title: 'Immeuble', desc: "Le contexte de l'actif : standing, etat, services." },
              { num: '03', title: 'Appartement', desc: 'La donnee granulaire qui fait la vraie comparaison.' },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="flex items-start gap-5 p-5 bg-[#FAFAF8] rounded-xl border-l-2 border-[#C4963A]"
              >
                <span className="text-2xl font-black text-[#C4963A] leading-none mt-0.5">{num}</span>
                <div>
                  <p className="font-black text-[#0F0F0F] uppercase tracking-wide mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION : LE SYSTEME ── */}
      <section className="bg-[#FAFAF8] px-6 py-14 border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C4963A] uppercase mb-3">
            Le systeme
          </p>
          <h2 className="text-3xl font-black leading-tight text-[#0F0F0F] uppercase mb-8">
            Terrain <span className="text-[#C4963A]">→</span> Data{' '}
            <span className="text-[#C4963A]">→</span> Intelligence
          </h2>

          <div className="space-y-4">
            {[
              { step: '1', label: 'Terrain', text: 'Collecte reelle, verifiee sur place. La donnee brute du marche.' },
              { step: '2', label: 'Data', text: 'Structuration normalisee. Chaque actif devient comparable.' },
              { step: '3', label: 'Intelligence', text: 'Insights actionnables, decisions fiables et instantanees.' },
            ].map(({ step, label, text }) => (
              <div key={step} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#C4963A] text-white text-xs font-black flex items-center justify-center">
                    {step}
                  </span>
                  <p className="font-black text-[#0F0F0F] uppercase tracking-wide text-sm">{label}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-10">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION SOMBRE : VISION ── */}
      <section className="bg-[#111008] px-6 py-16 relative overflow-hidden">
        {/* Scattered dots on dark */}
        <span className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-50" />
        <span className="absolute top-12 right-16 w-1 h-1 rounded-full bg-[#C4963A] opacity-30" />
        <span className="absolute bottom-16 left-8 w-1 h-1 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute bottom-8 right-12 w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-30" />

        <div className="max-w-md mx-auto text-center">
          {/* Logo on dark */}
          <img
            src="/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg"
            alt="MAMLEK"
            className="w-14 h-14 object-contain mx-auto mb-8 opacity-90"
          />

          <h2 className="text-2xl font-black leading-tight text-white uppercase mb-2">
            Nous ne construisons pas une app.
          </h2>
          <h2 className="text-2xl font-black leading-tight text-[#C4963A] uppercase mb-8">
            Nous construisons la verite du marche.
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-px bg-[#C4963A]" />
            <p className="text-[10px] tracking-[0.2em] text-[#C4963A] uppercase font-semibold">
              Mamlek · Real Estate Intelligence
            </p>
            <div className="w-12 h-px bg-[#C4963A]" />
          </div>

          <p className="text-xs text-white/40 tracking-widest uppercase mb-10">
            www.mamlek.com
          </p>

          {/* CTAs on dark */}
          <div className="space-y-3">
            <button
              onClick={onNouvelleVisite}
              className="w-full bg-[#C4963A] text-white rounded-xl py-4 px-6 font-bold text-sm
                         uppercase tracking-widest flex items-center justify-center gap-3
                         hover:bg-[#B8862E] active:scale-[0.98] transition-all"
            >
              Commencer une visite
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onVoirVisites}
              className="w-full border border-white/20 text-white/70 rounded-xl py-3 px-6 font-semibold text-sm
                         uppercase tracking-widest flex items-center justify-center gap-3
                         hover:border-white/40 hover:text-white active:scale-[0.98] transition-all"
            >
              <List className="w-4 h-4" />
              Voir mes visites
              {nombreVisites > 0 && (
                <span className="bg-[#C4963A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {nombreVisites}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="bg-[#0A0A05] px-6 py-4 text-center">
        <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
          MAMLEK · Property Intelligence · 2026
        </p>
      </footer>
    </div>
  );
}
