import axios from 'axios';

const MEDIUM_USERNAME = 'jwmrf';

interface MediumPost {
  title: string;
  subtitle: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
    );
    return response.data.items.map((item: any) => {
      // Extrair a URL da imagem da descrição
      const imgMatch = item.description.match(/<img[^>]+src=["']?([^"'\s]+)["']?[^>]*>/);
      const thumbnail = imgMatch ? imgMatch[1] : '';
      // Extrair o subtítulo (primeiro parágrafo após a imagem)
      const subtitleMatch = item.description.match(/<\/figure>(?:<[^>]+>)*([^<]+)/);
      const subtitle = subtitleMatch 
        ? subtitleMatch[1].trim().slice(0, 150) + (subtitleMatch[1].length > 150 ? '...' : '')
        : '';

      return {
        title: item.title,
        subtitle: item.description.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
        link: item.link,
        pubDate: item.pubDate,
        thumbnail: thumbnail,
      };
    });
  } catch (error) {
    console.error('Erro ao buscar posts do Medium:', error);
    return [];
  }
}
