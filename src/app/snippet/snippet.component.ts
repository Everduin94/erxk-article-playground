import { Component, Input, OnInit } from "@angular/core";
import { ID } from "@datorama/akita";

@Component({
  selector: "app-snippet",
  template: `
    <div class="example">
      <h3>Example</h3>
      <app-snippet-example>
        <ng-content></ng-content>
      </app-snippet-example>
    </div>

    <div class="source">
      <h3 class="adjust-header">Source</h3>
      <app-snippet-source [source]="snippet?.source"></app-snippet-source>
    </div>

    <div class="inputs">
      <h3>Inputs & Outputs</h3>
      <app-snippet-inputs [inputs]="snippet?.inputs"></app-snippet-inputs>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: 20px;
        padding: 8px;
        margin: 8px;
        margin-top: 0;  
        margin-bottom: 0;
        grid-template-areas:
          "e e i"
          "e e s";
        box-sizing: border-box;
      }

      .example {
        grid-area: e;
      }

      .source {
        grid-area: s;
      }

      .inputs {
        grid-area: i;
      }

      .adjust-header {
        margin: -5px;
      }
    `,
  ],
})
export class SnippetComponent implements OnInit {
  @Input() snippet: { id: ID; inputs: any[]; source: string };

  constructor() {}

  ngOnInit(): void {}
}
