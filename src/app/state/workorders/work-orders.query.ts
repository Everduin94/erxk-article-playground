import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkOrdersStore, WorkOrdersState } from './work-orders.store';

@Injectable({ providedIn: 'root' })
export class WorkOrdersQuery extends QueryEntity<WorkOrdersState> {

  constructor(protected store: WorkOrdersStore) {
    super(store);
  }

}
