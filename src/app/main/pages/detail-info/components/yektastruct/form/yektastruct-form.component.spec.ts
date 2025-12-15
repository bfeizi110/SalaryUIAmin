import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YektaStructFormComponent } from './yektastruct-form.component';

describe('YektaStructFormComponent', () => {
  let component: YektaStructFormComponent;
  let fixture: ComponentFixture<YektaStructFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YektaStructFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YektaStructFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
