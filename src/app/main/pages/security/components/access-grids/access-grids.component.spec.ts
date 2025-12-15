import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessGridsComponent } from './access-grids.component';

describe('GroupAccessComponent', () => {
  let component: AccessGridsComponent;
  let fixture: ComponentFixture<AccessGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessGridsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
