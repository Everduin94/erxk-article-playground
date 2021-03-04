import { Injectable } from "@angular/core";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WorkOrdersStore, WorkOrdersState } from "./work-orders.store";
import { cacheable, guid, ID } from "@datorama/akita";
import { merge, Observable, Subject } from "rxjs";
import { WorkOrder } from ".";
import { WorkOrdersQuery } from "./work-orders.query";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import { createWorkOrder } from "./work-order.model";
import { HotToastService } from "@ngneat/hot-toast";
import { WorkOrderStatus } from "../models/workorderstatus";
import { FormBuilder } from "@angular/forms";

export const NEW_WO = "new-wo";

@Injectable({ providedIn: "root" })
export class WorkOrdersService extends NgEntityService<WorkOrdersState> {
  activeWoForm;

  selectActive$ = this.query.selectActive();
  selectAll$ = this.query.selectAll();
  selectWoNames$ = this.query
    .selectAll()
    .pipe(
      map((workorders: Array<{ id: ID; name: string }>) =>
        workorders.map(({ id, name }) => ({ id, name }))
      )
    );

  activateWoEvent = new Subject();
  activateWo = (id) => this.activateWoEvent.next(id);
  createNewWo$ = this.activateWoEvent.pipe(
    filter((id) => id && id === NEW_WO),
    map((id) => createWorkOrder({ id: guid() })),
    tap((wo) => {
      this.add(wo).subscribe();
      this.setActive(wo.id);
      this.toast.success("Created WO - " + wo.id);
    })
  );
  loadExistingWo$ = this.activateWoEvent.pipe(
    filter((id) => id && id !== NEW_WO),
    tap((id: ID) => {
      this.setActive(id);
      this.toast.success("Loaded WO - " + id);
    }),
    switchMap((id) => this.statusSideEffects$)
  );
  deactivateWo$ = this.activateWoEvent.pipe(
    filter((id) => !id),
    tap((_) => this.setActive(null))
  );

  wo$ = this.query.selectActive().pipe(
    take(1),
    tap((wo) => (this.activeWoForm = this.buildForm(wo)))
  );
  isOpen$ = this.wo$.pipe(
    filter((wo) => WorkOrderStatus.OPEN === wo.status)
  );
  isClosed$ = this.wo$.pipe(
    filter((wo) => WorkOrderStatus.CLOSED === wo.status)
  );
  isInProgress$ = this.wo$.pipe(
    filter((wo) => WorkOrderStatus.IN_PROGRESS === wo.status)
  );
  isOnHold$ = this.wo$.pipe(
    filter((wo) => WorkOrderStatus.ON_HOLD === wo.status),
    tap((_) => this.alertUserOnHold()),
    tap((_) => this.disableFieldsOnHold())
  );
  statusSideEffects$ = merge(
    this.isOpen$,
    this.isClosed$,
    this.isOnHold$,
    this.isInProgress$
  );

  activateWo$ = merge(
    this.createNewWo$,
    this.loadExistingWo$,
    this.deactivateWo$
  );

  constructor(
    protected store: WorkOrdersStore,
    protected query: WorkOrdersQuery,
    private toast: HotToastService,
    private fb: FormBuilder
  ) {
    super(store);
    this.get().subscribe();
    this.activateWo$.subscribe();
  }

  getById(id): Observable<WorkOrder> {
    return cacheable(this.store, this.get(id, { upsert: true, append: true }));
  }

  setActive(id: ID | null) {
    this.store.setActive(id);
  }

  /* Client Stuff */
  buildForm(wo, params?) {
    return this.fb.group({
      ...wo,
      ...params,
    });
  }

  alertUserOnHold() {
    this.toast.warning("On Hold - Contact Admin");
  }

  disableFieldsOnHold() {
    setTimeout(() => {
      this.activeWoForm.get("name").disable();
      this.activeWoForm.get("description").disable();
      this.activeWoForm.get("status").disable();
    }, 0);
  }
}
