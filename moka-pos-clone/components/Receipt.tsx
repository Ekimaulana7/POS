'use client';
import React from 'react';

interface ReceiptProps {
  cart: any[];
  total: number;
  paymentMethod: string;
  cashGiven: number;
  transactionId: string;
}

export default function Receipt({ cart, total, paymentMethod, cashGiven, transactionId }: ReceiptProps) {
  const change = cashGiven - total;
  const date = new Date().toLocaleString('id-ID');

  return (
    <div className="hidden print:block w-[80mm] text-black font-mono text-sm mx-auto p-4 bg-white">
      <div className="text-center mb-4">
        <h2 className="font-bold text-xl uppercase">MOKA POS CLONE</h2>
        <p className="text-xs">Jl. Sudirman No. 1, Jakarta Pusat</p>
        <p className="text-xs">Telp: 0812-3456-7890</p>
        <div className="border-b-2 border-black border-dashed my-2"></div>
      </div>

      <div className="text-xs mb-4">
        <p>No: {transactionId}</p>
        <p>Tgl: {date}</p>
        <p>Kasir: Admin Kasir</p>
        <div className="border-b-2 border-black border-dashed my-2"></div>
      </div>

      <div className="mb-4">
        {cart.map((item, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-bold">{item.name}</p>
            <div className="flex justify-between text-xs">
              <span>{item.qty} x {item.price.toLocaleString('id-ID')}</span>
              <span>{(item.qty * item.price).toLocaleString('id-ID')}</span>
            </div>
          </div>
        ))}
        <div className="border-b-2 border-black border-dashed my-2"></div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>METODE</span>
          <span>{paymentMethod}</span>
        </div>
        {paymentMethod === 'CASH' && (
          <>
            <div className="flex justify-between">
              <span>TUNAI</span>
              <span>Rp {cashGiven.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>KEMBALI</span>
              <span>Rp {change > 0 ? change.toLocaleString('id-ID') : 0}</span>
            </div>
          </>
        )}
      </div>

      <div className="text-center mt-6 text-xs">
        <p>Terima kasih atas kunjungan Anda!</p>
        <p>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.</p>
      </div>
    </div>
  );
}
