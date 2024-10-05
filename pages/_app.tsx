import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TranslationWrapper from '../components/TranslationWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('App props:', pageProps);
  return (
    <TranslationWrapper>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
    </TranslationWrapper>
  );
}

export default appWithTranslation(MyApp);
