import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackPayInsureComponent } from './backpay-insure.component';


describe('BackPayInsureComponent', () => {
  let component: BackPayInsureComponent;
  let fixture: ComponentFixture<BackPayInsureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackPayInsureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPayInsureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
