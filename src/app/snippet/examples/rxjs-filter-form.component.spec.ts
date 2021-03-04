import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsFilterFormComponent } from './rxjs-filter-form.component';

describe('RxjsFilterFormComponent', () => {
  let component: RxjsFilterFormComponent;
  let fixture: ComponentFixture<RxjsFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
