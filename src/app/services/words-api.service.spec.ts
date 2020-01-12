import { TestBed } from '@angular/core/testing';

import { WordsApiService } from './words-api.service';

describe('WordsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordsApiService = TestBed.get(WordsApiService);
    expect(service).toBeTruthy();
  });
});
