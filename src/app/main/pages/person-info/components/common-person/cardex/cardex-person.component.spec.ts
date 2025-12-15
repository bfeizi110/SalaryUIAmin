import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardexPersonComponent } from './cardex-person.component';

describe('CardexPersonComponent', () => {
  let component: CardexPersonComponent;
  let fixture: ComponentFixture<CardexPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardexPersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardexPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
