import { Nunito } from 'next/font/google';

import { NavBar, Providers } from '@/components';

import './globals.css';

interface Props {
  children: React.ReactNode;
}

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Novus Dex',
  description: 'Crypto currency exchange on the Ethereum Goerli test network.',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <body className="flex min-h-screen flex-col bg-light dark:bg-dark">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
