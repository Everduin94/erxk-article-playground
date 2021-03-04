import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetInputsComponent } from './snippet-inputs.component';

describe('SnippetInputsComponent', () => {
  let component: SnippetInputsComponent;
  let fixture: ComponentFixture<SnippetInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
