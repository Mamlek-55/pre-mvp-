import { useState, useEffect } from 'react';
import { Visite, Page, Profil } from './types';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { NouvelleVisite } from './components/NouvelleVisite';
import { ResumeVisite } from './components/ResumeVisite';
import { ListeVisites } from './components/ListeVisites';
import { DetailVisite } from './components/DetailVisite';
import { ListeProfils } from './components/ListeProfils';
import { NouveauProfil } from './components/NouveauProfil';
import { PublicLanding } from './components/PublicLanding';

function App() {
  const [agentConnecte, setAgentConnecte] = useState(false);
  const [vuePortail, setVuePortail] = useState<'public' | 'login' | 'register'>('public');
  const [page, setPage] = useState<Page>('accueil');
  const [visites, setVisites] = useState<Visite[]>([]);
  const [visiteEnCours, setVisiteEnCours] = useState<Visite | null>(null);
  const [visiteSelectionnee, setVisiteSelectionnee] = useState<Visite | null>(null);
  const [profils, setProfils] = useState<Profil[]>([]);

  // Charger les visites depuis localStorage
  useEffect(() => {
    const data = localStorage.getItem('mamlek-visites');
    if (data) {
      setVisites(JSON.parse(data));
    }
    const dataProfils = localStorage.getItem('mamlek-profils');
    if (dataProfils) {
      setProfils(JSON.parse(dataProfils));
    }
  }, []);

  // Sauvegarder dans localStorage
  const sauvegarderVisite = (visite: Visite) => {
    setVisiteEnCours(visite);
    setPage('resume');
  };

  const confirmerVisite = (visite: Visite) => {
    const nouvellesVisites = [visite, ...visites];
    setVisites(nouvellesVisites);
    localStorage.setItem('mamlek-visites', JSON.stringify(nouvellesVisites));
    setVisiteEnCours(null);
    setPage('accueil');
  };

  const supprimerVisite = (id: string) => {
    const nouvelles = visites.filter(v => v.id !== id);
    setVisites(nouvelles);
    localStorage.setItem('mamlek-visites', JSON.stringify(nouvelles));
  };

  const voirDetail = (visite: Visite) => {
    setVisiteSelectionnee(visite);
    setPage('detail');
  };

  // Profils (leads)
  const ajouterProfil = (profil: Profil) => {
    const nouveauxProfils = [profil, ...profils];
    setProfils(nouveauxProfils);
    localStorage.setItem('mamlek-profils', JSON.stringify(nouveauxProfils));
    setPage('profils');
  };

  const lancerDiagnosticDepuisProfil = (_profil: Profil) => {
    // Pour l'instant on lance simplement le flux de diagnostic existant.
    // Le lien profil <-> visite sera ajoute lors du branchement backend.
    setPage('nouvelle');
  };

  if (!agentConnecte) {
    if (vuePortail === 'public') {
      return (
        <PublicLanding
          onConnexion={() => setVuePortail('login')}
          onInscription={() => setVuePortail('register')}
        />
      );
    }
    return (
      <Login
        modeInitial={vuePortail === 'register' ? 'register' : 'login'}
        onConnexion={() => setAgentConnecte(true)}
        onRetour={() => setVuePortail('public')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {page === 'accueil' && (
        <LandingPage
          onNouvelleVisite={() => setPage('nouvelle')}
          onVoirVisites={() => setPage('liste')}
          onVoirProfils={() => setPage('profils')}
          nombreVisites={visites.length}
        />
      )}

      {page === 'nouvelle' && (
        <NouvelleVisite
          onSauvegarder={sauvegarderVisite}
          onAnnuler={() => setPage('accueil')}
        />
      )}

      {page === 'resume' && visiteEnCours && (
        <ResumeVisite
          visite={visiteEnCours}
          onConfirmer={() => confirmerVisite(visiteEnCours)}
          onModifier={() => setPage('nouvelle')}
        />
      )}

      {page === 'liste' && (
        <ListeVisites
          visites={visites}
          onRetour={() => setPage('accueil')}
          onDetail={voirDetail}
          onSupprimer={supprimerVisite}
        />
      )}

      {page === 'detail' && visiteSelectionnee && (
        <DetailVisite
          visite={visiteSelectionnee}
          onRetour={() => setPage('liste')}
        />
      )}

      {page === 'profils' && (
        <ListeProfils
          profils={profils}
          onRetour={() => setPage('accueil')}
          onNouveauProfil={() => setPage('nouveauProfil')}
          onLancerDiagnostic={lancerDiagnosticDepuisProfil}
        />
      )}

      {page === 'nouveauProfil' && (
        <NouveauProfil
          onEnregistrer={ajouterProfil}
          onRetour={() => setPage('profils')}
        />
      )}
    </div>
  );
}

export default App;
