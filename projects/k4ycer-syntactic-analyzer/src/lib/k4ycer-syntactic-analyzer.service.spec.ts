import { TestBed } from '@angular/core/testing';

import { K4ycerSyntacticAnalyzerService } from './k4ycer-syntactic-analyzer.service';

describe('K4ycerSyntacticAnalyzerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: K4ycerSyntacticAnalyzerService = TestBed.get(K4ycerSyntacticAnalyzerService);
    expect(service).toBeTruthy();
  });
});
