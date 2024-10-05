import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} {t('name')}. {t('rights_reserved')}</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/jwmrf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              GitHub
            </a>
            <a href="https://linkedin.com/in/jwmrf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              LinkedIn
            </a>
            <a href="https://medium.com/@jwmrf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              Medium
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
