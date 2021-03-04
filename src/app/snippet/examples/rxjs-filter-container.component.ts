import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rxjs-filter-container",
  template: `
    <mat-tab-group>
      <mat-tab label="Basic">
        <ng-template matTabContent>
          <div class="glass-bg fill-block router-container">
            <app-rxjs-filter></app-rxjs-filter>
          </div>
        </ng-template>
      </mat-tab>
      <mat-tab label="Nested">
        <ng-template matTabContent>
          <div class="glass-bg fill-block router-container">
            <app-rxjs-nested-filter></app-rxjs-nested-filter>
          </div>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [],
})
export class RxjsFilterContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
