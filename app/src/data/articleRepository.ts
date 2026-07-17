import type { Article } from "@janini/shared";
import { fetchJson } from "./apiClient";

export interface ArticleRepository {
  listGeneral(): Promise<Article[]>;
  getById(id: string): Promise<Article>;
}

export const apiArticleRepository: ArticleRepository = {
  listGeneral: () => fetchJson<Article[]>("/articles"),
  getById: (id) => fetchJson<Article>(`/articles/id/${id}`),
};
