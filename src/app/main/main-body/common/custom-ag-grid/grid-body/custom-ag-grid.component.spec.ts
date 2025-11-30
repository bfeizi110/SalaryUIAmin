import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAgGridComponent } from './custom-ag-grid.component';

describe('CustomAgGridComponent', () => {
  let component: CustomAgGridComponent;
  let fixture: ComponentFixture<CustomAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAgGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
