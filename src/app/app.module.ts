import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDatabaseService } from "./services/tests/in-memory-database.service";
import { environment } from "../environments/environment";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./interceptors";
import { HotToastModule, HotToastService } from "@ngneat/hot-toast";
import { TippyModule } from "@ngneat/helipopper";
import { HotkeysModule } from "@ngneat/hotkeys";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CopyToClipboardModule,
  COPY_TO_CLIPBOARD_HANDLER,
} from "@ngneat/copy-to-clipboard";
import copy from "copy-to-clipboard";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from "@angular/material/input";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";

const firebaseConfig = {
  apiKey: "AIzaSyDtPopNaDI1KRwq1mrM1Ya_VOgndq3HsQ0",
  authDomain: "erxk-article-playground.firebaseapp.com",
  projectId: "erxk-article-playground",
  storageBucket: "erxk-article-playground.appspot.com",
  messagingSenderId: "772954248415",
  appId: "1:772954248415:web:f17997769b3987140e456a",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabaseService, {
      delay: 0,
      passThruUnknownUrl: true,
    }), // Always on!
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    HotToastModule.forRoot(),
    TippyModule.forRoot(),
    HotkeysModule,
    BrowserAnimationsModule,
    CopyToClipboardModule,
    MatSidenavModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [FontAwesomeModule, MatSidenavModule, MatInputModule],
  providers: [
    httpInterceptorProviders,
    {
      provide: COPY_TO_CLIPBOARD_HANDLER,
      useFactory(toaster: HotToastService) {
        return function (text) {
          toaster.success("Copied..");
          copy(text);
        };
      },
      deps: [HotToastService],
    },
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: {
        baseUrl: "/",
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
