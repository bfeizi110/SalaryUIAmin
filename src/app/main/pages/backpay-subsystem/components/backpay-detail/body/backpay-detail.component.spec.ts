import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackpayDetailComponent } from './backpay-detail.component';


describe('SemiBackpayComponent', () => {
  let component: BackpayDetailComponent;
  let fixture: ComponentFixture<BackpayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackpayDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
