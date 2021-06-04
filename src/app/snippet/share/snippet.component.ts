import {ChangeDetectionStrategy, Component, ContentChild, Input} from "@angular/core";
import {Snippet} from "../../state/snippets";

@Component({
  selector: "app-snippet",
  template: `
    <div class="example">
      <h3 class="block-title">Example</h3>
      <div class="inner-block">
        <ng-container *ngTemplateOutlet="example"></ng-container>
      </div>
    </div>

    <div class="source">
      <h3 class="block-title">Source</h3>
      <app-snippet-source [codeUrl]="snippet?.code"></app-snippet-source>
    </div>

    <div class="inputs">
      <h3 class="block-title">Description</h3>
      <app-snippet-inputs [description]="snippet?.description"></app-snippet-inputs>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: 20px;
        padding: 8px;
        grid-auto-rows: min-content;
        grid-auto-columns: 1fr;
        margin: 8px;
        margin-top: 0;  
        margin-bottom: 0;
        grid-template-areas:
          "e i i"
          "e s s"
          "e s s"
          "b b b";
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
      
      .block-title {
        color: #434343;
        font-size: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetComponent {

  @ContentChild('example') example;
  @Input() snippet: Snippet;

}
