import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRendererComponent } from './header-renderer.component';

describe('HeaderComponent', () => {
  let component: HeaderRendererComponent;
  let fixture: ComponentFixture<HeaderRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRendererComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
