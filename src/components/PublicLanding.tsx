import { ArrowRight, Shield, MapPin, Building2, Home, BookOpen, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onConnexion: () => void;
  onInscription: () => void;
}

export function PublicLanding({ onConnexion, onInscription }: Props) {
  return (
    <div className="min-h-screen bg-white text-[#0F0F0F] font-sans selection:bg-[#F3EAD3] selection:text-[#9A5F28]">
      
      {/* ── COUCHE DÉCORATIVE (Scattered gold dots - MAMLEK signature) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[8%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute top-[15%] right-[12%] w-1 h-1 rounded-full bg-[#C4963A] opacity-30" />
        <span className="absolute top-[45%] left-[6%] w-1 h-1 rounded-full bg-[#C4963A] opacity-35" />
        <span className="absolute top-[65%] right-[8%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-25" />
        <span className="absolute bottom-[20%] left-[15%] w-1 h-1 rounded-full bg-[#C4963A] opacity-20" />
        <span className="absolute bottom-[10%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-30" />
      </div>

      {/* ── HEADER (Navbar) ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <Logo size={32} />
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-[#0F0F0F] uppercase leading-none">MAMLEK</span>
              <span className="text-[8px] tracking-[0.18em] text-[#C4963A] uppercase font-bold leading-none mt-1">Property Intelligence</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#mission" className="hover:text-black transition-colors">Notre Mission</a>
            <a href="#experience" className="hover:text-black transition-colors">L'Expérience</a>
            <a href="#protocole" className="hover:text-black transition-colors">Le Protocole</a>
            <a href="#connaissances" className="hover:text-black transition-colors">Base Documentaire</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onConnexion}
              className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] hover:text-[#C4963A] py-2 px-3 transition-colors"
            >
              Se connecter
            </button>
            <button 
              onClick={onInscription}
              className="bg-[#0F0F0F] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl hover:bg-[#202020] active:scale-[0.98] transition-all shadow-sm"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="hero" className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-[#FAFAF7]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Label de Positionnement */}
          <div className="inline-flex items-center gap-2 bg-[#FEF7E7] border border-[#FDEEC8] px-4 py-1.5 rounded-full mb-8 animate-fade-in select-none">
            <Shield className="w-3.5 h-3.5 text-[#C4963A]" />
            <span className="text-[10px] font-bold tracking-widest text-[#C4963A] uppercase">
              ENTREPRISE D'INTELLIGENCE IMMOBILIÈRE
            </span>
          </div>

          {/* Slogan Principal */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0F0F0F] leading-[1.1] mb-8 select-none">
            Réduire l'incertitude <br />
            pendant la prise d'une <br />
            <span className="text-[#C4963A]">décision immobilière</span>
          </h1>

          {/* Sous-titre centré sur le Héros (L'acquéreur) */}
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            MAMLEK n’est pas une agence, ni un portail d’annonces, ni un comparateur de prix. Nous sommes à vos côtés pour structurer les choix de l’acheteur, de l’investisseur, de la diaspora ou de la famille s'apprêtant à investir une part majeure de son patrimoine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onInscription}
              className="w-full sm:w-auto bg-[#0F0F0F] text-white rounded-xl py-4 px-8 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-md"
            >
              Démarrer un projet
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#experience"
              className="w-full sm:w-auto border border-gray-200 bg-white text-[#0F0F0F] rounded-xl py-4 px-8 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-[#C4963A] hover:bg-[#FEFBF4] transition-all"
            >
              Découvrir la méthode
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION : NOTRE POSITIONNEMENT (Ce que nous ne sommes pas) ── */}
      <section id="mission" className="py-24 px-6 border-y border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#FAFAF8]/50">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500/70 block mb-2">Non-Agence</span>
              <h3 className="font-bold text-lg mb-2">Pas de commission de vente</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Nous ne vendons aucun bien immobilier. Notre neutralité est totale et absolue, nous ne représentons que vos intérêts.</p>
            </div>
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#FAFAF8]/50">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500/70 block mb-2">Non-Portail d'annonces</span>
              <h3 className="font-bold text-lg mb-2">Pas de publicité déguisée</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Nous ne cherchons pas à accumuler des listes d'annonces non vérifiées. Nous validons directement chaque information.</p>
            </div>
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#FAFAF8]/50">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500/70 block mb-2">Non-Comparateur rapide</span>
              <h3 className="font-bold text-lg mb-2">Pas d'algorithme aveugle</h3>
              <p className="text-xs text-gray-500 leading-relaxed">L'immobilier ne se résume pas à un prix moyen au mètre carré théorique. Nous combinons l'analyse humaine à la rigueur de la donnée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : L'EXPÉRIENCE DE VISITE NATIVE ── */}
      <section id="experience" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
            L'EXPÉRIENCE UNIVERSELLE
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase mb-8">
            Comment découvrez-vous <br />un bien immobilier ?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                Avant d'acheter un bien immobilier, personne ne commence par inspecter directement l'appartement. L'expérience humaine suit un ordre immuable :
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FEF7E7] text-[#C4963A] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-gray-600"><strong className="text-black font-semibold">Le quartier :</strong> On arrive d'abord dans une zone, on perçoit l'atmosphère, l'accès, le calme.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FEF7E7] text-[#C4963A] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-gray-600"><strong className="text-black font-semibold">L'immeuble :</strong> Puis on découvre la façade, le hall, la propreté, la sécurité de la résidence.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FEF7E7] text-[#C4963A] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-gray-600"><strong className="text-black font-semibold">L'appartement :</strong> Enfin, on pousse la porte pour examiner l'agencement et la lumière.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 italic">
                Nous avons simplement digitalisé cette manière naturelle et réelle de vivre l'évaluation d'un actif.
              </p>
            </div>

            {/* Visual block showing the flow */}
            <div className="relative border border-gray-100 rounded-3xl p-8 bg-[#FAFAF8] shadow-sm flex flex-col justify-between aspect-square">
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Protocole Digitalisé</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              
              <div className="my-auto space-y-4">
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-200/50 shadow-sm transition-transform hover:-translate-y-0.5 duration-200">
                  <MapPin className="w-5 h-5 text-[#C4963A]" />
                  <div>
                    <h4 className="font-bold text-xs uppercase leading-none">Étape 01 : Le Quartier</h4>
                    <span className="text-[10px] text-gray-400">Score de vie & infrastructures</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-200/50 shadow-sm transition-transform hover:-translate-y-0.5 duration-200">
                  <Building2 className="w-5 h-5 text-[#C4963A]" />
                  <div>
                    <h4 className="font-bold text-xs uppercase leading-none">Étape 02 : La Résidence</h4>
                    <span className="text-[10px] text-gray-400">Structure, sécurité & parties communes</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-200/50 shadow-sm transition-transform hover:-translate-y-0.5 duration-200">
                  <Home className="w-5 h-5 text-[#C4963A]" />
                  <div>
                    <h4 className="font-bold text-xs uppercase leading-none">Étape 03 : Le Bien</h4>
                    <span className="text-[10px] text-gray-400">Finitions, lumière & habitabilité</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[9px] font-bold text-[#C4963A] uppercase tracking-wider">
                  MAMLEK SYSTEM · 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : PROTOCOLE EN 3 COUCHES ── */}
      <section id="protocole" className="py-24 px-6 bg-[#FAFAF8] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4 select-none">
              MÉTHODOLOGIE SCIENTIFIQUE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase">
              Notre Protocole en Trois Couches
            </h2>
          </div>

          <div className="space-y-12">
            
            {/* COUCHE 1 */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:border-[#C4963A] transition-all">
              <span className="text-4xl font-black text-[#C4963A] leading-none shrink-0">01</span>
              <div>
                <h3 className="font-black text-xl text-[#0F0F0F] uppercase mb-2">Le Quartier</h3>
                <p className="text-xs text-[#C4963A] font-bold tracking-wider uppercase mb-4">
                  L'environnement influence la valeur d'un bien avant d'en franchir la porte
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Un bien d'exception isolé dans une zone dénuée de services ne vaut pas le même prix qu'un bien similaire connecté à un tissu urbain dynamique. Nous analysons objectivement son intégration.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Accessibilité', 'Services', 'Mobilité', 'Environnement', "Potentiel d'évolution"].map(tag => (
                    <span key={tag} className="bg-gray-50 text-gray-600 text-[10px] font-semibold px-3 py-1 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* COUCHE 2 */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:border-[#C4963A] transition-all">
              <span className="text-4xl font-black text-[#C4963A] leading-none shrink-0">02</span>
              <div>
                <h3 className="font-black text-xl text-[#0F0F0F] uppercase mb-2">L'Immeuble & la Résidence</h3>
                <p className="text-xs text-[#C4963A] font-bold tracking-wider uppercase mb-4">
                  Deux appartements identiques ne valent pas la même chose dans deux immeubles différents
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Le standing de l'immeuble, sa maintenance, sa sécurité physique et ses facilités (parking, ascenseur) déterminent la pérennité de votre investissement et votre confort au quotidien.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Parties communes', 'Sécurité active', 'Gardiennage', 'Parking', 'Maintenance & Syndic', 'Qualité générale'].map(tag => (
                    <span key={tag} className="bg-gray-50 text-gray-600 text-[10px] font-semibold px-3 py-1 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* COUCHE 3 */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:border-[#C4963A] transition-all">
              <span className="text-4xl font-black text-[#C4963A] leading-none shrink-0">03</span>
              <div>
                <h3 className="font-black text-xl text-[#0F0F0F] uppercase mb-2">Le Bien Immobilier</h3>
                <p className="text-xs text-[#C4963A] font-bold tracking-wider uppercase mb-4">
                  L'analyse granulaire et technique du produit final
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Qu'il s'agisse d'un studio, d'un appartement familial, d'un duplex ou d'une villa, nous procédons à une analyse fine de l'habitabilité réelle et des caractéristiques intérieures.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Distribution des pièces', 'Luminosité naturelle', 'Qualité des finitions', 'Données techniques', 'Confort d\'usage', 'Cohérence globale'].map(tag => (
                    <span key={tag} className="bg-gray-50 text-gray-600 text-[10px] font-semibold px-3 py-1 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION : COHÉRENCE DÉCISIONNELLE (Notre objectif) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4 select-none">
            RATIONALISER LE CHOIX
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase mb-8">
            Nous ne vous dirons jamais si un bien est bon ou mauvais
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-12">
            À la fin d'un diagnostic MAMLEK, nous ne posons pas de jugement subjectif à l'emporte-pièce. Nous répondons à une question unique, rationnelle et adaptée : <br />
            <span className="text-[#0F0F0F] font-bold">« Cette opportunité est-elle cohérente pour votre projet immobilier ? »</span>
          </p>

          <div className="border border-gray-100 rounded-3xl p-8 bg-[#FAFAF8] inline-flex flex-col md:flex-row items-center gap-8 justify-around w-full">
            <div className="text-center">
              <span className="text-xs text-gray-400 block uppercase mb-1">Avant MAMLEK</span>
              <span className="text-lg font-black text-red-500/80 uppercase">Décision Émotionnelle</span>
            </div>
            <div className="h-px w-12 bg-gray-200 md:h-12 md:w-px" />
            <div className="text-center">
              <span className="text-xs text-gray-400 block uppercase mb-1">Avec MAMLEK</span>
              <span className="text-lg font-black text-[#C4963A] uppercase">Décision Rationnelle</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : BASE DE CONNAISSANCES COLLECTIVE ── */}
      <section id="connaissances" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
                BASE DE CONNAISSANCES COLLECTIVE
              </p>
              <h2 className="text-3xl font-black tracking-tight text-[#0F0F0F] uppercase mb-6">
                Chaque analyse enrichit le référentiel commun
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Chaque visite effectuée sur le terrain, chaque évaluation de résidence et chaque retour d'expérience structuré alimente progressivement une base de données de confiance.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                MAMLEK ne se contente pas de juger un appartement isolé : nous bâtissons la mémoire et la vérité documentaire du marché immobilier.
              </p>
            </div>

            <div className="bg-[#111008] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <span className="absolute top-6 right-6 text-[10px] font-bold tracking-widest text-[#C4963A] uppercase">Ref. 2026</span>
              <h4 className="text-lg font-bold text-[#C4963A] mb-6">Le Référentiel MAMLEK</h4>
              
              <ul className="space-y-4 text-xs text-white/70">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C4963A] shrink-0" />
                  <span>Registre historique des visites par quartier</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C4963A] shrink-0" />
                  <span>Base comparative des prix réels vs. prix affichés</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C4963A] shrink-0" />
                  <span>Cartographie objective des résidences évaluées</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C4963A] shrink-0" />
                  <span>Indexation technique et structurelle du bâti</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : NOTRE CONTENU (Le moteur de l'intelligence) ─── */}
      <section className="py-24 px-6 bg-[#FAFAF8] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
              AMÉLIORER LA TRANSPARENCE
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#0F0F0F] uppercase mb-4">
              Notre Contenu est notre Moteur
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Nous ne publions pas pour "faire des vues". Notre but est d'équiper chaque acteur avec des données et analyses réelles et objectives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Analyses de Quartiers", desc: "Décryptages complets des forces, faiblesses et perspectives de valorisation des zones clés." },
              { title: "Rapports Terrain", desc: "Retours d'expérience bruts issus de visites réelles avec promoteurs, agents et constructeurs." },
              { title: "Échanges d'Experts", desc: "Discussions et entretiens de fond avec notaires, juristes et architectes sur les réglementations." }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200/60 p-6 rounded-2xl shadow-sm hover:border-[#C4963A] transition-all">
                <BookOpen className="w-6 h-6 text-[#C4963A] mb-4" />
                <h4 className="font-bold text-sm uppercase text-[#0F0F0F] mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION : CROYANCE & FIN DE LA PAGE ── */}
      <section className="py-28 px-6 bg-[#111008] text-white relative overflow-hidden text-center">
        {/* Scattered gold dots on dark */}
        <span className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute bottom-12 right-12 w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-35" />

        <div className="max-w-2xl mx-auto">
          
          <img
            src="/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg"
            alt="MAMLEK Logo"
            className="w-16 h-16 object-contain mx-auto mb-8 opacity-90 rounded-full bg-white/5 p-1"
          />

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 uppercase">
            Une meilleure information crée de meilleures décisions.
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-[#C4963A] mb-12 uppercase">
            Et de meilleures décisions créent un marché plus transparent.
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onInscription}
              className="w-full sm:w-auto bg-[#C4963A] text-white text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-[#B8862E] active:scale-[0.98] transition-all shadow-lg"
            >
              Créer un compte
            </button>
            <button 
              onClick={onConnexion}
              className="w-full sm:w-auto border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-xl hover:border-white/40 hover:text-white transition-all"
            >
              Se connecter
            </button>
          </div>

          <div className="w-16 h-px bg-[#C4963A] mx-auto mb-6" />
          <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
            MAMLEK · Real Estate Intelligence · 2026
          </p>

        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <footer className="bg-[#0A0A05] px-6 py-8 text-center border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
            © 2026 MAMLEK. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-6 text-[9px] tracking-[0.2em] text-white/30 uppercase">
            <a href="#mission" className="hover:text-white transition-colors">PRODUIT</a>
            <a href="#protocole" className="hover:text-white transition-colors">MÉTHODOLOGIE</a>
            <a href="#connaissances" className="hover:text-white transition-colors">BASE</a>
            <button onClick={onConnexion} className="hover:text-white transition-colors uppercase">ESPACE AGENT</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
