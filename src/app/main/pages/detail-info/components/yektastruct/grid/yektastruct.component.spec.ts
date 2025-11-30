import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YektaStructComponent } from './yektastruct.component';

describe('YektaStructComponent', () => {
  let component: YektaStructComponent;
  let fixture: ComponentFixture<YektaStructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YektaStructComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YektaStructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
