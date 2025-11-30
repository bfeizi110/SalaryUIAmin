import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPropertyFormComponent } from './entity-property-form.component';

describe('EntityPropertyFormComponent', () => {
  let component: EntityPropertyFormComponent;
  let fixture: ComponentFixture<EntityPropertyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityPropertyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
