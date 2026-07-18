import type { Topic } from "@janini/shared";
import { fetchJson } from "./apiClient";

export interface TopicRepository {
  list(): Promise<Topic[]>;
}

export const apiTopicRepository: TopicRepository = {
  list: () => fetchJson<Topic[]>("/topics"),
};
