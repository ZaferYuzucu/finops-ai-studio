import React, { useState } from 'react';

const StudioCreatorPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'finops2025') {
      setOk(true);
    }
  };

  if (ok) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-4 text-sm text-slate-200">
        <h1 className="text-2xl font-semibold text-slate-50">Studio Creator</h1>
        <p>Burada yönetici arayüzü ve dashboard oluşturucu yer alacak.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xs px-4 py-10 space-y-4 text-sm text-slate-200">
      <h1 className="text-lg font-semibold text-slate-50 text-center">
        Yönetici Girişi
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-finops-blue"
          placeholder="Yönetici şifresi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-finops-blue py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Giriş Yap
        </button>
      </form>
      <p className="text-[11px] text-slate-400 text-center">
        Demo amaçlı şifre: <span className="font-mono">finops2025</span>
      </p>
    </div>
  );
};

export default StudioCreatorPage;
