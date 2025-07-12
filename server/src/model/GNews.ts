export interface GNewsSource {
  name: string;
  url: string;
}
  
export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: GNewsSource;
}

export interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}