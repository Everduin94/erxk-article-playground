import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { WorkOrder } from './work-order.model';

export interface WorkOrdersState extends EntityState<WorkOrder>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'workOrders'
})
export class WorkOrdersStore extends EntityStore<WorkOrdersState> {

  constructor() {
    super();
  }

}
