import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {timer} from "rxjs";
import {first} from "rxjs/operators";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";

@Component({
  selector: 'app-success-component',
  template: `
    <fa-icon [icon]="successIcon" style="color: mediumspringgreen"></fa-icon> Success!
  `,
  styles: []
})
export class SuccessComponent implements OnInit {

  readonly successIcon = faCheck;

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    timer(4000).pipe(first()).subscribe(timesUp => {
      this.host.nativeElement.remove();
    });
  }

}

@Component({
  selector: 'app-basic-loading-component',
  template: `
    <ng-container *ngIf="loading === true">
      <fa-icon style="color: #8be9fd" [icon]="loadingIcon" [spin]="true" size="2x"></fa-icon>
    </ng-container>

    <ng-container *ngIf="loading === false">
      <ng-content></ng-content>
    </ng-container>
    
  `,
  styles: []
})
export class BasicLoadingComponent implements OnInit {

  @Input() loading = true;
  @Input() loadTime = 2000; // Meta - Contrived for examples

  readonly loadingIcon = faSpinner;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, this.loadTime);
  }

}



@Component({
  selector: 'app-ng-content-ex',
  template: `
    <div>
      Never displays: 
      <app-basic-loading-component [loadTime]="4000">
        <app-success-component></app-success-component>
      </app-basic-loading-component>
    </div>
    
    <div>
      Destroyed too quickly:
      <app-basic-loading-component [loadTime]="2000">
        <app-success-component></app-success-component>
      </app-basic-loading-component>
    </div>
    

    <div>
      Never destroyed: 
      <app-basic-loading-component [loadTime]="4001">
        <app-success-component></app-success-component>
      </app-basic-loading-component>
    </div>
    
  `,
  styles: []
})
export class NgContentExComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
