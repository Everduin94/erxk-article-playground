import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { merge, Observable, Subscription } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { WorkOrderStatus } from "src/app/state/models/workorderstatus";
import { WorkOrder, WorkOrdersService } from "src/app/state/workorders";

@Component({
  selector: "app-rxjs-filter",
  template: `
    <app-snippet [snippet]="baseSnippet">
        <app-rxjs-filter-form></app-rxjs-filter-form>
    </app-snippet>
  `,
  styles: [
    `
      .work-order-form {
        display: grid;
        grid-auto-rows: max-content;
      }
    `,
  ],
})
export class RxjsFilterComponent implements OnInit {
  readonly woStatusRef = WorkOrderStatus;

  baseSnippet = {
    id: "123",
    inputs: [
      {
        status: WorkOrderStatus.ON_HOLD,
      },
    ],
    source: `export class RxjsFilterComponent {
  wo$: Observable<WorkOrder> = this.wos.getById("1").pipe(tap((wo) => this.buildForm(wo)));
  isOpen$ = this.wo$.pipe(filter((wo) => WorkOrderStatus.OPEN === wo.status));
  isClosed$ = this.wo$.pipe(filter((wo) => WorkOrderStatus.CLOSED === wo.status));
  isInProgress$ = this.wo$.pipe(filter((wo) => WorkOrderStatus.IN_PROGRESS === wo.status));
  isOnHold$ = this.wo$.pipe(
    filter((wo) => WorkOrderStatus.ON_HOLD === wo.status),
    tap((_) => this.alertUserOnHold()),
    tap((_) => this.disableFieldsOnHold())
  );
  
  ngOnInit(): void {
    this.subscriptions.add(
      merge(this.isOpen$, this.isClosed$, this.isOnHold$, this.isInProgress$).subscribe()
    );
  }

  // ...
}`,
  };
  

  ngOnInit(): void {
    this.wos.activateWo("1");
  }

  constructor(
    public wos: WorkOrdersService
  ) {}

}
