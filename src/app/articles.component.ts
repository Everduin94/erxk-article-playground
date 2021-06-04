import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Article, ArticlesService } from "./state/articles";

@Component({
  selector: "app-articles",
  template: `
     <mat-drawer-container class="fill-block glass">
      <mat-drawer
        mode="side"
        opened
        class="standard-padding clear-bg border-right"
      >
        
        <h4 [routerLink]="['/articles']" style="cursor: pointer;">Articles</h4>

        <ng-container *ngIf="articles$ | async as articles">
          <ng-container *ngFor="let article of articles">
            <a
              routerLinkActive="active-anchor"
              [routerLink]="['/articles', article.id]"
              ><fa-icon [icon]="article?.icon"></fa-icon> {{ article.name }}</a
            >
          </ng-container>
        </ng-container>
      </mat-drawer>
      <mat-drawer-content class="glass-border drawer">
        <div class="title-bar clear-bg">
          <ng-container *ngIf="activeArticle$ | async as activeArticle">
            <h3>{{activeArticle?.name}} - {{activeArticle?.description}}</h3>
          </ng-container>
        </div>
        
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container> 

  `,
  styles: [
    `
      fa-icon {
        margin-right: 4px;
      }

      .title-bar {
        padding: 16px;
        border-bottom: 1px solid var(--border-color);
      }

      .router-container {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      h3 {
        margin: 0;
      }

      .border-right {
        border-right: 1px solid var(--border-color);
      }
    `,
  ],
})
export class ArticlesComponent implements OnInit {
  
  articles$: Observable<Array<Article>>;
  activeArticle$: Observable<Article>;
  setActive$: Observable<void>;

  constructor(public as: ArticlesService) {}

  ngOnInit(): void {
    this.as.get().subscribe(); // completes
    this.articles$ = this.as.selectAll$;
    this.activeArticle$ = this.as.selectActive$;
    this.setActive$ = this.as.setActive$;
  }

}
