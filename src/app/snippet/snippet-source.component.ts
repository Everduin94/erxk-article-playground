import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-snippet-source",
  template: `
    <div class="source" [innerHTML]="prefix + source + postfix | htmlPipe"></div>
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
})
export class SnippetSourceComponent implements OnInit {
  
  @Input() source;
  prefix = '```typescript\n';
  postfix = '\n```';

  constructor() {}

  ngOnInit(): void {
  }


}
