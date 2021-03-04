import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WorkOrderStatus } from 'src/app/state/models/workorderstatus';
import { WorkOrdersService } from 'src/app/state/workorders';

@Component({
  selector: 'app-rxjs-filter-form',
  template: `
    <div class="work-order-form" [formGroup]="testForm">
        <mat-form-field class="example-full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Description</mat-label>
          <input matInput formControlName="description" />
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option [value]="woStatusRef.OPEN">{{
              woStatusRef.OPEN
            }}</mat-option>
            <mat-option [value]="woStatusRef.ON_HOLD">{{
              woStatusRef.ON_HOLD
            }}</mat-option>
            <mat-option [value]="woStatusRef.IN_PROGRESS">{{
              woStatusRef.IN_PROGRESS
            }}</mat-option>
            <mat-option [value]="woStatusRef.CLOSED">{{
              woStatusRef.CLOSED
            }}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Responsibility</mat-label>
          <mat-select formControlName="responsibility">
            <mat-option value="dummy-user">dummy-user</mat-option>
            <mat-option value="dummy-user-2">dummy-user-2</mat-option>
            <mat-option value="Erxk">Erxk</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
  `,
  styles: []
})
export class RxjsFilterFormComponent implements OnInit {

  @Input() id;

  testForm;
  readonly woStatusRef = WorkOrderStatus;

  constructor(private wos: WorkOrdersService) { }

  ngOnInit(): void {
    this.testForm = this.wos.activeWoForm;
  }

}
