import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet-example',
  template: `
    <div class="standard-padding">
      <ng-content></ng-content>
    </div>
  `,
  host: {class: "inner-block",},
  styles: []
})
export class SnippetExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
