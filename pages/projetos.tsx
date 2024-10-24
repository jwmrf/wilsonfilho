import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Project {
  title: string;
  description: string;
  link: string;
  image: string; // Nova propriedade
}

export default function Projetos() {

  const projects: Project[] = [
    {
      title: "Url Tech Scraper",
      description: "Webscraping for detect technologies in a URL",
      link: "https://url-tech-scraper.wilsonfilho.site/",
      image: '/images/url-tech-scraper.png' // Caminho da imagem
    },
    {
      title: "Notices Crawler",
      description: "Webscraping to get the main image from a notice",
      link: "https://noticescrawler.wilsonfilho.site/",
      image: "/images/link-node-api.png" // Caminho da imagem
    }
  ];
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto px-6 py-8">
              <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{t('projects')}</h2>
          <ul className="space-y-6">
            {projects.map((project, index) => (
              <li key={index} className="border-b pb-6">
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="flex items-center">
                    <div className="w-32 h-32 mr-4">
                      <Image
                        src={project.image} // Adicionando a imagem do projeto
                        alt={project.title}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/projetos" className="text-blue-600 hover:underline">
              {t('view_all_projects')}
            </Link>
          </div>
        </div>
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
