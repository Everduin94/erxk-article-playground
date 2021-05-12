import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('./articles-routing.module').then(mod => mod.ArticlesRoutingModule),
    
  },
  {path: '', redirectTo: '/articles/home', pathMatch: 'full'},

  /*{path: '**', component: PageNotFoundComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
