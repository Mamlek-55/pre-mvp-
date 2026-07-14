import { Visite } from '../types';
import { ChevronLeft, ChevronRight, MapPin, Building2, Home, Calendar, Check, X, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../i18n';
import { StarRating } from './StarRating';

interface Props {
  visite: Visite;
  onRetour: () => void;
}

export function DetailVisite({ visite, onRetour }: Props) {
  const { t, lang, toggleLang } = useLanguage();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

  const statutConfig = {
    excellent: { icon: CheckCircle, color: 'emerald', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    bon: { icon: CheckCircle, color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    moyen: { icon: AlertTriangle, color: 'amber', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    faible: { icon: XCircle, color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  };

  const statut = statutConfig[visite.statut];
  const StatutIcon = statut.icon;

  const BackIcon = lang === 'ar' ? ChevronRight : ChevronLeft;

  const ScoreRow = ({ score, label }: { score: number; label: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-600">{label}</span>
        <StarRating value={score} size={18} showValue />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-cream relative overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'url(/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg)', backgroundSize: '500px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      />

      {/* Header */}
      <header className={`bg-white border-b border-gray-100 px-4 py-5 ${statut.bgColor}`}>
        <div className="flex items-center mb-4">
          <button onClick={onRetour} className="p-2 -ms-2 rounded-lg hover:bg-white/50 transition-colors">
            <BackIcon className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 text-center pe-8">
            <p className="text-xs text-gray-500">{t.detailVisite}</p>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 bg-white hover:border-gold-400 transition-all text-xs font-bold"
          >
            <span className={lang === 'fr' ? 'text-gold-600' : 'text-gray-400'}>FR</span>
            <span className="text-gray-300">|</span>
            <span className={lang === 'ar' ? 'text-gold-600' : 'text-gray-400'}>ع</span>
          </button>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm mb-3">
            <StatutIcon className={`w-7 h-7 text-${statut.color}-500`} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{visite.appartement.type}</h1>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />{visite.quartier.nom}
          </p>
          <div className="mt-3 flex flex-col items-center gap-1">
            <div className="text-3xl font-bold text-gray-900">
              {visite.scoreGlobal.toFixed(1)}<span className="text-lg text-gray-400">/5</span>
            </div>
            <StarRating value={visite.scoreGlobal} size={20} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        <div className="space-y-4">

          {/* Date */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gold-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{t.dateVisite}</p>
              <p className="text-sm font-medium text-gray-700 capitalize">{formatDate(visite.createdAt)}</p>
            </div>
          </div>

          {/* Prix */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">{t.prixSection}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gold-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gold-600 mb-1">{t.prixObserveLabel}</p>
                <p className="text-xl font-bold text-gold-700">{visite.appartement.prixObserve} M</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">{t.prixEstimeLabel}</p>
                <p className="text-xl font-bold text-gray-700">{visite.appartement.prixEstime} M</p>
              </div>
            </div>
            {visite.appartement.prixObserve > visite.appartement.prixEstime && visite.appartement.prixEstime > 0 && (
              <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.prixSup} {((visite.appartement.prixObserve / visite.appartement.prixEstime - 1) * 100).toFixed(0)}% {t.aEstimation}</span>
              </div>
            )}
            {visite.appartement.prixObserve <= visite.appartement.prixEstime && visite.appartement.prixEstime > 0 && (
              <div className="mt-3 flex items-center gap-2 text-emerald-600 text-sm">
                <Check className="w-4 h-4 shrink-0" /><span>{t.prixOk}</span>
              </div>
            )}
          </div>

          {/* Quartier */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gold-500" />
              <h3 className="font-semibold text-gray-900">{t.quartierLabel}</h3>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-4">{visite.quartier.nom}</p>
            <ScoreRow score={visite.scoreQuartier} label={t.scoreGlobalQ} />
            <div className="space-y-2.5">
              {[
                [t.securite, visite.quartier.securite],
                [t.accessibilite, visite.quartier.accessibilite],
                [lang === 'ar' ? 'هدوء' : 'Calme', visite.quartier.bruit],
                [t.services, visite.quartier.services],
                [t.attractivite, visite.quartier.attractivite],
                [t.qualiteVie, visite.quartier.qualiteVie],
              ].map(([label, val]) => (
                <div key={label as string} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{label}</span>
                  <StarRating value={val as number} size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Immeuble */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-gold-500" />
              <h3 className="font-semibold text-gray-900">{t.immeubleLabel}</h3>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-4">{visite.immeuble.type}</p>
            <ScoreRow score={visite.scoreImmeuble} label={t.scoreGlobalI} />
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">{t.equipSection}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  [t.ascenseur, visite.immeuble.ascenseur],
                  [t.cameras, visite.immeuble.cameras],
                  [t.gardien, visite.immeuble.gardiennage],
                ].map(([label, val]) => (
                  <span key={label as string} className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${val ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                    {val ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                [t.entretien, visite.immeuble.etatEntretien],
                [t.entree, visite.immeuble.securiteEntree],
                [t.structure, visite.immeuble.qualiteStructurale],
              ].map(([label, val]) => (
                <div key={label as string} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{label}</span>
                  <StarRating value={val as number} size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Appartement */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-gold-500" />
              <h3 className="font-semibold text-gray-900">{t.appartementLabel}</h3>
            </div>
            <ScoreRow score={visite.scoreAppartement} label={t.scoreGlobalA} />
            <div className="space-y-2.5 mb-4">
              {[
                [t.etatGeneral, visite.appartement.etatGeneral],
                [t.finitions, visite.appartement.finitions],
                [t.luminosite, visite.appartement.luminosite],
                [t.confort, visite.appartement.confort],
              ].map(([label, val]) => (
                <div key={label as string} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{label}</span>
                  <StarRating value={val as number} size={16} />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">{t.equipSection}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  [t.dressing, visite.appartement.dressing],
                  [t.doucheItalienne, visite.appartement.doucheItalienne],
                ].map(([label, val]) => (
                  <span key={label as string} className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${val ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                    {val ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          {visite.appartement.notes && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">{t.notesSection}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{visite.appartement.notes}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-5 py-4">
        <button
          onClick={onRetour}
          className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all"
        >
          {t.retourVisites}
        </button>
      </footer>
    </div>
  );
}
