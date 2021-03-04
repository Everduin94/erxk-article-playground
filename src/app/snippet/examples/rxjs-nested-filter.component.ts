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
    inputs: [],
    source: ``,
  };
  readonly subscription = new Subscription();
  readonly returnIcon = faArrowLeft;

  allWoNames$: Observable<Array<{ id: ID; name: string }>>;
  activeWo$: Observable<WorkOrder>;

  constructor(public wos: WorkOrdersService) {}

  ngOnInit(): void {
    this.activeWo$ = this.wos.selectActive$;
    this.allWoNames$ = this.wos.selectWoNames$;
    this.wos.setActive(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setActive(id) {
    this.wos.activateWo(id);
  }

  generateWo() {
    this.wos.activateWo(NEW_WO);
  }
}
