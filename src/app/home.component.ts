import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <img src="https://miro.medium.com/max/698/1*7_3EC83dXn8gOrzdVCsoDw.png"/>
  `,
  styles: [`
    :host {
      display: grid;
      justify-items: center;
    }

    img {
      border-radius: 14px;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
