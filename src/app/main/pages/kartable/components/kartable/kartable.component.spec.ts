import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartableComponent } from './kartable.component';

describe('KartableComponent', () => {
  let component: KartableComponent;
  let fixture: ComponentFixture<KartableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KartableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KartableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
