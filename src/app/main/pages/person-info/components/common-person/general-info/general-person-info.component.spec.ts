import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPersonInfoComponent } from './general-person-info.component';

describe('GeneralInfoComponent', () => {
  let component: GeneralPersonInfoComponent;
  let fixture: ComponentFixture<GeneralPersonInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralPersonInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
