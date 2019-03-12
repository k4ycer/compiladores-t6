import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K4ycerSyntacticAnalyzerComponent } from './k4ycer-syntactic-analyzer.component';

describe('K4ycerSyntacticAnalyzerComponent', () => {
  let component: K4ycerSyntacticAnalyzerComponent;
  let fixture: ComponentFixture<K4ycerSyntacticAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K4ycerSyntacticAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K4ycerSyntacticAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
