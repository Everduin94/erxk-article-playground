import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetSourceComponent } from './snippet-source.component';

describe('SnippetSourceComponent', () => {
  let component: SnippetSourceComponent;
  let fixture: ComponentFixture<SnippetSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
