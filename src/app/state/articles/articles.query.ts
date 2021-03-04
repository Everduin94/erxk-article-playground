import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ArticlesStore, ArticlesState } from './articles.store';

@Injectable({ providedIn: 'root' })
export class ArticlesQuery extends QueryEntity<ArticlesState> {

  constructor(protected store: ArticlesStore) {
    super(store);
  }

}
