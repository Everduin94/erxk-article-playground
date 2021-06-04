import {Component, OnInit} from "@angular/core";
import {ArticlesQuery} from "../../state/articles";
import {Router} from "@angular/router";
import {Snippet, SnippetsQuery, SnippetsService} from "../../state/snippets";
import {Observable} from "rxjs";
import {WorkOrdersService} from "../../state/workorders";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: "app-snippet-container",
  template: `    
    <mat-tab-group>
      <ng-container *ngIf="snippets$ | async as snippets">
        <ng-container *ngFor="let snippet of snippets">
          <mat-tab [label]="snippet.label">
            <ng-template matTabContent>
              <div class="glass-bg fill-block router-container">
                <app-snippet [snippet]="snippet">
                  <ng-template #example>
                    <ng-template [appDynamicLoader]="snippet"></ng-template>
                  </ng-template>
                </app-snippet>
              </div>
            </ng-template>
          </mat-tab>
        </ng-container>
      </ng-container>  
    </mat-tab-group>
  `,
  styles: [`    
  `],
})
export class SnippetContainer implements OnInit {

  snippets$: Observable<Snippet[]>;

  constructor(public wos: WorkOrdersService,
              private aq: ArticlesQuery,
              private router: Router,
              private sq: SnippetsQuery,
              private ss: SnippetsService) {}

  ngOnInit(): void {
    this.ss.get().subscribe();
    const endPoint = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.snippets$ = this.sq.selectByEndPoint(endPoint);
  }

}
