import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsNestedFilterComponent } from './rxjs-nested-filter.component';

describe('RxjsNestedFilterComponent', () => {
  let component: RxjsNestedFilterComponent;
  let fixture: ComponentFixture<RxjsNestedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsNestedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsNestedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
