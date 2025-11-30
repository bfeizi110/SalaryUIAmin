import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackpayDetailFormComponent } from './backpay-detail-form.component';


describe('BackpayDetailFormComponent', () => {
  let component: BackpayDetailFormComponent;
  let fixture: ComponentFixture<BackpayDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackpayDetailFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpayDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
