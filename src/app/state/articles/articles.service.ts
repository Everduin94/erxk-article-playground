import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { ArticlesQuery } from './articles.query';
import { ArticlesStore, ArticlesState } from './articles.store';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends NgEntityService<ArticlesState> {

  selectAll$ = this.query.selectAll();
  selectActive$ = this.query.selectActive();      
  setActive$ = combineLatest([this.selectAll$, this.router.events]).pipe(
    filter(([all, event]) => event instanceof NavigationEnd),
    map(([all, nav]: [any, NavigationEnd]) => this.setActiveArticleFromUrl(nav.urlAfterRedirects)),
  )

  constructor(protected store: ArticlesStore, protected query: ArticlesQuery, private router: Router) {
    super(store);
    this.setActive$.subscribe(); // Live for app life
  }

  /**
   * This breaks if we add children to the Article Child Routes.
   */
  public setActiveArticleFromUrl (url): void {
    if (!url) return;
    const segments = url.split('/');
    const id = segments.pop() || segments.pop();
    if (this.query.hasEntity(id)) this.store.setActive(id);
    else this.store.setActive(null);
  }

}
