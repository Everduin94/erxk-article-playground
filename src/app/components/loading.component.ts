import {ChangeDetectionStrategy, Component, ContentChild, Input} from '@angular/core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

export enum LOADING_STATUS {
  INIT = "init",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error"
}

@Component({
  selector: 'app-loading',
  template: `
    <span [ngSwitch]="status">
  <span *ngSwitchCase="loadingStatus.INIT">
    <ng-container *ngIf="init then init"></ng-container>
  </span>
  <span *ngSwitchCase="loadingStatus.PENDING">
    <ng-container *ngTemplateOutlet="pending || defaultPending"></ng-container>
    <ng-template #defaultPending>
      <fa-icon style="color: #8be9fd"
               [icon]="loadingIcon" [spin]="true" [size]="loaderSize"></fa-icon>
    </ng-template>
  </span>
  <span *ngSwitchCase="loadingStatus.SUCCESS">
    <ng-container *ngTemplateOutlet="success || defaultSuccess"></ng-container>
      <ng-template #defaultSuccess>
        <fa-icon [icon]="successIcon" style="color: mediumspringgreen"></fa-icon> Success!
      </ng-template>
  </span>
  <span *ngSwitchCase="loadingStatus.ERROR">
    <fa-icon [icon]="errorIcon" style="color: crimson;"></fa-icon>  
    <ng-container *ngTemplateOutlet="errors || defaultErrors; context: {cause: cause}"></ng-container>
    <ng-template #defaultErrors let-msg="msg">Error!</ng-template>
  </span>
</span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  @ContentChild('pending') pending;
  @ContentChild('success') success;
  @ContentChild('errors') errors;
  @ContentChild('init') init;
  @Input() status: LOADING_STATUS;
  @Input() loaderSize: string = "2x";
  readonly loadingIcon = faSpinner;
  readonly errorIcon = faExclamationTriangle;
  readonly successIcon = faCheck;
  readonly loadingStatus = LOADING_STATUS;
  cause = "temp"; // Meta - Used for Example

}
