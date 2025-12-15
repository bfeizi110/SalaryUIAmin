import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackPayInsureFormComponent } from './backpay-insure-form.component';


describe('BackpayDetailFormComponent', () => {
  let component: BackPayInsureFormComponent;
  let fixture: ComponentFixture<BackPayInsureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackPayInsureFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPayInsureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
