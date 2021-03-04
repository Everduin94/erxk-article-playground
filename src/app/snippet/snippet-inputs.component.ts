import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-snippet-inputs",
  template: `
    <div class="standard-passing">
      <ng-container *ngFor="let input of inputs">
        {{input | json}}
      </ng-container>
    </div>
  `,
  host: { class: "inner-block" },
  styles: [
    `
      h3 {
        margin-bottom: -5px;
      }
    `,
  ],
})
export class SnippetInputsComponent implements OnInit {
  @Input() inputs = [];

  constructor() {}

  ngOnInit(): void {}
}
