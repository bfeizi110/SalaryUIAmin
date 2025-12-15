import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoComponent } from './list-no.component';

describe('ListNoComponent', () => {
  let component: ListNoComponent;
  let fixture: ComponentFixture<ListNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
