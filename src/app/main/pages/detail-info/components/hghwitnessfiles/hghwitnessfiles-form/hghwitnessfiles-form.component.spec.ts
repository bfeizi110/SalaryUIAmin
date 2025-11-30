import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghWitnessFilesFormComponent } from './hghwitnessfiles-form.component';

describe('HghWitnessFilesFormComponent', () => {
  let component: HghWitnessFilesFormComponent;
  let fixture: ComponentFixture<HghWitnessFilesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghWitnessFilesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghWitnessFilesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
