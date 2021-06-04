import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

/**
 * TODO: use markdown pipe.
 */
@Component({
  selector: "app-snippet-inputs",
  template: `
    <div>
      {{description}}
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetInputsComponent {
  @Input() description;
}
