import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react';

interface Props {
  onConnexion: () => void;
  onRetour: () => void;
  modeInitial?: 'login' | 'register';
}

export function Login({ onConnexion, onRetour, modeInitial = 'login' }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(modeInitial);
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [info, setInfo] = useState('');
  const [chargement, setChargement] = useState(false);
  const { signIn, signUp } = useAuth();

  // Mettre à jour le mode si la prop change
  useEffect(() => {
    setMode(modeInitial);
    setErreur('');
    setInfo('');
  }, [modeInitial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setInfo('');

    if (!email.trim() || !motDePasse.trim()) {
      setErreur('Merci de remplir tous les champs.');
      return;
    }

    if (mode === 'register' && motDePasse !== confirmerMotDePasse) {
      setErreur('Les mots de passe ne correspondent pas.');
      return;
    }

    setChargement(true);
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, motDePasse);
        if (error) {
          setErreur(error.message ?? 'Erreur de connexion');
          setChargement(false);
          return;
        }
        onConnexion();
      } else {
        const { data, error } = await signUp(email, motDePasse);
        if (error) {
          setErreur(error.message ?? "Erreur lors de la création du compte");
          setChargement(false);
          return;
        }
        
        // Si Supabase requiert la confirmation d'email
        if (data?.user && !data.session) {
          setInfo("Compte créé avec succès. Veuillez vérifier votre boîte mail pour confirmer votre inscription.");
          setEmail('');
          setMotDePasse('');
          setConfirmerMotDePasse('');
        } else {
          // Si connecté immédiatement après inscription
          onConnexion();
        }
      }
    } catch (err: any) {
      setErreur(err.message ?? 'Une erreur est survenue.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 relative overflow-hidden">
      
      {/* Scattered gold dots — exact pitch-deck aesthetic */}
      <span className="absolute top-[12%] left-[14%] w-1.5 h-1.5 rounded-full bg-[#C4963A] opacity-60" />
      <span className="absolute top-[18%] right-[18%] w-1 h-1 rounded-full bg-[#C4963A] opacity-40" />
      <span className="absolute bottom-[14%] right-[28%] w-1 h-1 rounded-full bg-[#C4963A] opacity-50" />

      {/* Button to go back to landing page */}
      <button 
        onClick={onRetour}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="mb-4 select-none">
        <img
          src="/115b7138-971e-4a24-9198-31bd0b9c43a4.jpg"
          alt="MAMLEK Logo"
          className="w-16 h-16 object-contain mx-auto drop-shadow-sm"
        />
      </div>

      <h1
        className="text-3xl font-black tracking-tight text-[#0F0F0F] uppercase mb-1 select-none"
        style={{ letterSpacing: '-0.02em' }}
      >
        MAMLEK
      </h1>
      <p className="text-[10px] tracking-[0.2em] text-[#C4963A] uppercase font-semibold mb-8">
        Espace Agent
      </p>

      {/* Mode Tab Selector */}
      <div className="flex border-b border-gray-100 w-full max-w-xs mb-6 text-xs font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => { setMode('login'); setErreur(''); setInfo(''); }}
          className={`flex-1 pb-3 text-center transition-all ${
            mode === 'login' 
              ? 'border-b-2 border-[#C4963A] text-black' 
              : 'text-gray-400 hover:text-black'
          }`}
        >
          Se connecter
        </button>
        <button
          type="button"
          onClick={() => { setMode('register'); setErreur(''); setInfo(''); }}
          className={`flex-1 pb-3 text-center transition-all ${
            mode === 'register' 
              ? 'border-b-2 border-[#C4963A] text-black' 
              : 'text-gray-400 hover:text-black'
          }`}
        >
          Créer un compte
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        <div>
          <label className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="agent@mamlek.com"
            disabled={chargement}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:border-[#C4963A] transition-all disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="••••••••"
            disabled={chargement}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:border-[#C4963A] transition-all disabled:opacity-50"
          />
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmerMotDePasse}
              onChange={(e) => setConfirmerMotDePasse(e.target.value)}
              placeholder="••••••••"
              disabled={chargement}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:border-[#C4963A] transition-all disabled:opacity-50"
            />
          </div>
        )}

        {erreur && (
          <p className="text-xs text-red-500 font-medium pt-1">{erreur}</p>
        )}

        {info && (
          <p className="text-xs text-emerald-600 font-medium pt-1 bg-emerald-50 border border-emerald-100 rounded-xl p-3">{info}</p>
        )}

        <button
          type="submit"
          disabled={chargement}
          className="w-full bg-[#0F0F0F] text-white rounded-xl py-4 px-6 font-bold text-sm
                     uppercase tracking-widest flex items-center justify-center gap-3
                     hover:bg-[#1a1a1a] active:scale-[0.98] transition-all shadow-lg mt-4 disabled:opacity-50"
        >
          {chargement ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : mode === 'login' ? (
            <>
              <LogIn className="w-4 h-4" />
              Se connecter
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Créer un compte
            </>
          )}
        </button>
      </form>

      <p className="text-[10px] text-gray-400 mt-8 tracking-widest uppercase">
        Mamlek · Property Intelligence
      </p>
    </div>
  );
}
