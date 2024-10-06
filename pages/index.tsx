import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getMediumPosts } from '../utils/mediumApi';
import { getGithubProfileImage } from '../utils/githubApi';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react'

interface HomeProps {
  posts: {
    title: string;
    subtitle: string;
    link: string;
    pubDate: string;
    thumbnail: string;
  }[];
  githubProfileImage: string | null;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

export default function Home({ posts, githubProfileImage }: HomeProps) {
  const { t } = useTranslation('common');
  const { i18n } = useTranslation('common');

  useEffect(() => {
    const loadTranslations = async () => {
      await i18n.reloadResources()
      i18n.changeLanguage(i18n.language)
    }
    loadTranslations()
  }, [i18n])

  // Exemplo de projetos (você pode substituir isso por dados reais)
  const projects: Project[] = [
    {
      title: "Projeto 1",
      description: "Descrição breve do Projeto 1",
      link: "/projetos/1"
    },
    {
      title: "Projeto 2",
      description: "Descrição breve do Projeto 2",
      link: "/projetos/2"
    },
    {
      title: "Projeto 3",
      description: "Descrição breve do Projeto 3",
      link: "/projetos/3"
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">{t('welcome', 'Welcome to my site')}</h1>
        <div className="w-full md:w-1/2 flex items-center">
          {githubProfileImage ? (
            <Image
              src={githubProfileImage}
              alt={t('profile_picture')}
              width={100}
              height={100}
              className="rounded-full mr-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
          )}
          <div>
            <h2 className="text-2xl font-semibold">{t('your_name', 'Wilson Filho')}</h2>
            <p className="text-gray-600">{t('your_title', 'Software Engineer')}</p>
            <p className="text-gray-700 mt-2">{t('about_short_description', 'Developer with over 5 years of experience, starting my professional journey in 2018. Specialized in full stack web development, with solid experience in mobile Android development.')}</p>
            <Link href="/sobre" className="text-blue-600 hover:underline mt-2 inline-block">
              {t('read_more_about', 'Read more about me')}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {/* Coluna dos Posts */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{t('recent_posts')}</h2>
          <ul className="space-y-8">
            {posts.map((post, index) => (
              <li key={index} className="border-b pb-6">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="flex flex-col">
                    {post.thumbnail && (
                      <div className="mb-4">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{post.title}</h3>
                      <p className="text-gray-600 mb-2">{post.subtitle}</p>
                      <p className="text-sm text-gray-500">{new Date(post.pubDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna dos Projetos */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{t('projects')}</h2>
          <ul className="space-y-6">
            {projects.map((project, index) => (
              <li key={index} className="border-b pb-6">
                <Link href={project.link} className="group">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
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
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getMediumPosts();
  const githubUsername = 'jwmrf'; // Substitua pelo seu username do GitHub
  const githubProfileImage = await getGithubProfileImage(githubUsername);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt', ['common'])),
      posts,
      githubProfileImage,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
