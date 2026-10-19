import './globals.css';

export const metadata = {
  title: 'Moka POS Simple',
  description: 'Aplikasi Kasir Sederhana & Cepat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-100 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
