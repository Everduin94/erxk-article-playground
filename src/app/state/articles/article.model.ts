import { ID } from '@datorama/akita';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Article {
  id: ID;
  name: string;
  description: string;
  imageUrl: string;
  icon: IconDefinition;
}

export function createArticle(params: Partial<Article>) {
  return {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
    icon: null,
    ...params
  } as Article;
}
