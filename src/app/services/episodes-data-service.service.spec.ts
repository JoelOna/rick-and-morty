import { TestBed } from '@angular/core/testing';

import { EpisodesDataServiceService } from './episodes-data-service.service';

describe('EpisodesDataServiceService', () => {
  let service: EpisodesDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodesDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
