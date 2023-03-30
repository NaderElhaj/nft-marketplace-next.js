/* eslint-disable import/no-unresolved */
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import { Footer, Navbar } from '@/components';
import '@/styles/globals.css';
import { NFTProvider } from '@/context/NFTContext';

const App = ({ Component, pageProps }) => (
  <NFTProvider>

    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-24">
          <Component {...pageProps} />

        </div>
        <Footer />
      </div>
      <Script src="https://kit.fontawesome.com/d2f2d01ad3.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);

export default App;
