import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaminFileKarFormComponent } from './tamin-file-kar-form.component';

describe('TaminFileKarFormComponent', () => {
  let component: TaminFileKarFormComponent;
  let fixture: ComponentFixture<TaminFileKarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaminFileKarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaminFileKarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
