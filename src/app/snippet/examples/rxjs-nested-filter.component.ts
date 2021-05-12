import { Component, OnDestroy, OnInit } from "@angular/core";
import { ID } from "@datorama/akita";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { Observable, Subscription } from "rxjs";
import { NEW_WO, WorkOrder, WorkOrdersService } from "src/app/state/workorders";

@Component({
  selector: "app-rxjs-nested-filter",
  template: `
    <app-snippet [snippet]="baseSnippet">
      <ng-container *ngIf="allWoNames$ | async as wos">
        <ng-container *ngIf="{ value: activeWo$ | async } as activeWo">
          <ng-container *ngIf="activeWo.value">
            <button mat-stroked-button color="accent" (click)="setActive(null)"><fa-icon [icon]="returnIcon"></fa-icon></button>
            <app-rxjs-filter-form></app-rxjs-filter-form>
          </ng-container>

          <ng-container *ngIf="!activeWo.value">
            <ng-container *ngFor="let wo of wos">
              <a (click)="setActive(wo.id)">{{ wo.name }}</a>
            </ng-container>
            <button mat-stroked-button color="primary" (click)="generateWo()">New WO</button>
          </ng-container>
        </ng-container>
      </ng-container>
    </app-snippet>
  `,
  styles: [`
  
  `],
})
export class RxjsNestedFilterComponent implements OnInit, OnDestroy {
  readonly baseSnippet = {
    id: "456",
    inputs: [`Editing is not wired up`],
    source: `  
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
    
    `,
  };
  readonly subscription = new Subscription();
  readonly returnIcon = faArrowLeft;

  allWoNames$: Observable<Array<{ id: ID; name: string }>>;
  activeWo$: Observable<WorkOrder>;

  constructor(public wos: WorkOrdersService) {}

  ngOnInit(): void {
    this.activeWo$ = this.wos.workOrderState$;
    this.allWoNames$ = this.wos.workOrderEntityStateNames$;
    this.wos.setActive(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setActive(id) {
    this.wos.dispatchWo(id);
  }

  generateWo() {
    this.wos.dispatchWo(NEW_WO);
  }
}
