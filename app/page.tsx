'use client';
import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash, CheckCircle, RefreshCw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function SimplePOS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load dummy / data produk awal
  useEffect(() => {
    // Simulasi produk cepat agar langsung kelihatan tampilannya yang modern
    setProducts([
      { id: '1', name: 'Kopi Susu Aren', price: 18000, stock: 50, category: 'Minuman' },
      { id: '2', name: 'Croissant Butter', price: 25000, stock: 20, category: 'Makanan' },
      { id: '3', name: 'Matcha Latte', price: 22000, stock: 30, category: 'Minuman' },
      { id: '4', name: 'Nasi Goreng Special', price: 35000, stock: 15, category: 'Makanan' },
    ]);
    setLoading(false);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === product.id);
      if (exist) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as any);
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setCart([]);
    }, 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      {/* BAGIAN KIRI: Daftar Produk */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Moka POS Simple</h1>
            <p className="text-sm text-slate-500">Pilih produk untuk dimasukkan ke keranjang kasir.</p>
          </div>
          <button onClick={() => window.location.reload()} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50">
            <RefreshCw className="h-4 w-4 text-slate-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div 
              key={p.id} 
              onClick={() => addToCart(p)}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between h-36"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{p.category}</span>
                <h3 className="font-bold text-slate-800 mt-2">{p.name}</h3>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900">Rp {p.price.toLocaleString('id-ID')}</span>
                <span className="text-xs text-slate-400 font-medium">Stok: {p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BAGIAN KANAN: Keranjang & Checkout */}
      <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shadow-xl">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2 font-bold text-lg text-slate-800">
          <ShoppingCart className="h-5 w-5 text-indigo-600" />
          Keranjang Kasir
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
              <ShoppingCart className="h-12 w-12 text-slate-200 mb-2" />
              <p className="text-sm">Belum ada pesanan.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-sm text-slate-800">{item.product.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">Rp {(item.product.price * item.qty).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.product.id, -1)} className="p-1 bg-white rounded shadow-sm border border-slate-200"><Minus className="h-3 w-3" /></button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} className="p-1 bg-white rounded shadow-sm border border-slate-200"><Plus className="h-3 w-3" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-between mb-4 text-base font-bold text-slate-800">
            <span>Total Tagihan:</span>
            <span className="text-indigo-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {successMsg ? <><CheckCircle className="h-5 w-5" /> Pembayaran Berhasil!</> : 'Bayar Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
}
