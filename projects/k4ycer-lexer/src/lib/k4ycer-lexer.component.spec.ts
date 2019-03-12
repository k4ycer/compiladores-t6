import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K4ycerLexerComponent } from './k4ycer-lexer.component';

describe('K4ycerLexerComponent', () => {
  let component: K4ycerLexerComponent;
  let fixture: ComponentFixture<K4ycerLexerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K4ycerLexerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K4ycerLexerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
