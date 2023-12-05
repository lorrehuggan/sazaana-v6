import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Hero from '~/components/hero';
import Navigation from '~/components/navigation';
import Particles from '~/components/particles';
import Query from '~/components/query';
import './_css/global.css';
import './_css/pre.css';
import Providers from './providers';

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
      <body className={manrope.className}>
        <Providers>
          <Navigation />
          <main className="container">
            <Hero />
            <Query />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
