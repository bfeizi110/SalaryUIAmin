import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoFormComponent } from './list-no-form.component';

describe('ListNoFormComponent', () => {
  let component: ListNoFormComponent;
  let fixture: ComponentFixture<ListNoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
