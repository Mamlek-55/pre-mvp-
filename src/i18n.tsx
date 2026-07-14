import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'fr' | 'ar';

const translations = {
  fr: {
    // App
    dir: 'ltr' as const,

    // Landing
    tagline: 'Real Estate Intelligence',
    infrastructure: 'Infrastructure · 2026',
    nouvelleVisite: 'Nouvelle visite',
    voirVisites: 'Mes visites',
    problemeTitre: 'Un marche sans systeme de verite',
    problemeDesc: 'Aucune source fiable, aucune reference commune. Chacun decide avec ses propres chiffres.',
    annonceA: 'Annonce A',
    annonceB: 'Annonce B',
    memeQuartier: 'Meme quartier ?',
    ecart: "d'ecart",
    frameworkTitre: 'Trois niveaux de verite',
    frameworkDesc: 'Du macro au granulaire. Chaque echelle enrichit la suivante.',
    niv01: 'Quartier',
    niv01Desc: 'La vue macro du marche local et de ses dynamiques.',
    niv02: 'Immeuble',
    niv02Desc: "Le contexte de l'actif : standing, etat, services.",
    niv03: 'Appartement',
    niv03Desc: 'La donnee granulaire qui fait la vraie comparaison.',
    systemeTitre: 'Terrain → Data → Intelligence',
    systemeLabel: 'Le systeme',
    terrain: 'Terrain',
    terrainDesc: 'Collecte reelle, verifiee sur place. La donnee brute du marche.',
    data: 'Data',
    dataDesc: 'Structuration normalisee. Chaque actif devient comparable.',
    intelligence: 'Intelligence',
    intelligenceDesc: 'Insights actionnables, decisions fiables et instantanees.',
    visionTitre: 'Nous ne construisons pas une app.',
    visionSuite: 'Nous construisons la verite du marche.',
    commencerVisite: 'Commencer une visite',
    footer: 'MAMLEK · Property Intelligence · 2026',

    // Form header
    etape: 'Etape',
    sur: 'sur',
    quartierLabel: 'Quartier',
    immeubleLabel: 'Immeuble',
    appartementLabel: 'Appartement',

    // Quartier
    nomQuartier: 'Nom du quartier *',
    nomPlaceholder: 'Ex: Hydra, Alger Centre, Bir Mourad...',
    evalQuartier: 'Evaluation du quartier (1-5)',
    securite: 'Securite percue',
    accessibilite: 'Accessibilite',
    bruit: 'Niveau de bruit (5 = calme)',
    services: 'Services a proximite',
    attractivite: 'Attractivite generale',
    qualiteVie: 'Qualite de vie',
    scoreQuartier: 'Score quartier',

    // Immeuble
    typeImmeuble: "Type d'immeuble",
    equipements: 'Equipements',
    ascenseur: 'Ascenseur',
    cameras: 'Cameras de surveillance',
    gardiennage: 'Gardiennage',
    evalImmeuble: 'Evaluation (1-5)',
    etatEntretien: "Etat d'entretien",
    securiteEntree: "Securite de l'entree",
    qualiteStructurale: 'Qualite structurelle',
    scoreImmeuble: 'Score immeuble',

    // Appartement
    typeBien: 'Type de bien',
    prix: 'Prix',
    prixObserve: 'Prix observe *',
    prixEstime: 'Prix estime marche',
    enMillions: 'En Millions DA',
    evalAppart: 'Evaluation (1-5)',
    etatGeneral: 'Etat general',
    finitions: 'Qualite finitions',
    luminosite: 'Luminosite',
    confort: 'Confort',
    dressing: 'Dressing',
    doucheItalienne: 'Douche italienne',
    notes: 'Notes libres',
    notesPlaceholder: 'Observations supplementaires...',
    scoreAppart: 'Score appartement',

    // Buttons
    continuer: 'Continuer',
    terminerVisite: 'Terminer la visite',

    // Resume
    rapportDiag: 'Rapport diagnostic',
    identiteBien: 'Identite du bien',
    evalGlobale: 'Evaluation globale',
    analyseFinanciere: 'Analyse financiere',
    pointsCles: 'Points cles identifie',
    recommandation: 'Recommandation finale',
    prixM2: 'Prix/m2',
    statut: 'Statut',
    prixObserveLabel: 'Prix observe',
    prixEstimeLabel: 'Prix estime marche',
    millionsDA: 'Millions DA',
    sousMarche: 'Prix sous le marche',
    dessusMarche: 'Prix au-dessus du marche',
    ecartEstime: 'Ecart estime',
    parRapport: 'par rapport a l\'estimation marche.',
    positifs: 'Points positifs',
    attention: "Points d'attention",
    scoreTotal: 'Score total avec 3 sous-scores evalues',
    criteresEvalues: 'criteres evalues',
    avis: { favorable: 'Avis favorable', reserve: 'Avis reserve', defavorable: 'Avis defavorable' },
    notesInspecteur: "Notes de l'inspecteur",
    validerDiag: 'Valider et enregistrer le diagnostic',
    modifierDonnees: 'Modifier les donnees',
    rapportGenere: 'Rapport genere par MAMLEK',
    docGenere: 'Document genere le',
    a: 'a',

    // Statuts
    statutExcellent: 'Excellent',
    statutBon: 'Bon',
    statutMoyen: 'Moyen',
    statutFaible: 'Faible',
    msgExcellent: 'Bien de haute qualite - Investissement recommande',
    msgBon: 'Bien interessant - A considerer',
    msgMoyen: 'Points de vigilance - A negocier',
    msgFaible: 'Risque detecte - Prudence recommandee',
    recExcellent: "Ce bien presente un excellent rapport qualite/prix. Les points positifs l'emportent largement.",
    recBon: 'Ce bien offre un bon compromis. Quelques points d\'attention mais le potentiel reste interessant.',
    recMoyen: 'Ce bien necessite une attention particuliere. Verifiez les points signales et negociez le prix.',
    recFaible: 'Ce bien presente des faiblesses importantes. Analyse approfondie recommandee avant toute decision.',

    // Points cles auto
    quartierQual: 'Quartier qualitatif - Score',
    prixCoherent: 'Prix coherent avec le marche local',
    ascenseurPres: 'Ascenseur present',
    gardiennagePres: 'Gardiennage assure',
    camerasPres: 'Videosurveillance installee',
    dressingPres: 'Dressing integre',
    douchePres: 'Douche italienne moderne',
    appartBienNote: 'Appartement bien note - Score',
    quartierFaible: 'Quartier a ameliorer - Score',
    immeubleFaible: 'Immeuble a verifier - Score',
    prixEleve: 'Prix superieur au marche - Negociation possible',
    pasAscenseur: "Pas d'ascenseur dans immeuble",
    scoreFaible: 'Score global faible - Analyse supplementaire recommandee',

    // Liste
    mesVisites: 'Mes visites',
    visite: 'visite',
    visites: 'visites',
    aucuneVisite: 'Aucune visite',
    aucuneVisiteDesc: 'Creez votre premiere visite pour commencer a collecter des donnees immobilieres.',
    mDA: 'M DA',
    prixEstimel: 'Prix estime',
    details: 'Details',

    // Detail
    detailVisite: 'Detail de la visite',
    dateVisite: 'Date de visite',
    prixSection: 'Prix',
    prixSup: "Prix superieur de",
    aEstimation: "a l'estimation",
    prixOk: 'Prix coherent avec le marche',
    scoreGlobalQ: 'Score global quartier',
    scoreGlobalI: 'Score global immeuble',
    scoreGlobalA: 'Score global appartement',
    equipSection: 'Equipements',
    gardien: 'Gardien',
    entretien: 'Entretien',
    entree: 'Entree',
    structure: 'Structure',
    notesSection: 'Notes',
    retourVisites: 'Retour aux visites',
  },

  ar: {
    dir: 'rtl' as const,

    // Landing
    tagline: 'استخبارات العقارات',
    infrastructure: 'بنية تحتية · 2026',
    nouvelleVisite: 'زيارة جديدة',
    voirVisites: 'زياراتي',
    problemeTitre: 'سوق عقاري بلا مرجعية حقيقية',
    problemeDesc: 'لا مصدر موثوق، لا مرجع مشترك. كل شخص يقرر بأرقامه الخاصة.',
    annonceA: 'إعلان أ',
    annonceB: 'إعلان ب',
    memeQuartier: 'نفس الحي ؟',
    ecart: 'فارق',
    frameworkTitre: 'ثلاثة مستويات من الحقيقة',
    frameworkDesc: 'من الكلي إلى التفصيلي. كل مستوى يثري المستوى التالي.',
    niv01: 'الحي',
    niv01Desc: 'النظرة الشاملة للسوق المحلي وديناميكياته.',
    niv02: 'البناية',
    niv02Desc: 'سياق الأصل: المستوى، الحالة، الخدمات.',
    niv03: 'الشقة',
    niv03Desc: 'البيانات التفصيلية التي تجعل المقارنة حقيقية.',
    systemeTitre: 'ميدان ← بيانات ← ذكاء',
    systemeLabel: 'المنظومة',
    terrain: 'الميدان',
    terrainDesc: 'جمع حقيقي موثق في عين المكان. البيانات الخام للسوق.',
    data: 'البيانات',
    dataDesc: 'هيكلة موحدة. كل أصل يصبح قابلاً للمقارنة.',
    intelligence: 'الذكاء',
    intelligenceDesc: 'رؤى قابلة للتنفيذ، قرارات موثوقة وفورية.',
    visionTitre: 'نحن لا نبني تطبيقاً.',
    visionSuite: 'نحن نبني حقيقة السوق.',
    commencerVisite: 'ابدأ زيارة جديدة',
    footer: 'مملك · استخبارات العقارات · 2026',

    // Form header
    etape: 'الخطوة',
    sur: 'من',
    quartierLabel: 'الحي',
    immeubleLabel: 'البناية',
    appartementLabel: 'الشقة',

    // Quartier
    nomQuartier: 'اسم الحي *',
    nomPlaceholder: 'مثال: حيدرة، وسط العاصمة، بئر مراد رايس...',
    evalQuartier: 'تقييم الحي (من 1 إلى 5)',
    securite: 'الأمن المُدرَك',
    accessibilite: 'سهولة الوصول',
    bruit: 'مستوى الضوضاء (5 = هادئ)',
    services: 'الخدمات القريبة',
    attractivite: 'الجاذبية العامة',
    qualiteVie: 'جودة الحياة',
    scoreQuartier: 'نقاط الحي',

    // Immeuble
    typeImmeuble: 'نوع البناية',
    equipements: 'التجهيزات',
    ascenseur: 'مصعد',
    cameras: 'كاميرات مراقبة',
    gardiennage: 'حراسة',
    evalImmeuble: 'التقييم (من 1 إلى 5)',
    etatEntretien: 'حالة الصيانة',
    securiteEntree: 'أمن المدخل',
    qualiteStructurale: 'الجودة الهيكلية',
    scoreImmeuble: 'نقاط البناية',

    // Appartement
    typeBien: 'نوع العقار',
    prix: 'السعر',
    prixObserve: 'السعر المُلاحَظ *',
    prixEstime: 'السعر المقدر للسوق',
    enMillions: 'بالملايين دج',
    evalAppart: 'التقييم (من 1 إلى 5)',
    etatGeneral: 'الحالة العامة',
    finitions: 'جودة التشطيب',
    luminosite: 'الإضاءة الطبيعية',
    confort: 'الراحة',
    dressing: 'غرفة الملابس',
    doucheItalienne: 'دش إيطالي',
    notes: 'ملاحظات حرة',
    notesPlaceholder: 'ملاحظات إضافية...',
    scoreAppart: 'نقاط الشقة',

    // Buttons
    continuer: 'متابعة',
    terminerVisite: 'إنهاء الزيارة',

    // Resume
    rapportDiag: 'تقرير التشخيص',
    identiteBien: 'هوية العقار',
    evalGlobale: 'التقييم الشامل',
    analyseFinanciere: 'التحليل المالي',
    pointsCles: 'النقاط الأساسية المحددة',
    recommandation: 'التوصية النهائية',
    prixM2: 'السعر/م²',
    statut: 'الحالة',
    prixObserveLabel: 'السعر المُلاحَظ',
    prixEstimeLabel: 'السعر المقدر',
    millionsDA: 'مليون دج',
    sousMarche: 'السعر أقل من السوق',
    dessusMarche: 'السعر أعلى من السوق',
    ecartEstime: 'الفارق المقدر',
    parRapport: 'مقارنة بتقدير السوق.',
    positifs: 'النقاط الإيجابية',
    attention: 'نقاط التنبيه',
    scoreTotal: 'النقاط الإجمالية مع 3 محاور تقييم',
    criteresEvalues: 'معايير تقييم',
    avis: { favorable: 'رأي مؤيد', reserve: 'رأي محتاط', defavorable: 'رأي غير مؤيد' },
    notesInspecteur: 'ملاحظات المفتش',
    validerDiag: 'تأكيد وحفظ التشخيص',
    modifierDonnees: 'تعديل البيانات',
    rapportGenere: 'تقرير صادر عن MAMLEK',
    docGenere: 'وثيقة صادرة بتاريخ',
    a: 'الساعة',

    // Statuts
    statutExcellent: 'ممتاز',
    statutBon: 'جيد',
    statutMoyen: 'متوسط',
    statutFaible: 'ضعيف',
    msgExcellent: 'عقار عالي الجودة - استثمار موصى به',
    msgBon: 'عقار مثير للاهتمام - يستحق النظر',
    msgMoyen: 'نقاط تحتاج تدقيقاً - يُنصح بالتفاوض',
    msgFaible: 'مخاطر مرصودة - احتياط مطلوب',
    recExcellent: 'يقدم هذا العقار نسبة جودة/سعر ممتازة. الإيجابيات تفوق بكثير السلبيات.',
    recBon: 'يوفر هذا العقار توازناً جيداً. بعض نقاط الانتباه لكن الإمكانات تبقى مثيرة للاهتمام.',
    recMoyen: 'يستدعي هذا العقار اهتماماً خاصاً. تحقق من النقاط المُشار إليها وتفاوض على السعر.',
    recFaible: 'يُظهر هذا العقار نقاط ضعف مهمة. يُوصى بإجراء تحليل معمق قبل أي قرار.',

    // Points cles auto
    quartierQual: 'حي عالي الجودة - النقاط',
    prixCoherent: 'السعر متناسب مع السوق المحلي',
    ascenseurPres: 'يوجد مصعد',
    gardiennagePres: 'حراسة مؤمنة',
    camerasPres: 'نظام مراقبة مثبت',
    dressingPres: 'غرفة ملابس مدمجة',
    douchePres: 'دش إيطالي عصري',
    appartBienNote: 'شقة بتقييم جيد - النقاط',
    quartierFaible: 'الحي بحاجة لتحسين - النقاط',
    immeubleFaible: 'البناية تستوجب فحصاً - النقاط',
    prixEleve: 'السعر أعلى من السوق - تفاوض ممكن',
    pasAscenseur: 'لا يوجد مصعد في بناية',
    scoreFaible: 'نقاط إجمالية منخفضة - يُوصى بتحليل إضافي',

    // Liste
    mesVisites: 'زياراتي',
    visite: 'زيارة',
    visites: 'زيارات',
    aucuneVisite: 'لا توجد زيارات',
    aucuneVisiteDesc: 'أنشئ زيارتك الأولى لبدء جمع بيانات العقارات.',
    mDA: 'م دج',
    prixEstimel: 'السعر المقدر',
    details: 'التفاصيل',

    // Detail
    detailVisite: 'تفاصيل الزيارة',
    dateVisite: 'تاريخ الزيارة',
    prixSection: 'السعر',
    prixSup: 'السعر أعلى بنسبة',
    aEstimation: 'من التقدير',
    prixOk: 'السعر متناسب مع السوق',
    scoreGlobalQ: 'النقاط الإجمالية للحي',
    scoreGlobalI: 'النقاط الإجمالية للبناية',
    scoreGlobalA: 'النقاط الإجمالية للشقة',
    equipSection: 'التجهيزات',
    gardien: 'حارس',
    entretien: 'صيانة',
    entree: 'مدخل',
    structure: 'هيكل',
    notesSection: 'ملاحظات',
    retourVisites: 'العودة إلى الزيارات',
  },
} as const;

type Translations = typeof translations.fr;

interface LangContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');
  const toggleLang = () => setLang(l => (l === 'fr' ? 'ar' : 'fr'));
  const t = translations[lang] as Translations;
  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
