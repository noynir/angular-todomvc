import { TestBed, inject } from '@angular/core/testing';

import { TaskdbService } from './taskdb.service';

describe('TaskdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskdbService]
    });
  });

  it('should be created', inject([TaskdbService], (service: TaskdbService) => {
    expect(service).toBeTruthy();
  }));
});
