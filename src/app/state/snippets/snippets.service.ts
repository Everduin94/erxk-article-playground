import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { SnippetsStore, SnippetsState } from './snippets.store';

@Injectable({ providedIn: 'root' })
export class SnippetsService extends NgEntityService<SnippetsState> {

  constructor(protected store: SnippetsStore) {
    super(store);
  }

}
