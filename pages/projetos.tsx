import { GetStaticProps } from 'next';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Projetos() {
  // const { t } = useTranslation('common');

  return (
    <div className="container mx-auto px-6 py-8">
      {/* <h1 className="text-4xl font-bold mb-8">{t('projects')}</h1>
      <ul>
        <li className="mb-4">
          <h2 className="text-2xl font-semibold">{t('project1_title')}</h2>
          <p>{t('project1_description')}</p>
        </li>
        <li className="mb-4">
          <h2 className="text-2xl font-semibold">{t('project2_title')}</h2>
          <p>{t('project2_description')}</p>
        </li>
      </ul> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt', ['common'])),
    },
  };
};
