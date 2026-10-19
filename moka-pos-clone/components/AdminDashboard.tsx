'use client';
import React from 'react';
import { LayoutDashboard, PackageSearch, Users, ScrollText, Settings, TrendingUp, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">M</div>
          <h1 className="font-bold text-white text-lg tracking-wide">Backoffice</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: PackageSearch, label: 'Produk & Inventori' },
            { icon: ScrollText, label: 'Laporan Transaksi' },
            { icon: Users, label: 'CRM Pelanggan' },
            { icon: Settings, label: 'Pengaturan Outlet' }
          ].map((item, idx) => (
            <a key={idx} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Ringkasan Hari Ini</h2>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">Outlet Jakarta</span>
            <div className="h-10 w-10 bg-slate-200 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Penjualan', val: 'Rp 14.500.000', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Transaksi Berhasil', val: '142 TRX', icon: ScrollText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Pelanggan Baru', val: '24 Orang', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.val}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 text-lg">Transaksi Terbaru (Real-time Google Sheets)</h3>
               <button className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">Export CSV</button>
             </div>
             <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                 <tr>
                   <th className="p-4 font-medium">Invoice ID</th>
                   <th className="p-4 font-medium">Waktu</th>
                   <th className="p-4 font-medium">Metode</th>
                   <th className="p-4 font-medium">Total</th>
                   <th className="p-4 font-medium">Status</th>
                 </tr>
               </thead>
               <tbody className="text-sm text-slate-700 divide-y divide-slate-50">
                 <tr>
                   <td className="p-4 font-medium text-indigo-600">TRX-1701230192</td>
                   <td className="p-4">12:45 PM</td>
                   <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold border border-blue-100">QRIS</span></td>
                   <td className="p-4 font-bold">Rp 125.000</td>
                   <td className="p-4"><span className="text-emerald-600 flex items-center gap-1"><CheckCircle className="h-4 w-4"/> Selesai</span></td>
                 </tr>
                 <tr>
                   <td className="p-4 font-medium text-indigo-600">TRX-1701230100</td>
                   <td className="p-4">12:30 PM</td>
                   <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">CASH</span></td>
                   <td className="p-4 font-bold">Rp 45.000</td>
                   <td className="p-4"><span className="text-emerald-600 flex items-center gap-1"><CheckCircle className="h-4 w-4"/> Selesai</span></td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
