// components/TranslationWrapper.tsx

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      if (!i18n.isInitialized) {
        await i18n.init();
      }
      setIsLoaded(true);
    };

    loadTranslations();
  }, [i18n]);

  useEffect(() => {
    if (isLoaded) {
      console.log('Translations loaded. Current language:', i18n.language);
      console.log('Available namespaces:', Object.keys(i18n.store.data[i18n.language] || {}));
    }
  }, [isLoaded, i18n]);

  if (!isLoaded) {
    // You can replace this with a loading spinner or any other loading indicator
    return <div>Loading translations...</div>;
  }

  return <>{children}</>;
};

export default TranslationWrapper;
