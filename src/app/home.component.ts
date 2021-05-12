import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "./state/articles";

@Component({
  selector: "app-home",
  template: `
    <ng-container *ngIf="articles$ | async as articles">
      <ng-container *ngFor="let article of articles">
        <a [routerLink]="['/articles/', article.id]">
          <img [src]="article.imageUrl"/>
        </a>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: grid;
        width: 500px;
        padding: 10px;
      }

      img {
        border-radius: 14px;
        width: 500px !important;
        height: 250px !important;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {

  articles$ = this.as.selectAll$;

  constructor(private as: ArticlesService) {}

  ngOnInit(): void {
  
  }
}
