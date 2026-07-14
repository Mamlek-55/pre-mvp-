import { ArrowLeft, Plus, TrendingUp, ShoppingBag, Mail, Phone, Briefcase, MapPin, Home, Calendar, CreditCard, StickyNote, Globe, User, Check, X } from 'lucide-react';
import { Profil } from '../types';

interface Props {
  profils: Profil[];
  onRetour: () => void;
  onNouveauProfil: () => void;
  onLancerDiagnostic: (profil: Profil) => void;
}

const statutStyle: Record<Profil['statut'], string> = {
  nouveau: 'bg-[#C4963A]/10 text-[#C4963A]',
  en_cours: 'bg-blue-50 text-blue-600',
  termine: 'bg-green-50 text-green-600',
};

const statutLabel: Record<Profil['statut'], string> = {
  nouveau: 'Nouveau',
  en_cours: 'En cours',
  termine: 'Termine',
};

const profilAcheteurLabel: Record<NonNullable<Profil['profilAcheteur']>, string> = {
  resident: 'Resident',
  diaspora: 'Diaspora',
  investisseur: 'Investisseur',
  premier_achat: '1er achat',
};

const delaiLabel: Record<NonNullable<Profil['delai']>, string> = {
  urgent: 'Urgent',
  '1_3_mois': '1 a 3 mois',
  '3_6_mois': '3 a 6 mois',
  '6_12_mois': '6 a 12 mois',
  flexible: 'Flexible',
};

const financementLabel: Record<NonNullable<Profil['financement']>, string> = {
  cash: 'Cash',
  credit: 'Credit',
  mixte: 'Mixte',
  en_cours_montage: 'En cours',
  non_defini: 'Non defini',
};

