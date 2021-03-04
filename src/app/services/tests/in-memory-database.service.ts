import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faScroll } from "@fortawesome/free-solid-svg-icons/faScroll";
import { createWorkOrder, WorkOrder, WorkOrderCode } from "src/app/state/workorders";
import { User } from "src/app/state/user/user.store";
import { WorkOrderStatus } from "src/app/state/models/workorderstatus";

@Injectable({
  providedIn: "root",
})
export class InMemoryDatabaseService implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    // Examples
    const users: Array<User> = [];

    const workOrders: Array<WorkOrder> = [
      createWorkOrder({id: '1', status: WorkOrderStatus.ON_HOLD}),
      createWorkOrder({id: '2'}),
      createWorkOrder({id: '3'}),
      createWorkOrder({id: '4'}),
      createWorkOrder({id: '5'}),
      createWorkOrder({id: '6'}),
      createWorkOrder({id: '7'}),
      createWorkOrder({id: '8'}),
      createWorkOrder({id: '9'}),
      createWorkOrder({id: '10'}),
    ];

    const workOrderCodes: Array<WorkOrderCode> = [{ id: "1", code: 1, description: "Basic" }];

    // Meta
    const articles: Array<any> = [
      { id: "rxjsfilter", name: "RxJS Filter", description: "Declarative Conditional Statements", icon: faFilter },
      { id: "formTips", name: "Form Tips", description: "Reactive Forms Tips and Tricks", icon: faScroll },
    ];

    return { users, workOrders, workOrderCodes, articles };
  }
}
