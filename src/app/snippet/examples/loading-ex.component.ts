import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from "rxjs";
import {LOADING_STATUS} from "../../components/loading.component";
import {WorkOrder, WorkOrdersService} from "../../state/workorders";
import {catchError, delay, mapTo, switchMap, take, tap} from "rxjs/operators";

let workOrderDelay = 4000;
let errorDelay = 6000;

@Component({
  selector: 'app-loading-ex',
  template: `
    <div class="wo-container">
      <ng-container *ngIf="workOrders$ | async as data">

        <ng-container *ngFor="let item of data">
          <div class="work-order-item">
            {{item.name}}
          </div>
        </ng-container>

      </ng-container>
      <app-loading style="padding-left: 5px" [status]="status$ | async"></app-loading>

      <app-loading style="padding-left: 5px" [status]="errorEx$ | async">
        <ng-template #errors>
          {{errorMsg}}
        </ng-template>
      </app-loading>
    </div>
    
  `,
  styles: [`    
    .work-order-item {
      background: #282a36;
      border-radius: 4px;
      color: white;
      transition: background-color .3s linear;
      padding: 5px;
      cursor: pointer;
    }

    .work-order-item:active, .work-order-item:hover {
      background: linear-gradient(
        30deg
        ,#50fa7b 0%,#8be9fd 100%);
    }

    .wo-container {
      display: grid;
      grid-auto-flow: row;
      gap:5px;
      padding:5px;
      background: #44475a;
    }
  `]
})
export class LoadingExComponent implements OnInit {

  private dispatcher = new BehaviorSubject<LOADING_STATUS>(LOADING_STATUS.INIT);
  public status$: Observable<LOADING_STATUS> = this.dispatcher.pipe();
  public dispatch = (value: LOADING_STATUS) => this.dispatcher.next(value);

  private errorExDispatcher = new BehaviorSubject<LOADING_STATUS>(LOADING_STATUS.INIT);
  public errorEx$: Observable<LOADING_STATUS> = this.errorExDispatcher.pipe();
  public dispatchErrorEx = (value: LOADING_STATUS) => this.errorExDispatcher.next(value);

  private workOrderDispatcher = new ReplaySubject<void>(1);
  public loadWorkOrderExample$: Observable<void> = this.workOrderDispatcher.pipe(
    take(1),
    tap(v => this.dispatch(LOADING_STATUS.PENDING)),
    delay(workOrderDelay),
    switchMap(id => this.wo.get()),
    tap(v => this.dispatch(LOADING_STATUS.SUCCESS)),
    mapTo(null),
    catchError(err => {
      this.errorMsg = err;
      this.dispatch(LOADING_STATUS.ERROR);
      return throwError(err);
    })
  );
  public forceErrorExample$: Observable<void> = this.workOrderDispatcher.pipe(
    tap(v => this.dispatchErrorEx(LOADING_STATUS.PENDING)),
    delay(errorDelay),
    tap(v => {
      throw new Error('Forced error')
    }),
    catchError(err => {
      this.errorMsg = err;
      this.dispatchErrorEx(LOADING_STATUS.ERROR);
      return throwError(err);
    })
  );
  public refreshState = () => this.workOrderDispatcher.next();

  workOrders$: Observable<WorkOrder[]> = this.wo.workOrderEntityState$.pipe(
    delay(workOrderDelay), // In case work orders have been loaded already from a different source. (Meta)
  );
  errorMsg;

  constructor(private wo: WorkOrdersService) {
  }

  ngOnInit(): void {
    this.loadWorkOrderExample$.pipe(take(1)).subscribe();
    this.forceErrorExample$.pipe(take(1)).subscribe();
    this.refreshState();
  }

}
