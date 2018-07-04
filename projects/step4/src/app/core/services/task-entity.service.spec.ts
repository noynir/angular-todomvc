import { TestBed, inject } from '@angular/core/testing';

import { TaskEntityService } from './task-entity.service';

describe('TaskEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskEntityService]
    });
  });

  it('should be created', inject([TaskEntityService], (service: TaskEntityService) => {
    expect(service).toBeTruthy();
  }));
});
