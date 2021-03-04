import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { combineLatest, of } from "rxjs";
import { delay, filter, tap } from "rxjs/operators";
import { ArticlesService } from "./state/articles";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  title = "angular-starter-project";

  constructor(private toast: HotToastService) {}
  
  ngOnInit(): void {
  }

  showToast() {
    of(100)
      .pipe(
        delay(3000),
        this.toast.observe({
          loading: "Saving...",
          success: "Settings saved!",
          error: "Could not save.",
        })
      )
      .subscribe();
  }
}
