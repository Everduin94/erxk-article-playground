import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsFilterContainerComponent } from './rxjs-filter-container.component';

describe('RxjsFilterContainerComponent', () => {
  let component: RxjsFilterContainerComponent;
  let fixture: ComponentFixture<RxjsFilterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsFilterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
