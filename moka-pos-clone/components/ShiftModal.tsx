'use client';
import React, { useState } from 'react';
import { Banknote, X, Save } from 'lucide-react';

export default function ShiftModal({ onClose }: { onClose: () => void }) {
  const [startingCash, setStartingCash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenShift = async () => {
    setLoading(true);
    await fetch('/api/shift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'open', cashierName: 'Kasir Utama', startingCash: Number(startingCash) })
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X className="h-5 w-5"/></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><Banknote className="h-6 w-6" /></div>
          <h2 className="text-xl font-bold text-slate-800">Buka Shift Kasir</h2>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-600 mb-2">Modal Kas Awal (Starting Cash)</label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-500 font-bold">Rp</span>
            <input 
              type="number" 
              value={startingCash}
              onChange={(e) => setStartingCash(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-12 pr-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="0"
            />
          </div>
        </div>

        <button 
          onClick={handleOpenShift} disabled={loading || !startingCash}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
          {loading ? 'Menyimpan...' : <><Save className="h-5 w-5" /> Mulai Transaksi</>}
        </button>
      </div>
    </div>
  );
}
