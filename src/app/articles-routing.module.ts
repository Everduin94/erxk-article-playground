import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticlesComponent } from "./articles.component";
import { Routes, RouterModule } from "@angular/router";
import { SnippetExampleComponent } from "./snippet/snippet-example.component";
import { SnippetInputsComponent } from "./snippet/snippet-inputs.component";
import { SnippetSourceComponent } from "./snippet/snippet-source.component";
import { SnippetComponent } from "./snippet/snippet.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RxjsFilterComponent } from "./snippet/examples/rxjs-filter.component";
import { HomeComponent } from "./home.component";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import { HtmlPipe } from "./pipes/html.pipe";
import { FormTipsComponent } from "./snippet/examples/form-tips.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RxjsNestedFilterComponent } from "./snippet/examples/rxjs-nested-filter.component";
import {MatTabsModule} from '@angular/material/tabs';
import { RxjsFilterContainerComponent } from "./snippet/examples/rxjs-filter-container.component";
import {MatButtonModule} from '@angular/material/button';
import { RxjsFilterFormComponent } from './snippet/examples/rxjs-filter-form.component';

const ARTICLE_ROUTES: Routes = [
  {
    path: "",
    component: ArticlesComponent,
    children: [
      {
        path: "rxjsfilter",
        component: RxjsFilterContainerComponent,
      },
      {
        path: "formTips",
        component: FormTipsComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {path: '', redirectTo: '/articles/home', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  declarations: [
    ArticlesComponent,
    SnippetComponent,
    SnippetExampleComponent,
    SnippetInputsComponent,
    SnippetSourceComponent,
    RxjsFilterComponent,
    HomeComponent,
    FormTipsComponent,
    RxjsNestedFilterComponent,
    RxjsFilterContainerComponent,
    RxjsFilterFormComponent,
    HtmlPipe,
  ],
  exports: [MatSidenavModule, MatInputModule, MatTabsModule, MatButtonModule],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ARTICLE_ROUTES),
  ],
})
export class ArticlesRoutingModule {}
