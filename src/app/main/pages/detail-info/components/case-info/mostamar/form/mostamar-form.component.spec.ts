import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostamarFormComponent } from './mostamar-form.component';

describe('MostamarFormComponent', () => {
  let component: MostamarFormComponent;
  let fixture: ComponentFixture<MostamarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostamarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostamarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
