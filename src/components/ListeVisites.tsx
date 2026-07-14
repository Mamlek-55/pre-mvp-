import { Visite } from '../types';
import { ChevronLeft, ChevronRight, Building2, MapPin, Trash2, Eye, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n';

interface Props {
  visites: Visite[];
  onRetour: () => void;
  onDetail: (visite: Visite) => void;
  onSupprimer: (id: string) => void;
}

export function ListeVisites({ visites, onRetour, onDetail, onSupprimer }: Props) {
  const { t, lang, toggleLang } = useLanguage();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

  const statutColors = {
    excellent: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bon: 'bg-green-100 text-green-700 border-green-200',
    moyen: 'bg-amber-100 text-amber-700 border-amber-200',
    faible: 'bg-red-100 text-red-700 border-red-200',
  };

  const statutLabels = {
    excellent: t.statutExcellent,
    bon: t.statutBon,
    moyen: t.statutMoyen,
    faible: t.statutFaible,
  };

  const BackIcon = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen flex flex-col bg-cream relative overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'url(/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg)', backgroundSize: '500px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={onRetour} className="p-2 -ms-2 rounded-lg hover:bg-gray-100 transition-colors">
            <BackIcon className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 text-center px-4">
            <h1 className="text-lg font-semibold text-gray-800">{t.mesVisites}</h1>
            <p className="text-xs text-gray-400">
              {visites.length} {visites.length > 1 ? t.visites : t.visite}
            </p>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 hover:border-gold-400 transition-all text-xs font-bold"
          >
            <span className={lang === 'fr' ? 'text-gold-600' : 'text-gray-400'}>FR</span>
            <span className="text-gray-300">|</span>
            <span className={lang === 'ar' ? 'text-gold-600' : 'text-gray-400'}>ع</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        {visites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t.aucuneVisite}</h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">{t.aucuneVisiteDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visites.map(visite => (
              <div key={visite.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">{visite.appartement.type}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {visite.quartier.nom}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statutColors[visite.statut]}`}>
                        {statutLabels[visite.statut]} · {visite.scoreGlobal.toFixed(1)}/5
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(visite.createdAt)}
                    </div>
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded">{visite.immeuble.type}</span>
                  </div>
                </div>

                <div className="px-5 py-3 bg-gray-50">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-400">{t.prixObserveLabel}</p>
                      <p className="font-semibold text-gold-600">{visite.appartement.prixObserve} {t.mDA}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-gray-400">{t.prixEstimel}</p>
                      <p className="font-medium text-gray-700">{visite.appartement.prixEstime} {t.mDA}</p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => onDetail(visite)}
                    className="flex-1 py-2.5 bg-gold-500 text-white rounded-xl font-medium
                               hover:bg-gold-600 active:scale-[0.98] transition-all
                               flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {t.details}
                  </button>
                  <button
                    onClick={() => onSupprimer(visite.id)}
                    className="px-4 py-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
