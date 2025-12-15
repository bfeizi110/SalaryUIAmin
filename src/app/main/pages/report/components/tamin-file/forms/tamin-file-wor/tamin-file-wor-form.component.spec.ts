import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaminFileWorFormComponent } from './tamin-file-wor-form.component';

describe('TaminFileWorFormComponent', () => {
  let component: TaminFileWorFormComponent;
  let fixture: ComponentFixture<TaminFileWorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaminFileWorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaminFileWorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