const usageLabel: Record<NonNullable<Profil['usageBien']>, string> = {
  residence_principale: 'Residence principale',
  residence_secondaire: 'Residence secondaire',
  investissement_locatif: 'Investissement locatif',
  defiscalisation: 'Defiscalisation',
  placement: 'Placement',
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

export function ListeProfils({ profils, onRetour, onNouveauProfil, onLancerDiagnostic }: Props) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onRetour} className="text-[#0F0F0F]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C4963A] uppercase">
              Mes leads
            </p>
            <h1 className="text-lg font-black text-[#0F0F0F] uppercase">Profils clients</h1>
          </div>
        </div>
        <button
          onClick={onNouveauProfil}
          className="bg-[#0F0F0F] text-white rounded-xl p-3 hover:bg-[#1a1a1a] active:scale-[0.95] transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-6 max-w-md mx-auto">
        {profils.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-400 mb-6">Aucun profil pour le moment.</p>
            <button
              onClick={onNouveauProfil}
              className="bg-[#0F0F0F] text-white rounded-xl py-3 px-6 font-bold text-sm
                         uppercase tracking-widest inline-flex items-center gap-2
                         hover:bg-[#1a1a1a] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" />
              Ajouter un profil
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {profils.map((profil) => (
              <div
                key={profil.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#C4963A] transition-all"
              >
                {/* Header card */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-black text-[#0F0F0F] text-base">{profil.nom}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Cree le {formatDate(profil.createdAt)}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${statutStyle[profil.statut]}`}
                  >
                    {statutLabel[profil.statut]}
                  </span>
                </div>

                {/* Profil acheteur + objectif */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {profil.profilAcheteur && (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                      <User className="w-3 h-3" />
                      {profilAcheteurLabel[profil.profilAcheteur]}
                    </span>
                  )}
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg ${
                      profil.objectif === 'achat'
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-[#C4963A]/10 text-[#C4963A]'
                    }`}
                  >
                    {profil.objectif === 'achat' ? (
                      <ShoppingBag className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3" />
                    )}
                    {profil.objectif === 'achat' ? 'Achat' : 'Investissement'}
                  </span>
                  {profil.sourceLead && (
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400">
                      {profil.sourceLead}
                    </span>
                  )}
                </div>

                {/* Budget */}
                <div className="mb-4">
                  {profil.budgetMin && profil.budgetMax ? (
                    <p className="text-sm font-black text-[#0F0F0F]">
                      {profil.budgetMin.toLocaleString('fr-FR')} - {profil.budgetMax.toLocaleString('fr-FR')} DA
                    </p>
                  ) : profil.budgetMax > 0 ? (
                    <p className="text-sm font-black text-[#0F0F0F]">
                      Max {profil.budgetMax.toLocaleString('fr-FR')} DA
                    </p>
                  ) : null}
                  {profil.usageBien && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{usageLabel[profil.usageBien]}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 gap-2 mb-4 text-xs text-gray-600">
                  {profil.telephone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C4963A]" />
                      <span>{profil.telephone}</span>
                    </div>
                  )}
                  {profil.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C4963A]" />
                      <span>{profil.email}</span>
                    </div>
                  )}
                  {profil.profession && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#C4963A]" />
                      <span>{profil.profession}</span>
                    </div>
                  )}
                  {profil.profilAcheteur === 'diaspora' && profil.paysResidence && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#C4963A]" />
                      <span>{profil.paysResidence}{profil.villeResidence ? `, ${profil.villeResidence}` : ''}</span>
                    </div>
                  )}
                </div>

                {/* Recherche */}
                <div className="bg-[#FAFAF8] border border-gray-100 rounded-xl p-4 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Recherche
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {profil.villeVisee && (
                      <div>
                        <p className="text-gray-400 mb-1">Ville</p>
                        <p className="font-bold text-[#0F0F0F]">{profil.villeVisee}</p>
                      </div>
                    )}
                    {profil.quartierVise && (
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Quartier</span>
                        </div>
                        <p className="font-bold text-[#0F0F0F]">{profil.quartierVise}</p>
                      </div>
                    )}
                    {profil.typeBien && (
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                          <Home className="w-3.5 h-3.5" />
                          <span>Bien</span>
                        </div>
                        <p className="font-bold text-[#0F0F0F]">
                          {profil.typeBien}
                          {profil.piecesMin ? ` / ${profil.piecesMin} pieces+` : ''}
                          {profil.chambresMin ? ` / ${profil.chambresMin} ch.` : ''}
                        </p>
                      </div>
                    )}
                    {(!!profil.surfaceMin || !!profil.surfaceMax) && (
                      <div>
                        <p className="text-gray-400 mb-1">Surface</p>
                        <p className="font-bold text-[#0F0F0F]">
                          {profil.surfaceMin ? `${profil.surfaceMin}` : ''}{profil.surfaceMin && profil.surfaceMax ? ' - ' : ''}{profil.surfaceMax ? `${profil.surfaceMax}` : ''} m2
                        </p>
                      </div>
                    )}
                    {profil.delai && (
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Delai</span>
                        </div>
                        <p className="font-bold text-[#0F0F0F]">{delaiLabel[profil.delai]}</p>
                      </div>
                    )}
                    {profil.financement && (
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Financement</span>
                        </div>
                        <p className="font-bold text-[#0F0F0F]">{financementLabel[profil.financement]}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Criteres must-have */}
                {!!profil.criteresMust?.length && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Check className="w-3 h-3 text-green-600" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Obligatoire</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profil.criteresMust.map((c) => (
                        <span key={c} className="bg-green-50 text-green-700 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Criteres refus */}
                {!!profil.criteresRefus?.length && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <X className="w-3 h-3 text-red-500" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Refus</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profil.criteresRefus.map((c) => (
                        <span key={c} className="bg-red-50 text-red-600 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investisseur */}
                {profil.objectif === 'investissement' && (profil.rendementMin || profil.budgetLoyerMax) && (
                  <div className="bg-[#C4963A]/5 border border-[#C4963A]/20 rounded-xl p-3 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C4963A] mb-2">Investisseur</p>
                    <div className="flex gap-4 text-xs">
                      {profil.rendementMin && (
                        <span className="text-gray-600">Rendement min: <b className="text-[#0F0F0F]">{profil.rendementMin}%</b></span>
                      )}
                      {profil.budgetLoyerMax && (
                        <span className="text-gray-600">Loyer max: <b className="text-[#0F0F0F]">{profil.budgetLoyerMax.toLocaleString('fr-FR')} DA</b></span>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {profil.notes && (
                  <div className="flex items-start gap-2 bg-white border border-gray-100 rounded-xl p-3 mb-4">
                    <StickyNote className="w-4 h-4 text-[#C4963A] mt-0.5" />
                    <p className="text-xs leading-relaxed text-gray-600">{profil.notes}</p>
                  </div>
                )}

                <button
                  onClick={() => onLancerDiagnostic(profil)}
                  className="w-full bg-[#FAFAF8] border border-gray-200 text-[#0F0F0F] rounded-lg py-2.5
                             font-bold text-xs uppercase tracking-widest hover:border-[#C4963A]
                             hover:bg-[#FEFBF4] active:scale-[0.98] transition-all"
                >
                  Lancer le diagnostic
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
