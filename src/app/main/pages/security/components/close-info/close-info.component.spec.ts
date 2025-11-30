import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseInfoComponent } from './close-info.component';

describe('CloseInfoComponent', () => {
  let component: CloseInfoComponent;
  let fixture: ComponentFixture<CloseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
