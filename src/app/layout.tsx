import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import './_css/global.css';
import './_css/pre.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sazaana',
  description: 'Sazaana Playlist Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
