import type { Metadata } from 'next';
import { Exo_2, Space_Mono } from 'next/font/google';
import './globals.css';

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Rick & Morty SOA Explorer',
  description: 'Arquitectura SOA – Explorador del multiverso Rick and Morty',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${exo2.variable} ${spaceMono.variable}`}>
      <body className="font-display antialiased">
        {children}
      </body>
    </html>
  );
}
