import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSettingNewComponent } from './hghlist-file-settingnew.component';

describe('HghlistFileSettingComponent', () => {
  let component: HghlistFileSettingNewComponent;
  let fixture: ComponentFixture<HghlistFileSettingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSettingNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSettingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
