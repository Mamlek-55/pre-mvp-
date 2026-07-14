import { useState } from 'react';
import { Visite, Etape } from '../types';
import { ChevronLeft, Check, ArrowRight } from 'lucide-react';
import { StarRating } from './StarRating';

interface Props {
  onSauvegarder: (visite: Visite) => void;
  onAnnuler: () => void;
}

// Valeurs initiales
const quartierInit = {
  nom: '',
  securite: 3,
  accessibilite: 3,
  bruit: 3,
  services: 3,
  attractivite: 3,
  qualiteVie: 3,
};

const immeubleInit = {
  type: 'R+5' as const,
  ascenseur: false,
  cameras: false,
  gardiennage: false,
  etatEntretien: 3,
  securiteEntree: 3,
  qualiteStructurale: 3,
};

const appartementInit = {
  type: 'F3' as const,
  prixObserve: 0,
  prixEstime: 0,
  etatGeneral: 3,
  finitions: 3,
  luminosite: 3,
  confort: 3,
  dressing: false,
  doucheItalienne: false,
  notes: '',
};

export function NouvelleVisite({ onSauvegarder, onAnnuler }: Props) {
  const [etape, setEtape] = useState<Etape>(1);
  const [quartier, setQuartier] = useState(quartierInit);
  const [immeuble, setImmeuble] = useState(immeubleInit);
  const [appartement, setAppartement] = useState(appartementInit);

  // Calcul des scores
  const calculerScoreQuartier = () => {
    const { securite, accessibilite, bruit, services, attractivite, qualiteVie } = quartier;
    return (securite + accessibilite + bruit + services + attractivite + qualiteVie) / 6;
  };

  const calculerScoreImmeuble = () => {
    const { ascenseur, cameras, gardiennage, etatEntretien, securiteEntree, qualiteStructurale } = immeuble;
    const bonusEquipements = (ascenseur ? 1 : 0) + (cameras ? 1 : 0) + (gardiennage ? 1 : 0);
    const notes = etatEntretien + securiteEntree + qualiteStructurale;
    return ((bonusEquipements * 1.5) + notes) / 7.5 * 5;
  };

  const calculerScoreAppartement = () => {
    const { etatGeneral, finitions, luminosite, confort, dressing, doucheItalienne, prixEstime, prixObserve } = appartement;
    const notes = (etatGeneral + finitions + luminosite + confort) / 4;
    const bonus = (dressing ? 0.3 : 0) + (doucheItalienne ? 0.3 : 0);
    const ecartPrix = prixObserve > 0 && prixEstime > 0
      ? Math.max(0, 2 - (Math.abs(prixObserve - prixEstime) / prixEstime) * 4)
      : 2;
    return Math.min(5, Math.max(1, notes + bonus + (ecartPrix / 2)));
  };

  const calculerScoreGlobal = () => {
    return (calculerScoreQuartier() + calculerScoreImmeuble() + calculerScoreAppartement()) / 3;
  };

  const getStatut = (score: number): Visite['statut'] => {
    if (score >= 4) return 'excellent';
    if (score >= 3) return 'bon';
    if (score >= 2) return 'moyen';
    return 'faible';
  };

  const peutAvancer = () => {
    if (etape === 1) return quartier.nom.trim() !== '';
    if (etape === 2) return true;
    if (etape === 3) return appartement.prixObserve > 0;
    return true;
  };

  const valider = () => {
    if (!peutAvancer()) return;

    if (etape < 3) {
      setEtape((etape + 1) as Etape);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const scoreQuartier = calculerScoreQuartier();
      const scoreImmeuble = calculerScoreImmeuble();
      const scoreAppartement = calculerScoreAppartement();
      const scoreGlobal = calculerScoreGlobal();

      const visite: Visite = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        quartier,
        immeuble,
        appartement,
        scoreQuartier,
        scoreImmeuble,
        scoreAppartement,
        scoreGlobal,
        statut: getStatut(scoreGlobal),
      };
      onSauvegarder(visite);
    }
  };

  const getTitreEtape = () => {
    if (etape === 1) return 'Analyse quartier';
    if (etape === 2) return 'Analyse immeuble';
    return 'Analyse appartement';
  };

  const getLibelleAction = () => {
    if (etape === 1) return "Terminer l'analyse quartier";
    if (etape === 2) return "Terminer l'analyse immeuble";
    return 'Terminer la visite';
  };

  // Composant Slider
  const Slider = ({ valeur, onChange, label }: { valeur: number; onChange: (v: number) => void; label: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <StarRating value={valeur} onChange={onChange} size={26} showValue />
      </div>
    </div>
  );

  // Composant Toggle
  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl w-full mb-2"
    >
      <span className="text-sm text-gray-700">{label}</span>
      <div className={`w-12 h-7 rounded-full p-1 transition-colors ${checked ? 'bg-gold-500' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </button>
  );

  // Composant Select
  const Select = ({ valeur, onChange, label, options }: { valeur: string; onChange: (v: string) => void; label: string; options: string[] }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                   focus:border-gold-500 focus:outline-none focus:bg-white transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  // Composant Input numerique
  const InputNombre = ({ valeur, onChange, label, suffixe = '' }: { valeur: number; onChange: (v: number) => void; label: string; suffixe?: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, valeur - (suffixe === ' M' ? 1 : 500000)))}
          className="w-10 h-10 bg-gold-100 text-gold-700 rounded-lg text-lg font-bold hover:bg-gold-200"
        >
          -
        </button>
        <input
          type="number"
          value={valeur}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl py-2 focus:border-gold-500 focus:outline-none"
        />
        <button
          onClick={() => onChange(valeur + (suffixe === ' M' ? 1 : 500000))}
          className="w-10 h-10 bg-gold-100 text-gold-700 rounded-lg text-lg font-bold hover:bg-gold-200"
        >
          +
        </button>
      </div>
      {suffixe && <p className="text-xs text-gray-400 text-center mt-1">En {suffixe.trim()}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-cream relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'url(/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg)',
          backgroundSize: '500px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={etape === 1 ? onAnnuler : () => setEtape((etape - 1) as Etape)}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 text-center px-4">
            <p className="text-xs text-gray-400 font-medium">Etape {etape}/3</p>
            <h1 className="text-base font-semibold text-gray-800">{getTitreEtape()}</h1>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 flex gap-1.5">
          {[1, 2, 3].map((e) => (
            <div
              key={e}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300
                         ${e <= etape ? 'bg-gold-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        {/* ETAPE 1: QUARTIER */}
        {etape === 1 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du quartier *
              </label>
              <input
                type="text"
                value={quartier.nom}
                onChange={(e) => setQuartier({ ...quartier, nom: e.target.value })}
                placeholder="Ex: Hydra, Alger Centre, Bir Mourad..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                           focus:border-gold-500 focus:outline-none focus:bg-white transition-colors"
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Evaluation du quartier (1-5)</h3>

              <Slider
                label="Securite percue"
                valeur={quartier.securite}
                onChange={(v) => setQuartier({ ...quartier, securite: v })}
              />
              <Slider
                label="Accessibilite"
                valeur={quartier.accessibilite}
                onChange={(v) => setQuartier({ ...quartier, accessibilite: v })}
              />
              <Slider
                label="Niveau de bruit (5 = calme)"
                valeur={quartier.bruit}
                onChange={(v) => setQuartier({ ...quartier, bruit: v })}
              />
              <Slider
                label="Services a proximite"
                valeur={quartier.services}
                onChange={(v) => setQuartier({ ...quartier, services: v })}
              />
              <Slider
                label="Attractivite generale"
                valeur={quartier.attractivite}
                onChange={(v) => setQuartier({ ...quartier, attractivite: v })}
              />
              <Slider
                label="Qualite de vie"
                valeur={quartier.qualiteVie}
                onChange={(v) => setQuartier({ ...quartier, qualiteVie: v })}
              />
            </div>

            {/* Score preview */}
            <div className="bg-gold-50 rounded-2xl p-4 text-center border border-gold-200">
              <p className="text-xs text-gold-600 font-medium">Score quartier</p>
              <p className="text-2xl font-bold text-gold-700">{calculerScoreQuartier().toFixed(1)}/5</p>
            </div>
          </div>
        )}

        {/* ETAPE 2: IMMEUBLE */}
        {etape === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <Select
                label="Type d'immeuble"
                valeur={immeuble.type}
                onChange={(v) => setImmeuble({ ...immeuble, type: v as typeof immeuble.type })}
                options={['R+3', 'R+5', 'R+10', 'R+15', 'Villa', 'Duplex']}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Equipements</h3>
              <Toggle
                label="Ascenseur"
                checked={immeuble.ascenseur}
                onChange={(v) => setImmeuble({ ...immeuble, ascenseur: v })}
              />
              <Toggle
                label="Cameras de surveillance"
                checked={immeuble.cameras}
                onChange={(v) => setImmeuble({ ...immeuble, cameras: v })}
              />
              <Toggle
                label="Gardiennage"
                checked={immeuble.gardiennage}
                onChange={(v) => setImmeuble({ ...immeuble, gardiennage: v })}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Evaluation (1-5)</h3>

              <Slider
                label="Etat d'entretien"
                valeur={immeuble.etatEntretien}
                onChange={(v) => setImmeuble({ ...immeuble, etatEntretien: v })}
              />
              <Slider
                label="Securite de l'entree"
                valeur={immeuble.securiteEntree}
                onChange={(v) => setImmeuble({ ...immeuble, securiteEntree: v })}
              />
              <Slider
                label="Qualite structurelle"
                valeur={immeuble.qualiteStructurale}
                onChange={(v) => setImmeuble({ ...immeuble, qualiteStructurale: v })}
              />
            </div>

            {/* Score preview */}
            <div className="bg-gold-50 rounded-2xl p-4 text-center border border-gold-200">
              <p className="text-xs text-gold-600 font-medium">Score immeuble</p>
              <p className="text-2xl font-bold text-gold-700">{calculerScoreImmeuble().toFixed(1)}/5</p>
            </div>
          </div>
        )}

        {/* ETAPE 3: APPARTEMENT */}
        {etape === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <Select
                label="Type de bien"
                valeur={appartement.type}
                onChange={(v) => setAppartement({ ...appartement, type: v as typeof appartement.type })}
                options={['Studio', 'F1', 'F2', 'F3', 'F4', 'F5+', 'Duplex', 'Villa']}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Prix</h3>
              <InputNombre
                label="Prix observe *"
                valeur={appartement.prixObserve}
                onChange={(v) => setAppartement({ ...appartement, prixObserve: v })}
                suffixe=" M"
              />
              <InputNombre
                label="Prix estime marche"
                valeur={appartement.prixEstime}
                onChange={(v) => setAppartement({ ...appartement, prixEstime: v })}
                suffixe=" M"
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Evaluation (1-5)</h3>

              <Slider
                label="Etat general"
                valeur={appartement.etatGeneral}
                onChange={(v) => setAppartement({ ...appartement, etatGeneral: v })}
              />
              <Slider
                label="Qualite finitions"
                valeur={appartement.finitions}
                onChange={(v) => setAppartement({ ...appartement, finitions: v })}
              />
              <Slider
                label="Luminosite"
                valeur={appartement.luminosite}
                onChange={(v) => setAppartement({ ...appartement, luminosite: v })}
              />
              <Slider
                label="Confort"
                valeur={appartement.confort}
                onChange={(v) => setAppartement({ ...appartement, confort: v })}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Equipements</h3>
              <Toggle
                label="Dressing"
                checked={appartement.dressing}
                onChange={(v) => setAppartement({ ...appartement, dressing: v })}
              />
              <Toggle
                label="Douche italienne"
                checked={appartement.doucheItalienne}
                onChange={(v) => setAppartement({ ...appartement, doucheItalienne: v })}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes libres</label>
              <textarea
                value={appartement.notes}
                onChange={(e) => setAppartement({ ...appartement, notes: e.target.value })}
                placeholder="Observations supplementaires..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                           focus:border-gold-500 focus:outline-none focus:bg-white resize-none"
              />
            </div>

            {/* Score preview */}
            <div className="bg-gold-50 rounded-2xl p-4 text-center border border-gold-200">
              <p className="text-xs text-gold-600 font-medium">Score appartement</p>
              <p className="text-2xl font-bold text-gold-700">{calculerScoreAppartement().toFixed(1)}/5</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-5 py-4">
        <button
          onClick={valider}
          disabled={!peutAvancer()}
          className="w-full py-4 bg-gold-500 text-white rounded-xl font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-gold-600 active:scale-[0.98] transition-all
                     flex items-center justify-center gap-2"
        >
          {etape < 3 ? (
            <>
              {getLibelleAction()}
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              {getLibelleAction()}
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
