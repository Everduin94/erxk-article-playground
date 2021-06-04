import {ComponentFactoryResolver, Directive, Inject, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Snippet} from "../state/snippets";
import {getComponentByKey} from "../state/models/component-key-map";

@Directive({
  selector: '[appDynamicLoader]'
})
export class DynamicLoaderDirective implements OnInit, OnDestroy {

  @Input('appDynamicLoader') snippet: Snippet;
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(ViewContainerRef) viewContainer: ViewContainerRef) {
    this.viewContainerRef = viewContainer;
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(getComponentByKey(this.snippet.component));
    this.viewContainerRef.clear();
    return this.viewContainerRef.createComponent<any>(componentFactory);
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    if (this.viewContainerRef) this.viewContainerRef.clear();
  }

}
