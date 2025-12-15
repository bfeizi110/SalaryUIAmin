import { Attribute, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Data, PRIMARY_OUTLET } from '@angular/router';

export interface RouterOutletContract {
  isActivated: boolean;
  component: Object | null;
  activatedRouteData: Data;
  activatedRoute: ActivatedRoute | null;
  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null): void;
  deactivate(): void;
  detach(): ComponentRef<unknown>;
  attach(ref: ComponentRef<unknown>, activatedRoute: ActivatedRoute): void;
}

@Directive({ selector: 'custom-router-outlet', exportAs: 'outlet' })
export class CustomRouterOutlet implements OnDestroy, OnInit, RouterOutletContract {
  private activated: ComponentRef<any> | null = null;
  private _activatedRoute: ActivatedRoute | null = null;
  private name: string;

  @Output('activate') activateEvents = new EventEmitter<any>();
  @Output('deactivate') deactivateEvents = new EventEmitter<any>();
  @Input() tabUrl: string;

  constructor(
    private parentContexts: ChildrenOutletContexts, private location: ViewContainerRef,
    private resolver: ComponentFactoryResolver, @Attribute('name') name: string,
    private changeDetector: ChangeDetectorRef) {
    this.name = name == undefined ? this.name : name;
  }

  ngOnDestroy(): void { this.parentContexts.onChildOutletDestroyed(this.name); }

  ngOnInit(): void {
    this.name = this.name == undefined ? PRIMARY_OUTLET : this.name.toString();
    let $this: any = this;
    this.parentContexts.onChildOutletCreated(this.name, $this);
    if (!this.activated) {
      const context = this.parentContexts.getContext(this.name);
      if (context && context.route) {
        if (context.attachRef) {
          this.attach(context.attachRef, context.route);
        } else {
          this.activateWith(context.route, context.resolver || null);
        }
      }
    }
  }

  get isActivated(): boolean {
    return !!this.activated;
  }

  get component(): Object {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this.activated.instance;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this._activatedRoute as ActivatedRoute;
  }

  get activatedRouteData(): Data {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }

  detach(): ComponentRef<any> {
    if (!this.activated) throw new Error('Outlet is not activated');
    this.location.detach();
    const cmp = this.activated;
    this.activated = null;
    this._activatedRoute = null;
    return cmp;
  }

  attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
    this.activated = ref;
    this._activatedRoute = activatedRoute;
    this.location.insert(ref.hostView);
  }

  deactivate(): void {
    if (this.activated) {
      const c = this.component;
      this.activated.destroy();
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }

  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
    let tabUrl = `${this.tabUrl}`
    if (!tabUrl.includes('report/report-design-view'))
      if (tabUrl && tabUrl != (activatedRoute as any)._futureSnapshot._routerState.url.replace('/', '')) return;

    this._activatedRoute = activatedRoute;
    const snapshot = (activatedRoute as any)._futureSnapshot;
    const component = <any>snapshot.routeConfig!.component;
    const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
    const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
    this.activated = this.location.createComponent(component, {
      index: this.location.length,
      injector: injector
    });
    this.changeDetector.markForCheck();
    this.activateEvents.emit(this.activated.instance);

  }
}

class OutletInjector implements Injector {
  constructor(
    private route: ActivatedRoute, private childContexts: ChildrenOutletContexts,
    private parent: Injector) { }

  get(token: any, notFoundValue?: any): any {
    if (token === ActivatedRoute) {
      return this.route;
    }

    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }

    return this.parent.get(token, notFoundValue);
  }
}

