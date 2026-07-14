import { useState } from 'react';
import { ArrowRight, Shield, MapPin, Building2, Home, Check, X, Quote } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onConnexion: () => void;
  onInscription: () => void;
}

export function PublicLanding({ onConnexion, onInscription }: Props) {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [leadSoumis, setLeadSoumis] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSoumettreLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim() || !telephone.trim()) {
      setErreur('Veuillez remplir les champs obligatoires (Nom, Email, Téléphone).');
      return;
    }
    setErreur('');
    
    // Sauvegarder la demande localement (simulé avant branchement backend)
    const prospects = JSON.parse(localStorage.getItem('mamlek-demandes-analyse') || '[]');
    const nouveauProspect = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      nom,
      email,
      telephone,
      localisation,
      message,
      statut: 'nouveau'
    };
    localStorage.setItem('mamlek-demandes-analyse', JSON.stringify([nouveauProspect, ...prospects]));

    setLeadSoumis(true);
    // Reset form after a brief moment or when closing
  };

  const fermerModal = () => {
    setModalOuvert(false);
    setLeadSoumis(false);
    setNom('');
    setEmail('');
    setTelephone('');
    setLocalisation('');
    setMessage('');
    setErreur('');
  };

  return (
    <div className="min-h-screen bg-white text-[#0F0F0F] font-sans selection:bg-[#F3EAD3] selection:text-[#9A5F28]">
      
      {/* ── COUCHE DÉCORATIVE (Signature MAMLEK : points dorés) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[8%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-40" />
        <span className="absolute top-[15%] right-[12%] w-1 h-1 rounded-full bg-[#C4963A] opacity-30" />
        <span className="absolute top-[45%] left-[6%] w-1 h-1 rounded-full bg-[#C4963A] opacity-35" />
        <span className="absolute top-[65%] right-[8%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-25" />
        <span className="absolute bottom-[20%] left-[15%] w-1 h-1 rounded-full bg-[#C4963A] opacity-20" />
        <span className="absolute bottom-[10%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-30" />
      </div>

      {/* ── HEADER (Navbar) ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <Logo size={32} />
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-[#0F0F0F] uppercase leading-none">MAMLEK</span>
              <span className="text-[8px] tracking-[0.18em] text-[#C4963A] uppercase font-bold leading-none mt-1">Property Intelligence</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#probleme" className="hover:text-black transition-colors">Le Problème</a>
            <a href="#methode" className="hover:text-black transition-colors">La Méthode</a>
            <a href="#avant-apres" className="hover:text-black transition-colors">Avant / Après</a>
            <a href="#agents" className="hover:text-black transition-colors">Espace Agents</a>
            <a href="#temoignages" className="hover:text-black transition-colors">Avis clients</a>
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
          
          {/* Badge Confiance */}
          <div className="inline-flex items-center gap-2 bg-[#FEF7E7] border border-[#FDEEC8] px-4 py-1.5 rounded-full mb-8 select-none">
            <Shield className="w-3.5 h-3.5 text-[#C4963A]" />
            <span className="text-[10px] font-bold tracking-widest text-[#C4963A] uppercase">
              RÉDUIRE L'INCERTITUDE IMMOBILIÈRE
            </span>
          </div>

          {/* Titre Émotionnel */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0F0F0F] leading-[1.1] mb-8 select-none">
            Acheter un bien immobilier <br />
            ne devrait jamais être <br />
            <span className="text-[#C4963A]">un pari.</span>
          </h1>

          {/* Sous-titre centré sur le Héros (L'acquéreur) */}
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Avant de prendre une grande décision immobilière, comprenez réellement ce que vous achetez grâce à une analyse structurée du quartier, de la résidence et du bien lui-même.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setModalOuvert(true)}
              className="w-full sm:w-auto bg-[#0F0F0F] text-white rounded-xl py-4 px-8 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-md"
            >
              Demander une analyse
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onInscription}
              className="w-full sm:w-auto border border-gray-200 bg-white text-[#0F0F0F] rounded-xl py-4 px-8 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-[#C4963A] hover:bg-[#FEFBF4] transition-all"
            >
              Créer un compte
            </button>
          </div>

        </div>
      </section>

      {/* ── SECTION : LE PROBLÈME (Le visiteur est le héros, MAMLEK le guide) ── */}
      <section id="probleme" className="py-24 px-6 border-y border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
              L'ENJEU FINANCIER D'UNE VIE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase">
              Plus qu'une simple visite.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-black text-xl uppercase leading-snug">
                Pourquoi prendre des risques sur votre décision la plus importante ?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Aujourd’hui, la plupart des décisions immobilières reposent sur des photos retouchées, des discours commerciaux enthousiastes, des impressions subjectives à la va-vite et des données floues ou éparpillées.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pourtant, l'achat d'un logement ou d'un immeuble représente souvent le plus grand investissement de votre patrimoine. Pour avancer en toute sécurité, il vous faut plus que des promesses. Il vous faut comprendre avec certitude ce que vous achetez.
              </p>
            </div>

            <div className="border border-gray-100 rounded-3xl p-8 bg-[#FAFAF8] space-y-6">
              <div className="flex gap-4 items-start">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <div>
                  <h4 className="font-bold text-xs uppercase leading-none mb-1">Discours Commercial</h4>
                  <span className="text-[11px] text-gray-400">Des promesses orales invérifiables.</span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <div>
                  <h4 className="font-bold text-xs uppercase leading-none mb-1">Photos Séduisantes</h4>
                  <span className="text-[11px] text-gray-400">Des angles qui cachent les réelles faiblesses.</span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <div>
                  <h4 className="font-bold text-xs uppercase leading-none mb-1">Pression Emotionnelle</h4>
                  <span className="text-[11px] text-gray-400">Le risque d'acheter sur un coup de tête.</span>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <p className="text-[10px] font-bold text-[#C4963A] uppercase tracking-wider text-center">
                MAMLEK vous apporte la structure objective manquante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : EXPLIQUER LA MÉTHODE (Concept des 3 couches naturel) ── */}
      <section id="methode" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
              EXPÉRIENCE DE DÉCOUVERTE NATURELLE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase">
              La Méthode d'Analyse Structurée
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-4">
              MAMLEK digitalise simplement la manière innée dont tout être humain découvre un bien en décomposant l'évaluation en 3 couches logiques.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ETAPE 1 */}
            <div className="bg-[#FAFAF8] border border-gray-100 rounded-3xl p-8 hover:border-[#C4963A] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <MapPin className="w-5 h-5 text-[#C4963A]" />
                </div>
                <span className="text-2xl font-black text-[#C4963A] leading-none block mb-2">01</span>
                <h4 className="font-black text-base uppercase mb-3 text-[#0F0F0F]">Le Quartier</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Où se situe réellement le bien ? Nous étudions l'environnement, l'accessibilité aux services de proximité, la sécurité globale, le bruit et le potentiel d'évolution de la zone.
                </p>
              </div>
            </div>

            {/* ETAPE 2 */}
            <div className="bg-[#FAFAF8] border border-gray-100 rounded-3xl p-8 hover:border-[#C4963A] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <Building2 className="w-5 h-5 text-[#C4963A]" />
                </div>
                <span className="text-2xl font-black text-[#C4963A] leading-none block mb-2">02</span>
                <h4 className="font-black text-base uppercase mb-3 text-[#0F0F0F]">L'Immeuble</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Dans quel cadre collectif allez-vous vivre ? Nous évaluons l'état des parties communes, la sécurité des entrées, la maintenance générale, la présence d'ascenseur ou de gardien.
                </p>
              </div>
            </div>

            {/* ETAPE 3 */}
            <div className="bg-[#FAFAF8] border border-gray-100 rounded-3xl p-8 hover:border-[#C4963A] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <Home className="w-5 h-5 text-[#C4963A]" />
                </div>
                <span className="text-2xl font-black text-[#C4963A] leading-none block mb-2">03</span>
                <h4 className="font-black text-base uppercase mb-3 text-[#0F0F0F]">Le Bien Immobilier</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Quelle est la qualité interne du produit ? Nous analysons en détail la distribution des pièces, la luminosité naturelle, les finitions intérieures, les aspects thermiques et la cohérence globale du prix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : AVANT / APRÈS ── */}
      <section id="avant-apres" className="py-24 px-6 bg-[#FAFAF8] border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
              LA TRANSFORMATION DÉCISIONNELLE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase">
              La clarté remplace le doute
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AVANT */}
            <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500/80 block mb-6">Avant MAMLEK</span>
              
              <ul className="space-y-4">
                {[
                  "Décisions prises uniquement à l'intuition ou sur un coup de cœur risqué.",
                  "Difficulté immense à comparer objectivement deux biens différents.",
                  "Manque cruel de critères et de mesures objectifs pour négocier.",
                  "Sentiment constant d'incertitude et peur de se faire tromper."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* APRES */}
            <div className="bg-white border border-[#C4963A] rounded-3xl p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C4963A] block mb-6">Avec MAMLEK</span>
              
              <ul className="space-y-4">
                {[
                  "Une analyse claire, rationnelle et détaillée de chaque composante.",
                  "Une compréhension approfondie de l'état réel et de l'environnement.",
                  "Des critères structurés et quantifiables facilitant les arbitrages.",
                  "Une décision confiante, sereine et basée sur de véritables faits de terrain."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs text-gray-700 leading-relaxed">
                    <span className="text-[#C4963A] font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setModalOuvert(true)}
              className="inline-flex items-center gap-3 bg-[#0F0F0F] text-white rounded-xl py-4 px-8 font-bold text-xs uppercase tracking-widest hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-md"
            >
              Faire analyser mon futur bien
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION POUR LES AGENTS IMMOBILIERS ── */}
      <section id="agents" className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
                ESPACE PROFESSIONNEL
              </p>
              <h2 className="text-3xl font-black tracking-tight text-[#0F0F0F] uppercase leading-tight mb-6">
                Donnez une nouvelle dimension à vos présentations.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Les clients d’aujourd’hui ne cherchent plus seulement à faire défiler de jolies photos sur leur téléphone. Ils cherchent des réponses réelles et des critères de confiance.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Avec l'application MAMLEK, structurez vos visites, évaluez vos mandats avec une méthode professionnelle reconnue et partagez des diagnostics clairs qui rassureront vos acquéreurs.
              </p>

              <button 
                onClick={onInscription}
                className="w-full sm:w-auto bg-[#0F0F0F] text-white rounded-xl py-4 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all"
              >
                Tester gratuitement pendant 21 jours
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-gray-100 rounded-3xl p-8 bg-[#FAFAF8] space-y-6">
              <h4 className="font-bold text-xs uppercase text-gray-400">Ce que l'outil apporte aux Agents :</h4>
              <ul className="space-y-4 text-xs">
                <li className="flex gap-3">
                  <span className="text-[#C4963A] font-bold">✓</span>
                  <div>
                    <strong className="text-black font-semibold uppercase text-[10px] tracking-wide block">Analyses Structurées</strong>
                    <span className="text-gray-500">Générez un rapport détaillé en 3 étapes directement depuis le terrain.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C4963A] font-bold">✓</span>
                  <div>
                    <strong className="text-black font-semibold uppercase text-[10px] tracking-wide block">Crédibilité Accrue</strong>
                    <span className="text-gray-500">Présentez des données chiffrées sur le quartier, le bâti et le prix.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C4963A] font-bold">✓</span>
                  <div>
                    <strong className="text-black font-semibold uppercase text-[10px] tracking-wide block">Expérience Client Unique</strong>
                    <span className="text-gray-500">Offrez un diagnostic papier ou PDF transparent à vos clients acheteurs.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C4963A] font-bold">✓</span>
                  <div>
                    <strong className="text-black font-semibold uppercase text-[10px] tracking-wide block">Différenciation Majeure</strong>
                    <span className="text-gray-500">Démarquez-vous de la concurrence par la rigueur et l'objectivité.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION PREUVE (Frustrations réelles des acheteurs) ── */}
      <section id="temoignages" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C4963A] uppercase mb-4">
              VOS INQUIÉTUDES SONT LÉGITIMES
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F0F0F] uppercase">
              Vous avez les mêmes questions
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Comment savoir si le prix affiché est vraiment juste par rapport à l'état réel et à la zone ?", author: "Acheteur diaspora, Paris" },
              { text: "Chaque agent immobilier me dit que son appartement est le meilleur du quartier. Je ne sais plus qui croire.", author: "Famille acquéreur, Alger" },
              { text: "Il est presque impossible de comparer objectivement deux résidences différentes sans grille commune.", author: "Investisseur locatif, Oran" }
            ].map((t, idx) => (
              <div key={idx} className="border border-gray-100 p-6 rounded-2xl bg-[#FAFAF8] shadow-sm relative flex flex-col justify-between">
                <Quote className="w-8 h-8 text-[#C4963A]/20 absolute top-4 right-4" />
                <p className="text-xs text-gray-600 leading-relaxed italic mb-6 z-10 pt-2">
                  "{t.text}"
                </p>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t.author}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-[#FEF7E7] border border-[#FDEEC8] rounded-2xl p-6 mt-10 text-center max-w-2xl mx-auto">
            <p className="text-xs text-[#9A5F28] leading-relaxed">
              <strong>MAMLEK a été créé pour répondre précisément à cela.</strong> Nous traduisons vos doutes en critères techniques et mesurables, pour qu'aucune décision ne reste un pari.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION FINALE & CTA DE CONVERSION ── */}
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
            Comprenez avant de décider.
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-[#C4963A] mb-12 uppercase">
            Réduisez l'incertitude de votre prochain investissement.
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => setModalOuvert(true)}
              className="w-full sm:w-auto bg-[#C4963A] text-white text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-[#B8862E] active:scale-[0.98] transition-all shadow-lg"
            >
              Demander une analyse
            </button>
            <button 
              onClick={onInscription}
              className="w-full sm:w-auto border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-xl hover:border-white/40 hover:text-white transition-all"
            >
              Créer un compte agent
            </button>
          </div>

          <div className="w-16 h-px bg-[#C4963A] mx-auto mb-6" />
          <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
            MAMLEK · Real Estate Intelligence · 2026
          </p>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A05] px-6 py-8 text-center border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
            © 2026 MAMLEK. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-6 text-[9px] tracking-[0.2em] text-white/30 uppercase">
            <a href="#probleme" className="hover:text-white transition-colors">PROBLÈMES</a>
            <a href="#methode" className="hover:text-white transition-colors">MÉTHODOLOGIE</a>
            <a href="#avant-apres" className="hover:text-white transition-colors">COMPARAISON</a>
            <button onClick={onConnexion} className="hover:text-white transition-colors uppercase">CONNEXION AGENT</button>
          </div>
        </div>
      </footer>

      {/* ── MODAL : CAPTURE DE LEAD (DEMANDE D'ANALYSE) ── */}
      {modalOuvert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
            
            {/* Scattered gold dots inside modal */}
            <span className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-30 pointer-events-none" />
            <span className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-[#C4963A] opacity-25 pointer-events-none" />

            <button 
              onClick={fermerModal}
              className="absolute top-6 right-6 p-1.5 rounded-xl border border-gray-100 text-gray-400 hover:text-black hover:bg-gray-50 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {!leadSoumis ? (
              <>
                <h3 className="text-xl font-black uppercase text-[#0F0F0F] mb-2 tracking-tight">
                  Demande d'analyse immobilière
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  Présentez-nous succinctement votre projet. Un de nos analystes immobiliers de terrain prendra contact avec vous sous 24h.
                </p>

                <form onSubmit={handleSoumettreLead} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                      Nom complet *
                    </label>
                    <input 
                      type="text"
                      required
                      value={nom}
                      onChange={e => setNom(e.target.value)}
                      placeholder="Ex: Yacine Benali"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C4963A] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                        Email *
                      </label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C4963A] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                        Téléphone *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)}
                        placeholder="Ex: 0555 12 34 56"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C4963A] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                      Ville ou quartier du bien (Optionnel)
                    </label>
                    <input 
                      type="text"
                      value={localisation}
                      onChange={e => setLocalisation(e.target.value)}
                      placeholder="Ex: Hydra, Alger / Oran Est"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C4963A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                      Quelques mots sur votre projet
                    </label>
                    <textarea 
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Ex: Achat d'un F4 en VEFA, doute sur le standing et le prix..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C4963A] transition-all resize-none"
                    />
                  </div>

                  {erreur && (
                    <p className="text-[11px] text-red-500 font-semibold">{erreur}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#0F0F0F] text-white rounded-xl py-3 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-md mt-6"
                  >
                    Envoyer ma demande
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black uppercase text-[#0F0F0F]">
                  Demande Transmise !
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                  Merci <strong>{nom}</strong>. Votre demande d'analyse pour la zone de <strong>{localisation || 'votre choix'}</strong> a bien été enregistrée.
                </p>
                <p className="text-xs text-[#C4963A] font-semibold">
                  Un conseiller MAMLEK vous contactera par téléphone ({telephone}) très rapidement.
                </p>
                <button
                  onClick={fermerModal}
                  className="bg-[#0F0F0F] text-white rounded-xl py-3 px-6 font-bold text-xs uppercase tracking-widest hover:bg-[#1a1a1a] transition-all inline-block mt-6"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
