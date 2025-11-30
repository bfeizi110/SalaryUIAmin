import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMPropertyComponent } from './entitym-property.component';

describe('EntityMPropertyComponent', () => {
  let component: EntityMPropertyComponent;
  let fixture: ComponentFixture<EntityMPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityMPropertyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
