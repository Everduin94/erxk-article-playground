import { Injectable } from "@angular/core";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WorkOrdersStore, WorkOrdersState } from "./work-orders.store";
import { cacheable, guid, ID } from "@datorama/akita";
import { merge, Observable, ReplaySubject, Subject } from "rxjs";
import { WorkOrder } from ".";
import { WorkOrdersQuery } from "./work-orders.query";
import {
  distinctUntilChanged,
  filter,
  first,
  map, mapTo,
  mergeMap,
  shareReplay,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import { createWorkOrder } from "./work-order.model";
import { HotToastService } from "@ngneat/hot-toast";
import { WorkOrderStatus } from "../models/workorderstatus";
import { FormBuilder, FormGroup } from "@angular/forms";

export const NEW_WO = "new-wo";

export function filterByStatus(status) {
  return filter((wo: WorkOrder) => status === wo.status)
}

@Injectable({ providedIn: "root" })
export class WorkOrdersService extends NgEntityService<WorkOrdersState> {
  
  activeWoForm: FormGroup;
  workOrderState$ = this.query.selectActive();
  workOrderEntityState$ = this.query.selectAll();
  workOrderEntityStateNames$ = this.query.selectAll().pipe(
      map((workorders: Array<{ id: ID; name: string }>) =>
        workorders.map(({ id, name }) => ({ id, name }))
      )
    );

  futureWoDispatcher = new Subject<ID | null>();
  dispatchWo = (id: ID | null) => this.futureWoDispatcher.next(id);
  createNewWoListener$: Observable<void> = this.futureWoDispatcher.pipe(
    filter((id) => id && id === NEW_WO),
    map((id) => createWorkOrder({ id: guid() })),
    switchMap((wo) => this.add(wo)),
    tap((wo: WorkOrder) => this.setActive(wo.id)),
    tap((wo: WorkOrder) => this.toast.success("Created WO - " + wo.id)),
    switchMap(_ => this.statusSideEffectsListener$),
  );
  loadExistingWoListener$: Observable<void> = this.futureWoDispatcher.pipe(
    filter((id) => id && id !== NEW_WO),
    tap((id: ID) => this.setActive(id)),
    tap((id: ID) =>  this.toast.success("Loaded WO - " + id)),
    switchMap(_ => this.statusSideEffectsListener$)
  );
  deactivateWoListener$: Observable<void> = this.futureWoDispatcher.pipe(
    filter((wo) => !wo),
    map((_) => this.setActive(null))
  );

  formBuilderListener$: Observable<WorkOrder> = this.workOrderState$.pipe(
    take(1),
    tap((wo: WorkOrder) => this.activeWoForm = this.buildForm(wo))
  );
  isOpen$ = this.formBuilderListener$.pipe(filterByStatus(WorkOrderStatus.OPEN));
  isClosed$ = this.formBuilderListener$.pipe(filterByStatus(WorkOrderStatus.CLOSED));
  isInProgress$ = this.formBuilderListener$.pipe(filterByStatus(WorkOrderStatus.IN_PROGRESS));
  isOnHold$ = this.formBuilderListener$.pipe(
    filterByStatus(WorkOrderStatus.ON_HOLD),
    tap((_) => this.alertUserOnHold()),
    tap((_) => this.disableFieldsOnHold())
  );

  statusSideEffectsListener$: Observable<void> = merge(
    this.isOpen$,
    this.isClosed$,
    this.isOnHold$,
    this.isInProgress$
  ).pipe(map(_ => undefined));

  activateWoListener$: Observable<void> = merge(
    this.createNewWoListener$,
    this.loadExistingWoListener$,
    this.deactivateWoListener$
  );

  constructor(
    protected store: WorkOrdersStore,
    protected query: WorkOrdersQuery,
    private toast: HotToastService,
    private fb: FormBuilder
  ) {
    super(store);
    this.activateWoListener$.subscribe();
    this.get().subscribe();    
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
