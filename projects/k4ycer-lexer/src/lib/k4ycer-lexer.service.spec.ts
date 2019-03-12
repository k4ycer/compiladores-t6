import { TestBed } from '@angular/core/testing';

import { K4ycerLexerService } from './k4ycer-lexer.service';

describe('K4ycerLexerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: K4ycerLexerService = TestBed.get(K4ycerLexerService);
    expect(service).toBeTruthy();
  });
});
