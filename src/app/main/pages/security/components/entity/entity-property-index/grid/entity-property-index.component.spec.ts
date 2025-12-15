import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPropertyIndexComponent } from './entity-property-index.component';

describe('EntityPropertyIndexComponent', () => {
  let component: EntityPropertyIndexComponent;
  let fixture: ComponentFixture<EntityPropertyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityPropertyIndexComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPropertyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
