import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewOrderFormComponent } from './new-order-form.component';
import { PaymentMode } from 'src/app/data/models/enums';
import { IProduct } from 'src/app/data/models/product.model';

describe('NewOrderFormComponent', () => {
  let component: NewOrderFormComponent;
  let fixture: ComponentFixture<NewOrderFormComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewOrderFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderFormComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);

    // Mock inputs
    component.title = 'New Order';
    component.products = [
      { id: 1, name: 'Product 1', unitPrice: 10 } as IProduct,
      { id: 2, name: 'Product 2', unitPrice: 20 } as IProduct,
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize paymentModes and set default selectedPaymentMode', () => {
    expect(component.paymentModes.length).toBe(Object.keys(PaymentMode).filter(key => isNaN(Number(key))).length);
    expect(component.selectedPaymentMode).toBe(component.paymentModes[0]?.key);
  });

  it('should call activeModal.close with order data on createOrder', () => {
    const spyClose = spyOn(activeModal, 'close');
    component.createOrder();

    expect(spyClose).toHaveBeenCalledWith({
      method: component.selectedPaymentMode,
      products: component.products.map(product => ({
        name: product.name,
        UnitPrice: product.unitPrice,
      })),
    });
  });

  it('should set submit to true when createOrder is called', () => {
    component.createOrder();
    expect(component.submit).toBeTrue();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('New Order');
  });

  it('should render the correct number of payment modes', () => {
    const compiled = fixture.nativeElement;
    const radioButtons = compiled.querySelectorAll('input[type="radio"]');
    expect(radioButtons.length).toBe(component.paymentModes.length);
  });

  // it('should update selectedPaymentMode when a radio button is clicked', () => {
  //   const compiled = fixture.nativeElement;
  //   const radioButtons = compiled.querySelectorAll('input[type="radio"]');

  //   // Simulate clicking the second radio button
  //   radioButtons[1].click();
  //   fixture.detectChanges();

  //   expect(component.selectedPaymentMode).toBe(component.paymentModes[1]?.key);
  // });
});
