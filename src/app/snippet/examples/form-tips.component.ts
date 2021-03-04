import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tips",
  template: `
    <app-snippet [snippet]="snippet">
    </app-snippet>
  `,
  styles: [],
})
export class FormTipsComponent implements OnInit {

  snippet = {
    source: ``,
  }

  constructor() {}

  ngOnInit(): void {}
}
