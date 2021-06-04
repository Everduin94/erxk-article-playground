import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticlesComponent } from "./articles.component";
import { Routes, RouterModule } from "@angular/router";
import { SnippetInputsComponent } from "./snippet/share/snippet-inputs.component";
import { SnippetSourceComponent } from "./snippet/share/snippet-source.component";
import { SnippetComponent } from "./snippet/share/snippet.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./home.component";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import { HtmlPipe } from "./pipes/html.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import {MatTabsModule} from '@angular/material/tabs';
import { SnippetContainer } from "./snippet/share/snippet-container.component";
import {MatButtonModule} from '@angular/material/button';
import { RxjsFilterFormComponent } from './snippet/examples/rxjs-filter-form.component';
import {LoadingComponent} from "./components/loading.component";
import {GistComponent} from "./components/gist.component";
import {DynamicLoaderDirective} from "./components/dynamic-loader.directive";
import {FillerExampleComponent} from "./components/filler-example.component";
import {NestedFiltersComponent} from "./snippet/examples/nested-filters.component";
import {LoadingExComponent} from "./snippet/examples/loading-ex.component";
import {
  BasicLoadingComponent,
  NgContentExComponent,
  SuccessComponent
} from "./snippet/examples/ng-content-ex.component";

const ARTICLE_ROUTES: Routes = [
  {
    path: "",
    component: ArticlesComponent,
    children: [
      {
        path: "rxjsfilter",
        component: SnippetContainer,
      },
      {
        path: "formTips",
        component: SnippetContainer,
      },
      {
        path: "ngTemplate",
        component: SnippetContainer,
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
    FillerExampleComponent,
    NestedFiltersComponent,
    LoadingExComponent,
    NgContentExComponent,
    BasicLoadingComponent,
    SuccessComponent,
    SnippetComponent,
    SnippetInputsComponent,
    SnippetSourceComponent,
    HomeComponent,
    SnippetContainer,
    RxjsFilterFormComponent,
    LoadingComponent,
    GistComponent,
    DynamicLoaderDirective,
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
