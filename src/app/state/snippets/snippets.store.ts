import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Snippet } from './snippet.model';

export interface SnippetsState extends EntityState<Snippet> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'snippets'
})
export class SnippetsStore extends EntityStore<SnippetsState> {

  constructor() {
    super();
  }

}
