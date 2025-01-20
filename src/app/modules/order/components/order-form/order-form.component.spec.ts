import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrderProvider } from 'src/app/data/models/order.model';
import { By } from '@angular/platform-browser';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderFormComponent],
      providers: [NgbActiveModal]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const testTitle = 'Test Order Form';
    component.title = testTitle;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.modal-title')).nativeElement;
    expect(titleElement.textContent).toContain(testTitle);
  });

  // it('should log the order on ngOnInit', () => {
  //   const consoleSpy = spyOn(console, 'log');
  //   const mockOrder: IOrderProvider = {
  //     orderId: '123',
  //     amount: 100,
  //     status: 'Pending',
  //     method: 'Card',
  //     controlData: {
  //       apipago: 'Test API',
  //       createdDate: '2025-01-01T00:00:00Z'
  //     },
  //     fees: [],
  //     products: []
  //   };
  //   component.order = mockOrder;

  //   component.ngOnInit();

  //   expect(consoleSpy).toHaveBeenCalledWith('Order para mostrar: ', mockOrder);
  // });

  it('should close the modal on dismiss', () => {
    const activeModalSpy = spyOn(component.activeModal, 'dismiss');

    component.activeModal.dismiss();

    expect(activeModalSpy).toHaveBeenCalled();
  });

  it('should have default values for @Input properties', () => {
    expect(component.title).toBeUndefined();
    expect(component.loading).toBeFalse();
    expect(component.order).toEqual({} as IOrderProvider);
  });
});
