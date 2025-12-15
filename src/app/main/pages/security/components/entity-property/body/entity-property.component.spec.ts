import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPropertyComponent } from './entity-property.component';

describe('EntityPropertyComponent', () => {
  let component: EntityPropertyComponent;
  let fixture: ComponentFixture<EntityPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
