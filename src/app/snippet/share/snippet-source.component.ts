import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: "app-snippet-source",
  template: `
    <div class="source">
      <app-gist [codeUrl]="codeUrl"></app-gist>
    </div>
  `,
  host: { class: "inner-block" },
  styles: [`
    :host {
      padding: 0;
    }

    .source {
      border-radius: 14px;
    }

  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetSourceComponent {
  
  @Input() codeUrl;


}
