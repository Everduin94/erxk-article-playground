import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SnippetsStore, SnippetsState } from './snippets.store';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Snippet} from "./snippet.model";

@Injectable({ providedIn: 'root' })
export class SnippetsQuery extends QueryEntity<SnippetsState> {

  constructor(protected store: SnippetsStore) {
    super(store);
  }

  selectByEndPoint(endPoint: string): Observable<Snippet[]> {
    return this.selectAll({filterBy: entity => entity.groupId === endPoint}).pipe(
      map(snippets => snippets.sort((a,b) => a.order - b.order)),
    );
  }

}
