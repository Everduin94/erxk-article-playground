import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Article } from './article.model';

export interface ArticlesState extends EntityState<Article>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'articles'
})
export class ArticlesStore extends EntityStore<ArticlesState> {

  constructor() {
    super();
  }

}
