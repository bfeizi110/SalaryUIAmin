import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaminFileComponent } from './tamin-file.component';

describe('TaminFileComponent', () => {
  let component: TaminFileComponent;
  let fixture: ComponentFixture<TaminFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaminFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaminFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
