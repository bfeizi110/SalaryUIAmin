import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghWitnessFilesComponent } from './hghwitnessfiles.component';

describe('ListNoComponent', () => {
  let component: HghWitnessFilesComponent;
  let fixture: ComponentFixture<HghWitnessFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghWitnessFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghWitnessFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
