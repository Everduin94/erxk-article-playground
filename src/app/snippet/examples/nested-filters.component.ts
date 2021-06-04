import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {ID} from "@datorama/akita";
import {NEW_WO, WorkOrder, WorkOrdersService} from "../../state/workorders";

@Component({
  selector: 'app-nested-filters',
  template: `
    <ng-container *ngIf="allWoNames$ | async as wos">
      <ng-container *ngIf="{ value: activeWo$ | async } as activeWo">
        <ng-container *ngIf="activeWo.value">
          <button mat-stroked-button color="accent" (click)="setActive(null)">
            <fa-icon [icon]="returnIcon"></fa-icon>
          </button>
          <app-rxjs-filter-form [runEffects]="false"></app-rxjs-filter-form>
        </ng-container>

        <ng-container *ngIf="!activeWo.value">
          <ng-container *ngFor="let wo of wos">
            <a (click)="setActive(wo.id)">{{ wo.name }}</a>
          </ng-container>
          <button mat-stroked-button color="primary" (click)="generateWo()">New WO</button>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  styles: []
})
export class NestedFiltersComponent implements OnInit, OnDestroy {

  readonly subscription = new Subscription();
  readonly returnIcon = faArrowLeft;

  allWoNames$: Observable<Array<{ id: ID; name: string }>>;
  activeWo$: Observable<WorkOrder>;

  constructor(public wos: WorkOrdersService) {
  }

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
