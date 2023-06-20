import { TestBed } from '@angular/core/testing';

import { CharacteresDataService } from './characteres-data.service';

describe('CharacteresDataService', () => {
  let service: CharacteresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacteresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
