import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaminBaseFormComponent } from './tamin-base-form.component';

describe('TaminBaseFormComponent', () => {
  let component: TaminBaseFormComponent;
  let fixture: ComponentFixture<TaminBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaminBaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaminBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
