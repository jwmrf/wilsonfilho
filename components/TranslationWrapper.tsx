import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const TranslationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation('common');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      if (!i18n.isInitialized) {
        await i18n.init();
      }
      // Force reload of resources
      await i18n.reloadResources();
      setIsLoaded(true);
    };

    loadTranslations();
  }, [i18n]);

  useEffect(() => {
    if (isLoaded) {
      console.log('Translations loaded. Current language:', i18n.language);
      console.log('Available namespaces:', Object.keys(i18n.store.data[i18n.language] || {}));
      console.log('Sample translation:', t('welcome'));
      console.log('All translations:', i18n.store.data);
      console.log('i18n:', i18n);
    }
  }, [isLoaded, i18n, t]);

  if (!isLoaded) return <div>Loading translations...</div>;

  return <>{children}</>;
};

export default TranslationWrapper;
