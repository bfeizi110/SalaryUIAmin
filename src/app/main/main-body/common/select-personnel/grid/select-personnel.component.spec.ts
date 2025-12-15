import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonnelComponent } from './select-personnel.component';

describe('SelectPersonnelComponent', () => {
  let component: SelectPersonnelComponent;
  let fixture: ComponentFixture<SelectPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
