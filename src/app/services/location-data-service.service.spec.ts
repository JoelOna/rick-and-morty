import { TestBed } from '@angular/core/testing';

import { LocationDataServiceService } from './location-data-service.service';

describe('LocationDataServiceService', () => {
  let service: LocationDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
