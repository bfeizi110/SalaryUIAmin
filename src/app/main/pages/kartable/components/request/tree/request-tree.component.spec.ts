import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreeComponent } from './request-tree.component';

describe('PersonHghWitnessRequestFormComponent', () => {
  let component: RequestTreeComponent;
  let fixture: ComponentFixture<RequestTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestTreeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
