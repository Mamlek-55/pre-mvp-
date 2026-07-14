import { useState } from 'react';
import { ArrowLeft, Save, User, Target, MapPin, Home, Check, X, TrendingUp } from 'lucide-react';
import { Profil } from '../types';

interface Props {
  onEnregistrer: (profil: Profil) => void;
  onRetour: () => void;
}

const criteresMustOptions = [
  'Parking', 'Ascenseur', 'Balcon', 'Terrasse', 'Jardin', 'Securite 24/7',
  'Cave', 'Box', 'Climatisation', 'Chauffage central', 'Double vitrage',
  'Vue degagee', 'Calme', 'Proximite transport', 'Proximite ecoles',
  'Proximite commerces', 'Fibre optique', 'Domotique',
];

const refusOptions = [
  'Rez-de-chaussee', 'Dernier etage', 'Sans ascenseur', 'Sans parking',
  'Quartier bruyant', 'Bien a renover', 'Mitoyen', 'Sans balcon',
  'Etage eleve', 'Exposition nord',
];

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-[#C4963A]" />
        <h2 className="text-[11px] font-bold tracking-widest text-[#0F0F0F] uppercase">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-all";
const selectClass = inputClass;

function Chip({ active, onClick, children, variant = 'must' }: { active: boolean; onClick: () => void; children: React.ReactNode; variant?: 'must' | 'refus' }) {
  const activeClass = variant === 'must' ? 'bg-[#C4963A] text-white' : 'bg-red-500 text-white';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-all ${
        active ? activeClass : 'bg-white border border-gray-200 text-gray-500'
      }`}
    >
      {children}
    </button>
  );
}

export function NouveauProfil({ onEnregistrer, onRetour }: Props) {
  // IDENTITE
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [profession, setProfession] = useState('');
  const [profilAcheteur, setProfilAcheteur] = useState<NonNullable<Profil['profilAcheteur']>>('resident');
  const [paysResidence, setPaysResidence] = useState('');
  const [villeResidence, setVilleResidence] = useState('');
  const [trancheAge, setTrancheAge] = useState<NonNullable<Profil['trancheAge']>>('26_35');
  const [contactPrefere, setContactPrefere] = useState<NonNullable<Profil['contactPrefere']>>('whatsapp');
  const [languePreferee, setLanguePreferee] = useState<NonNullable<Profil['languePreferee']>>('fr');

  // OBJECTIF
  const [objectif, setObjectif] = useState<'achat' | 'investissement'>('achat');
  const [usageBien, setUsageBien] = useState<NonNullable<Profil['usageBien']>>('residence_principale');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [delai, setDelai] = useState<NonNullable<Profil['delai']>>('1_3_mois');
  const [financement, setFinancement] = useState<NonNullable<Profil['financement']>>('non_defini');
  const [preavisVisite, setPreavisVisite] = useState<NonNullable<Profil['preavisVisite']>>('flexible');

  // LOCALISATION
  const [villeVisee, setVilleVisee] = useState('');
  const [quartierVise, setQuartierVise] = useState('');
  const [quartiersAlternatifs, setQuartiersAlternatifs] = useState('');

  // BIEN
  const [typeBien, setTypeBien] = useState<NonNullable<Profil['typeBien']>>('F3');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [surfaceMax, setSurfaceMax] = useState('');
  const [piecesMin, setPiecesMin] = useState('');
  const [chambresMin, setChambresMin] = useState('');
  const [etagePrefere, setEtagePrefere] = useState<NonNullable<Profil['etagePrefere']>>('indifferent');
  const [exposition, setExposition] = useState<NonNullable<Profil['exposition']>>('indifferent');
  const [anneeConstructionMin, setAnneeConstructionMin] = useState('');
  const [neufOuAncien, setNeufOuAncien] = useState<NonNullable<Profil['neufOuAncien']>>('indifferent');

  // CRITERES
  const [criteresMust, setCriteresMust] = useState<string[]>([]);
  const [criteresRefus, setCriteresRefus] = useState<string[]>([]);

  // INVESTISSEUR
  const [rendementMin, setRendementMin] = useState('');
  const [budgetLoyerMax, setBudgetLoyerMax] = useState('');
  const [typeLocatif, setTypeLocatif] = useState<NonNullable<Profil['typeLocatif']>>('indifferent');
  const [plusValueAttendue, setPlusValueAttendue] = useState<NonNullable<Profil['plusValueAttendue']>>('indifferent');

  // SUIVI
  const [sourceLead, setSourceLead] = useState<NonNullable<Profil['sourceLead']>>('instagram');
  const [notes, setNotes] = useState('');

  const toggle = (list: string[], setter: (v: string[]) => void, value: string) => {
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
  };

  const handleEnregistrer = () => {
    if (!nom.trim()) return;

    const profil: Profil = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      nom,
      email,
      telephone,
      profession,
      profilAcheteur,
      paysResidence,
      villeResidence,
      trancheAge,
      contactPrefere,
      languePreferee,
      objectif,
      usageBien,
      budgetMin: Number(budgetMin) || undefined,
      budgetMax: Number(budgetMax) || 0,
      delai,
      financement,
      preavisVisite,
      villeVisee,
      quartierVise,
      quartiersAlternatifs,
      typeBien,
      surfaceMin: Number(surfaceMin) || undefined,
      surfaceMax: Number(surfaceMax) || undefined,
      piecesMin: Number(piecesMin) || undefined,
      chambresMin: Number(chambresMin) || undefined,
      etagePrefere,
      exposition,
      anneeConstructionMin: Number(anneeConstructionMin) || undefined,
      neufOuAncien,
      criteresMust,
      criteresRefus,
      rendementMin: Number(rendementMin) || undefined,
      budgetLoyerMax: Number(budgetLoyerMax) || undefined,
      typeLocatif,
      plusValueAttendue,
      sourceLead,
      statut: 'nouveau',
      notes,
    };

    onEnregistrer(profil);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-32">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onRetour} className="text-[#0F0F0F]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C4963A] uppercase">
            Nouveau lead
          </p>
          <h1 className="text-lg font-black text-[#0F0F0F] uppercase">Profil client detaille</h1>
        </div>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto space-y-5">

        {/* SECTION 1 - IDENTITE */}
        <Section icon={User} title="Identite & contact">
          <Field label="Nom complet *">
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: Karim Benali" className={inputClass} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" className={inputClass} />
            </Field>
            <Field label="Telephone">
              <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="06 XX XX XX XX" className={inputClass} />
            </Field>
          </div>

          <Field label="Profession">
            <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Ex: Entrepreneur, medecin..." className={inputClass} />
          </Field>

          <Field label="Profil acheteur">
            <div className="grid grid-cols-2 gap-2">
              {([
                ['resident', 'Resident'],
                ['diaspora', 'Diaspora'],
                ['investisseur', 'Investisseur'],
                ['premier_achat', '1er achat'],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setProfilAcheteur(val)}
                  className={`rounded-xl py-2.5 px-3 text-xs font-bold uppercase tracking-wide transition-all ${
                    profilAcheteur === val ? 'bg-[#0F0F0F] text-white' : 'bg-white border border-gray-200 text-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>

          {profilAcheteur === 'diaspora' && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Pays de residence">
                <input type="text" value={paysResidence} onChange={(e) => setPaysResidence(e.target.value)} placeholder="Ex: France, Canada..." className={inputClass} />
              </Field>
              <Field label="Ville de residence">
                <input type="text" value={villeResidence} onChange={(e) => setVilleResidence(e.target.value)} placeholder="Ex: Paris, Montreal..." className={inputClass} />
              </Field>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tranche d'age">
              <select value={trancheAge} onChange={(e) => setTrancheAge(e.target.value as any)} className={selectClass}>
                <option value="18_25">18-25 ans</option>
                <option value="26_35">26-35 ans</option>
                <option value="36_50">36-50 ans</option>
                <option value="51_65">51-65 ans</option>
                <option value="65_plus">65+ ans</option>
              </select>
            </Field>
            <Field label="Contact prefere">
              <select value={contactPrefere} onChange={(e) => setContactPrefere(e.target.value as any)} className={selectClass}>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="telephone">Telephone</option>
                <option value="sms">SMS</option>
              </select>
            </Field>
          </div>

          <Field label="Langue preferee">
            <select value={languePreferee} onChange={(e) => setLanguePreferee(e.target.value as any)} className={selectClass}>
              <option value="fr">Francais</option>
              <option value="ar">Arabe</option>
              <option value="en">Anglais</option>
            </select>
          </Field>
        </Section>

        {/* SECTION 2 - OBJECTIF */}
        <Section icon={Target} title="Objectif & budget">
          <Field label="Objectif principal">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setObjectif('achat')}
                className={`rounded-xl py-3 px-4 text-sm font-bold uppercase tracking-wide transition-all ${
                  objectif === 'achat' ? 'bg-[#0F0F0F] text-white' : 'bg-white border border-gray-200 text-gray-400'
                }`}
              >
                Achat
              </button>
              <button
                type="button"
                onClick={() => setObjectif('investissement')}
                className={`rounded-xl py-3 px-4 text-sm font-bold uppercase tracking-wide transition-all ${
                  objectif === 'investissement' ? 'bg-[#C4963A] text-white' : 'bg-white border border-gray-200 text-gray-400'
                }`}
              >
                Investissement
              </button>
            </div>
          </Field>

          <Field label="Usage du bien">
            <select value={usageBien} onChange={(e) => setUsageBien(e.target.value as any)} className={selectClass}>
              <option value="residence_principale">Residence principale</option>
              <option value="residence_secondaire">Residence secondaire</option>
              <option value="investissement_locatif">Investissement locatif</option>
              <option value="defiscalisation">Defiscalisation</option>
              <option value="placement">Placement / plus-value</option>
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Budget min (DA)">
              <input type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} placeholder="Ex: 2000000" className={inputClass} />
            </Field>
            <Field label="Budget max (DA) *">
              <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder="Ex: 3500000" className={inputClass} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Delai d'achat">
              <select value={delai} onChange={(e) => setDelai(e.target.value as any)} className={selectClass}>
                <option value="urgent">Urgent</option>
                <option value="1_3_mois">1 a 3 mois</option>
                <option value="3_6_mois">3 a 6 mois</option>
                <option value="6_12_mois">6 a 12 mois</option>
                <option value="flexible">Flexible</option>
              </select>
            </Field>
            <Field label="Financement">
              <select value={financement} onChange={(e) => setFinancement(e.target.value as any)} className={selectClass}>
                <option value="non_defini">Non defini</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="mixte">Mixte</option>
                <option value="en_cours_montage">En cours de montage</option>
              </select>
            </Field>
          </div>

          <Field label="Disponibilite pour visite">
            <select value={preavisVisite} onChange={(e) => setPreavisVisite(e.target.value as any)} className={selectClass}>
              <option value="immediat">Immediat</option>
              <option value="1_semaine">Sous 1 semaine</option>
              <option value="2_semaines">Sous 2 semaines</option>
              <option value="flexible">Flexible</option>
            </select>
          </Field>
        </Section>

        {/* SECTION 3 - LOCALISATION */}
        <Section icon={MapPin} title="Localisation recherchee">
          <Field label="Ville visee">
            <input type="text" value={villeVisee} onChange={(e) => setVilleVisee(e.target.value)} placeholder="Ex: Alger, Oran..." className={inputClass} />
          </Field>
          <Field label="Quartier vise">
            <input type="text" value={quartierVise} onChange={(e) => setQuartierVise(e.target.value)} placeholder="Ex: Hydra, El Biar..." className={inputClass} />
          </Field>
          <Field label="Quartiers alternatifs acceptes">
            <input type="text" value={quartiersAlternatifs} onChange={(e) => setQuartiersAlternatifs(e.target.value)} placeholder="Ex: Kouba, Bouzareah..." className={inputClass} />
          </Field>
        </Section>

        {/* SECTION 4 - CRITERES DU BIEN */}
        <Section icon={Home} title="Criteres du bien">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type de bien">
              <select value={typeBien} onChange={(e) => setTypeBien(e.target.value as any)} className={selectClass}>
                {['Studio', 'F1', 'F2', 'F3', 'F4', 'F5+', 'Duplex', 'Villa', 'Terrain', 'Commerce'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Pieces min.">
              <input type="number" value={piecesMin} onChange={(e) => setPiecesMin(e.target.value)} placeholder="Ex: 3" className={inputClass} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Surface min (m2)">
              <input type="number" value={surfaceMin} onChange={(e) => setSurfaceMin(e.target.value)} placeholder="Ex: 80" className={inputClass} />
            </Field>
            <Field label="Surface max (m2)">
              <input type="number" value={surfaceMax} onChange={(e) => setSurfaceMax(e.target.value)} placeholder="Ex: 150" className={inputClass} />
            </Field>
          </div>

          <Field label="Chambres min.">
            <input type="number" value={chambresMin} onChange={(e) => setChambresMin(e.target.value)} placeholder="Ex: 2" className={inputClass} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Etage prefere">
              <select value={etagePrefere} onChange={(e) => setEtagePrefere(e.target.value as any)} className={selectClass}>
                <option value="indifferent">Indifferent</option>
                <option value="rdc">Rez-de-chaussee</option>
                <option value="etage_intermediaire">Etage intermediaire</option>
                <option value="dernier_etage">Dernier etage</option>
              </select>
            </Field>
            <Field label="Exposition">
              <select value={exposition} onChange={(e) => setExposition(e.target.value as any)} className={selectClass}>
                <option value="indifferent">Indifferent</option>
                <option value="nord">Nord</option>
                <option value="sud">Sud</option>
                <option value="est">Est</option>
                <option value="ouest">Ouest</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Neuf / ancien">
              <select value={neufOuAncien} onChange={(e) => setNeufOuAncien(e.target.value as any)} className={selectClass}>
                <option value="indifferent">Indifferent</option>
                <option value="neuf">Neuf</option>
                <option value="ancien">Ancien</option>
              </select>
            </Field>
            <Field label="Annee construction min.">
              <input type="number" value={anneeConstructionMin} onChange={(e) => setAnneeConstructionMin(e.target.value)} placeholder="Ex: 2010" className={inputClass} />
            </Field>
          </div>
        </Section>

        {/* SECTION 5 - CRITERES MUST-HAVE & REFUS */}
        <Section icon={Check} title="Criteres obligatoires (must-have)">
          <div className="flex flex-wrap gap-2">
            {criteresMustOptions.map((c) => (
              <Chip key={c} active={criteresMust.includes(c)} onClick={() => toggle(criteresMust, setCriteresMust, c)}>
                {c}
              </Chip>
            ))}
          </div>
        </Section>

        <Section icon={X} title="Points rouges (refus)">
          <div className="flex flex-wrap gap-2">
            {refusOptions.map((c) => (
              <Chip key={c} variant="refus" active={criteresRefus.includes(c)} onClick={() => toggle(criteresRefus, setCriteresRefus, c)}>
                {c}
              </Chip>
            ))}
          </div>
        </Section>

        {/* SECTION 6 - INVESTISSEUR */}
        {objectif === 'investissement' && (
          <Section icon={TrendingUp} title="Critere investisseur">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Rendement min. (%)">
                <input type="number" value={rendementMin} onChange={(e) => setRendementMin(e.target.value)} placeholder="Ex: 6" className={inputClass} />
              </Field>
              <Field label="Loyer max (DA/mois)">
                <input type="number" value={budgetLoyerMax} onChange={(e) => setBudgetLoyerMax(e.target.value)} placeholder="Ex: 80000" className={inputClass} />
              </Field>
            </div>
            <Field label="Type de location">
              <select value={typeLocatif} onChange={(e) => setTypeLocatif(e.target.value as any)} className={selectClass}>
                <option value="indifferent">Indifferent</option>
                <option value="longue_duree">Longue duree</option>
                <option value="courte_duree">Courte duree</option>
                <option value="saisonnier">Saisonnier</option>
                <option value="airbnb">Airbnb</option>
              </select>
            </Field>
            <Field label="Plus-value attendue">
              <select value={plusValueAttendue} onChange={(e) => setPlusValueAttendue(e.target.value as any)} className={selectClass}>
                <option value="indifferent">Indifferent</option>
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="forte">Forte</option>
              </select>
            </Field>
          </Section>
        )}

        {/* SECTION 7 - SUIVI */}
        <Section icon={User} title="Suivi & notes">
          <Field label="Source du lead">
            <select value={sourceLead} onChange={(e) => setSourceLead(e.target.value as any)} className={selectClass}>
              <option value="instagram">Instagram</option>
              <option value="referral">Recommandation</option>
              <option value="site_web">Site web</option>
              <option value="evenement">Evenement</option>
              <option value="autre">Autre</option>
            </select>
          </Field>
          <Field label="Notes">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Contexte, motivations, contraintes specifiques..." rows={3} className={`${inputClass} resize-none`} />
          </Field>
        </Section>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={handleEnregistrer}
          disabled={!nom.trim()}
          className="w-full bg-[#0F0F0F] text-white rounded-xl py-4 px-6 font-bold text-sm
                     uppercase tracking-widest flex items-center justify-center gap-3
                     hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-lg
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          Enregistrer le profil
        </button>
      </div>
    </div>
  );
}
