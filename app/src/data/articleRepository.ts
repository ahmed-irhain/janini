import type { Article } from "@janini/shared";
import { fetchJson } from "./apiClient";

export interface ArticleRepository {
  listGeneral(topicSlug?: string | null): Promise<Article[]>;
  getById(id: string): Promise<Article>;
}

export const apiArticleRepository: ArticleRepository = {
  listGeneral: (topicSlug) =>
    fetchJson<Article[]>(`/articles${topicSlug ? `?topic=${encodeURIComponent(topicSlug)}` : ""}`),
  getById: (id) => fetchJson<Article>(`/articles/id/${id}`),
};
