import { Visite } from '../types';
import { Check, Edit3, Home, MapPin, Building2, CheckCircle, AlertTriangle, XCircle, TrendingUp, Award, Shield, Euro, FileText } from 'lucide-react';
import { StarRating } from './StarRating';

interface Props {
  visite: Visite;
  onConfirmer: () => void;
  onModifier: () => void;
}

export function ResumeVisite({ visite, onConfirmer, onModifier }: Props) {
  const statutConfig = {
    excellent: {
      icon: Award,
      color: 'emerald',
      label: 'Excellent',
      badgeClass: 'bg-emerald-500',
      message: 'Bien de haute qualite - Investissement recommande',
      recommendation: 'Ce bien presente un excellent rapport qualite/prix. Les points positifs l\'emportent largement sur les eventualites negatif.',
    },
    bon: {
      icon: CheckCircle,
      color: 'green',
      label: 'Bon',
      badgeClass: 'bg-green-500',
      message: 'Bien interessant - A considerer',
      recommendation: 'Ce bien offre un bon compromis. Quelques points d\'attention mais le potentiel reste interessant pour un achat.',
    },
    moyen: {
      icon: AlertTriangle,
      color: 'amber',
      label: 'Moyen',
      badgeClass: 'bg-amber-500',
      message: 'Points de vigilance - A negocier',
      recommendation: 'Ce bien necessite une attention particuliere. Verifiez les points signales et negociez le prix si possible.',
    },
    faible: {
      icon: XCircle,
      color: 'red',
      label: 'Faible',
      badgeClass: 'bg-red-500',
      message: 'Risque detecte - Prudence recommandee',
      recommendation: 'Ce bien presente des faiblesses importantes. Nous recommandons une analyse approfondie avant toute decision.',
    },
  };

  const statut = statutConfig[visite.statut];
  const StatutIcon = statut.icon;

  const formatDateRapport = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatHeure = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-emerald-600';
    if (score >= 3) return 'text-green-600';
    if (score >= 2) return 'text-amber-600';
    return 'text-red-500';
  };

  const getPrixM2 = () => {
    if (visite.appartement.prixObserve > 0) {
      // Estimation surface moyenne selon type
      const surfaces: Record<string, number> = {
        'Studio': 35, 'F1': 45, 'F2': 65, 'F3': 85, 'F4': 110, 'F5+': 140, 'Duplex': 100, 'Villa': 200
      };
      const surface = surfaces[visite.appartement.type] || 80;
      return ((visite.appartement.prixObserve * 1000000) / surface).toFixed(0);
    }
    return '0';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-cream relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'url(/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg)',
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Header - Rapport officiel */}
      <header className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Rapport diagnostic</p>
            <h1 className="text-base font-bold text-gray-900">MAMLEK</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{formatDateRapport(visite.createdAt)}</p>
            <p className="text-[10px] text-gray-400">{formatHeure(visite.createdAt)}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto relative z-10">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* SECTION 1: Identite du bien */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-200">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                Identite du bien
              </h2>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{visite.appartement.type}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <span className="font-medium">{visite.quartier.nom}</span>
                  </div>
                </div>
                <div className={`${statut.badgeClass} text-white px-4 py-2 rounded-xl flex flex-col items-center`}>
                  <p className="text-2xl font-bold">{visite.scoreGlobal.toFixed(1)}</p>
                  <StarRating value={visite.scoreGlobal} size={14} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Immeuble</p>
                  <p className="font-semibold text-gray-800">{visite.immeuble.type}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Statut</p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statut.badgeClass} text-white`}>
                    {statut.label}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Prix/m2</p>
                  <p className="font-semibold text-gray-800">{Number(getPrixM2()).toLocaleString('fr-FR')} DA</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Score et evaluation */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gold-50 to-gold-100 px-5 py-3 border-b border-gold-200">
              <h2 className="text-xs uppercase tracking-wider text-gold-700 font-semibold flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                Evaluation globale
              </h2>
            </div>
            <div className="p-5">
              {/* Message principal */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-3">
                  <StatutIcon className={`w-8 h-8 ${getScoreColor(visite.scoreGlobal)}`} />
                </div>
                <p className="text-lg font-semibold text-gray-900">{statut.message}</p>
              </div>

              {/* Scores detailles */}
              <div className="space-y-4">
                {/* Quartier */}
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Quartier</p>
                        <p className="text-[10px] text-gray-400">6 criteres evalues</p>
                      </div>
                    </div>
                    <StarRating value={visite.scoreQuartier} size={18} showValue />
                  </div>
                </div>

                {/* Immeuble */}
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Immeuble</p>
                        <p className="text-[10px] text-gray-400">6 criteres evalues</p>
                      </div>
                    </div>
                    <StarRating value={visite.scoreImmeuble} size={18} showValue />
                  </div>
                </div>

                {/* Appartement */}
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center">
                        <Home className="w-4 h-4 text-gold-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Appartement</p>
                        <p className="text-[10px] text-gray-400">6 criteres evalues</p>
                      </div>
                    </div>
                    <StarRating value={visite.scoreAppartement} size={18} showValue />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Analyse financiere */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 border-b border-emerald-200">
              <h2 className="text-xs uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-2">
                <Euro className="w-3.5 h-3.5" />
                Analyse financiere
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Prix observe</p>
                  <p className="text-2xl font-bold text-gray-900">{visite.appartement.prixObserve}</p>
                  <p className="text-xs text-gray-500">Millions DA</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Prix estime marche</p>
                  <p className="text-2xl font-bold text-gray-900">{visite.appartement.prixEstime || '-'}</p>
                  <p className="text-xs text-gray-500">Millions DA</p>
                </div>
              </div>

              {/* Ecart analyse */}
              {visite.appartement.prixEstime > 0 && (
                <div className={`rounded-xl p-4 ${
                  visite.appartement.prixObserve <= visite.appartement.prixEstime
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-amber-50 border border-amber-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`w-4 h-4 ${
                      visite.appartement.prixObserve <= visite.appartement.prixEstime
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`} />
                    <p className="text-sm font-semibold">
                      {visite.appartement.prixObserve <= visite.appartement.prixEstime
                        ? 'Prix sous le marche'
                        : 'Prix au-dessus du marche'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Ecart estime: {visite.appartement.prixObserve > visite.appartement.prixEstime
                      ? `+${((visite.appartement.prixObserve / visite.appartement.prixEstime - 1) * 100).toFixed(0)}%`
                      : `-${((1 - visite.appartement.prixObserve / visite.appartement.prixEstime) * 100).toFixed(0)}%`
                    } par rapport a l'estimation marche.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 4: Points cles */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-200">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                Points cles identifie
              </h2>
            </div>
            <div className="p-5">
              {/* Positifs */}
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mb-2">Points positifs</p>
                <ul className="space-y-2">
                  {visite.scoreQuartier >= 3.5 && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Quartier qualitatif - Score {visite.scoreQuartier.toFixed(1)}/5</span>
                    </li>
                  )}
                  {visite.immeuble.ascenseur && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Ascenseur present</span>
                    </li>
                  )}
                  {visite.immeuble.gardiennage && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Gardiennage assure</span>
                    </li>
                  )}
                  {visite.immeuble.cameras && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Videosurveillance installee</span>
                    </li>
                  )}
                  {visite.appartement.dressing && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Dressing integre</span>
                    </li>
                  )}
                  {visite.appartement.doucheItalienne && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Douche italienne moderne</span>
                    </li>
                  )}
                  {visite.scoreAppartement >= 3.5 && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Appartement bien note - Score {visite.scoreAppartement.toFixed(1)}/5</span>
                    </li>
                  )}
                  {visite.appartement.prixObserve <= visite.appartement.prixEstime && visite.appartement.prixEstime > 0 && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Prix coherent avec le marche local</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Points attention */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-amber-600 font-semibold mb-2">Points d'attention</p>
                <ul className="space-y-2">
                  {visite.scoreQuartier < 2.5 && (
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Quartier a ameliorer - Score {visite.scoreQuartier.toFixed(1)}/5</span>
                    </li>
                  )}
                  {visite.scoreImmeuble < 2.5 && (
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Immeuble a verifier - Score {visite.scoreImmeuble.toFixed(1)}/5</span>
                    </li>
                  )}
                  {visite.appartement.prixObserve > visite.appartement.prixEstime && visite.appartement.prixEstime > 0 && (
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Prix superieur au marche - Negociation possible</span>
                    </li>
                  )}
                  {!visite.immeuble.ascenseur && (visite.immeuble.type === 'R+10' || visite.immeuble.type === 'R+15') && (
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Pas d'ascenseur dans immeuble {visite.immeuble.type}</span>
                    </li>
                  )}
                  {visite.scoreGlobal < 2.5 && (
                    <li className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Score global faible - Analyse supplementaire recommandee</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 5: Recommandation finale */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gold-50 to-amber-50 px-5 py-3 border-b border-gold-200">
              <h2 className="text-xs uppercase tracking-wider text-gold-700 font-semibold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Recommandation finale
              </h2>
            </div>
            <div className="p-5">
              <div className={`rounded-xl p-4 mb-4 ${
                visite.scoreGlobal >= 3
                  ? 'bg-emerald-50 border border-emerald-200'
                  : visite.scoreGlobal >= 2
                    ? 'bg-amber-50 border border-amber-200'
                    : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  <StatutIcon className={`w-5 h-5 mt-0.5 ${getScoreColor(visite.scoreGlobal)}`} />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {visite.scoreGlobal >= 3 ? 'Avis favorable' : visite.scoreGlobal >= 2 ? 'Avis reserve' : 'Avis defavorable'}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {statut.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {visite.appartement.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Notes de l'inspecteur</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{visite.appartement.notes}</p>
                </div>
              )}
            </div>
          </section>

          {/* Footer rapport */}
          <div className="text-center py-4">
            <p className="text-[10px] text-gray-400">
              Rapport genere par MAMLEK - Infrastructure de collecte immobiliere
            </p>
            <p className="text-[10px] text-gray-300 mt-1">
              Document genere le {formatDateRapport(visite.createdAt)} a {formatHeure(visite.createdAt)}
            </p>
          </div>
        </div>
      </main>

      {/* Actions */}
      <footer className="bg-white border-t border-gray-200 px-4 py-4 sticky bottom-0 z-20 shadow-lg">
        <div className="max-w-2xl mx-auto space-y-2">
          <button
            onClick={onConfirmer}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-semibold
                       shadow-lg shadow-gold-500/25 hover:from-gold-600 hover:to-gold-700 active:scale-[0.99] transition-all
                       flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Valider et enregistrer le diagnostic
          </button>
          <button
            onClick={onModifier}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium
                       hover:bg-gray-200 active:scale-[0.99] transition-all
                       flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Modifier les donnees
          </button>
        </div>
      </footer>
    </div>
  );
}
