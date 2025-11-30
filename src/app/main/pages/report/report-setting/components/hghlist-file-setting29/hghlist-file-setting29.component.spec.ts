import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSetting29Component } from './hghlist-file-setting29.component';

describe('HghlistFileSetting29Component', () => {
  let component: HghlistFileSetting29Component;
  let fixture: ComponentFixture<HghlistFileSetting29Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSetting29Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSetting29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
