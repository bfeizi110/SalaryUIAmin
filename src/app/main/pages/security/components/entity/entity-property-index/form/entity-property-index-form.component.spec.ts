import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPropertyIndexFormComponent } from './entity-property-index-form.component';

describe('ImportSettingDetailFormComponent', () => {
  let component: EntityPropertyIndexFormComponent;
  let fixture: ComponentFixture<EntityPropertyIndexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityPropertyIndexFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPropertyIndexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
