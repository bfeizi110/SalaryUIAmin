import { TestBed } from '@angular/core/testing';

import { GridFormService } from './grid-form.service';

describe('GridFormService', () => {
  let service: GridFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
