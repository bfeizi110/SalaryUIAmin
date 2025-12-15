import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaminBaseComponent } from './tamin-base.component';

describe('TaminBaseComponent', () => {
  let component: TaminBaseComponent;
  let fixture: ComponentFixture<TaminBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaminBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaminBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
