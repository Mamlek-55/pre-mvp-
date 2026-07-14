// Types pour MAMLEK MVP - Infrastructure de collecte immobiliere

export interface Visite {
  id: string;
  createdAt: string;

  // ETAPE 1: QUARTIER
  quartier: {
    nom: string;
    securite: number;        // 1-5
    accessibilite: number;   // 1-5
    bruit: number;           // 1-5
    services: number;        // 1-5
    attractivite: number;    // 1-5
    qualiteVie: number;      // 1-5
  };

  // ETAPE 2: IMMEUBLE
  immeuble: {
    type: 'R+3' | 'R+5' | 'R+10' | 'R+15' | 'Villa' | 'Duplex';
    ascenseur: boolean;
    cameras: boolean;
    gardiennage: boolean;
    etatEntretien: number;      // 1-5
    securiteEntree: number;     // 1-5
    qualiteStructurale: number; // 1-5
  };

  // ETAPE 3: APPARTEMENT
  appartement: {
    type: 'F1' | 'F2' | 'F3' | 'F4' | 'F5+' | 'Studio' | 'Duplex' | 'Villa';
    prixObserve: number;
    prixEstime: number;
    etatGeneral: number;        // 1-5
    finitions: number;          // 1-5
    luminosite: number;         // 1-5
    confort: number;            // 1-5
    dressing: boolean;
    doucheItalienne: boolean;
    notes: string;
  };

  // SCORES CALCULES
  scoreQuartier: number;
  scoreImmeuble: number;
  scoreAppartement: number;
  scoreGlobal: number;

  // STATUT
  statut: 'excellent' | 'bon' | 'moyen' | 'faible';
}

// Types pour le formulaire
export type Page = 'accueil' | 'nouvelle' | 'resume' | 'liste' | 'detail' | 'profils' | 'nouveauProfil';
export type Etape = 1 | 2 | 3;

// Profil client / lead
export interface Profil {
  id: string;
  createdAt: string;

  // IDENTITE
  nom: string;
  email: string;
  telephone: string;
  profession?: string;
  profilAcheteur?: 'resident' | 'diaspora' | 'investisseur' | 'premier_achat';
  paysResidence?: string;          // pour diaspora
  villeResidence?: string;
  trancheAge?: '18_25' | '26_35' | '36_50' | '51_65' | '65_plus';
  contactPrefere?: 'whatsapp' | 'email' | 'telephone' | 'sms';
  languePreferee?: 'fr' | 'ar' | 'en';

  // OBJECTIF
  objectif: 'achat' | 'investissement';
  usageBien?: 'residence_principale' | 'residence_secondaire' | 'investissement_locatif' | 'defiscalisation' | 'placement';
  budgetMin?: number;
  budgetMax: number;
  delai?: 'urgent' | '1_3_mois' | '3_6_mois' | '6_12_mois' | 'flexible';
  financement?: 'cash' | 'credit' | 'mixte' | 'en_cours_montage' | 'non_defini';
  preavisVisite?: 'immediat' | '1_semaine' | '2_semaines' | 'flexible';

  // LOCALISATION RECHERCHEE
  villeVisee?: string;
  quartierVise: string;
  quartiersAlternatifs?: string;

  // CRITERES DU BIEN
  typeBien?: 'Studio' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5+' | 'Duplex' | 'Villa' | 'Terrain' | 'Commerce';
  surfaceMin?: number;
  surfaceMax?: number;
  piecesMin?: number;
  chambresMin?: number;
  etagePrefere?: 'rdc' | 'etage_intermediaire' | 'dernier_etage' | 'indifferent';
  exposition?: 'nord' | 'sud' | 'est' | 'ouest' | 'indifferent';
  anneeConstructionMin?: number;
  neufOuAncien?: 'neuf' | 'ancien' | 'indifferent';

  // CRITERES MUST-HAVE
  criteresMust?: string[];          // obligatoires
  criteresNice?: string[];          // souhaites
  criteresRefus?: string[];         // points rouges

  // INVESTISSEUR
  rendementMin?: number;            // % annuel
  budgetLoyerMax?: number;          // loyer mensuel cible pour locatif
  typeLocatif?: 'longue_duree' | 'courte_duree' | 'saisonnier' | 'airbnb' | 'indifferent';
  plusValueAttendue?: 'faible' | 'moyenne' | 'forte' | 'indifferent';

  // SUIVI
  sourceLead?: 'instagram' | 'referral' | 'site_web' | 'evenement' | 'autre';
  statut: 'nouveau' | 'en_cours' | 'termine';
  notes: string;
}
