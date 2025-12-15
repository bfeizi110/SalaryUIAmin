import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusHistoryComponent } from './change-status-history.component';

describe('ChangeStatusHistoryComponent', () => {
  let component: ChangeStatusHistoryComponent;
  let fixture: ComponentFixture<ChangeStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStatusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
