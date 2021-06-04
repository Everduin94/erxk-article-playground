import {Type} from "@angular/core";
import {NestedFiltersComponent} from "../../snippet/examples/nested-filters.component";
import {RxjsFilterFormComponent} from "../../snippet/examples/rxjs-filter-form.component";
import {LoadingExComponent} from "../../snippet/examples/loading-ex.component";
import {FillerExampleComponent} from "../../components/filler-example.component";
import {NgContentExComponent} from "../../snippet/examples/ng-content-ex.component";

export type ErxkComponentKeyMap = {
  rxjsFilter: Type<any>,
  rxjsFilterNested: Type<any>,
  fillerExampleComponent: Type<any>,
  loadingExample: Type<any>,
  ngContentExample: Type<any>,
};

export const ComponentKeyMap: ErxkComponentKeyMap = {
  rxjsFilter: RxjsFilterFormComponent,
  rxjsFilterNested: NestedFiltersComponent,
  loadingExample: LoadingExComponent,
  fillerExampleComponent: FillerExampleComponent,
  ngContentExample: NgContentExComponent,
};

export type ModelKeys<T> = Record<keyof T, keyof T>;
export const ComponentKeys: ModelKeys<ErxkComponentKeyMap> = {
  rxjsFilter: 'rxjsFilter',
  rxjsFilterNested: 'rxjsFilterNested',
  fillerExampleComponent: 'fillerExampleComponent',
  loadingExample: 'loadingExample',
  ngContentExample: 'ngContentExample',
};


export function getComponentByKey(key: string) {
  return ComponentKeyMap[key];
}


