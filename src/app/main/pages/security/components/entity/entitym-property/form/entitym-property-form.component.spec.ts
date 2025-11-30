import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMPropertyFormComponent } from './entitym-property-form.component';

describe('ImportSettingDetailFormComponent', () => {
  let component: EntityMPropertyFormComponent;
  let fixture: ComponentFixture<EntityMPropertyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityMPropertyFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
