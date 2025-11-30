import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostamarComponent } from './mostamar.component';

describe('MostamarComponent', () => {
  let component: MostamarComponent;
  let fixture: ComponentFixture<MostamarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostamarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
