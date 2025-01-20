import { ChangeDetectorRef, Component, Input } from '@angular/core';
//----------------------------------------------------------------------------
// Imports Bootstrap
//----------------------------------------------------------------------------
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//----------------------------------------------------------------------------
// Imports Forms
//----------------------------------------------------------------------------
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//----------------------------------------------------------------------------
// Imports Models and Services
//----------------------------------------------------------------------------
import { IOrder, IOrderRequest } from 'src/app/data/models/order.model';
import { AlertService } from '../../../../core/services/alert.service';
import { IProduct } from 'src/app/data/models/product.model';
import { PaymentMode } from 'src/app/data/models/enums';
import { method } from 'lodash';

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.scss'],
})
export class NewOrderFormComponent {
  //------------------------------------------------------------------------
  // @Input Attributes Section
  //------------------------------------------------------------------------
  @Input() title!: string;
  @Input() loading: boolean = false;
  @Input() products: IProduct[] = [];
  //------------------------------------------------------------------------
  // Public Properties Section
  //------------------------------------------------------------------------
  public orderForm!: FormGroup;
  public submit!: boolean;
  // PaymentMode options (según el enum)
  paymentModes = Object.keys(PaymentMode)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ key: PaymentMode[key as keyof typeof PaymentMode], value: key }));

  selectedPaymentMode: PaymentMode;
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  //------------------------------------------------------------------------
  // Component Lifecycle Eventhandler Methods Section
  //------------------------------------------------------------------------
  ngOnInit(): void {
    this.selectedPaymentMode = this.paymentModes[0]?.key;
  }
  //------------------------------------------------------------------------
  // Public Methods Section
  //------------------------------------------------------------------------
  public createOrder(): void {
    var order = {
      method: this.selectedPaymentMode, products: this.products.map(product => ({
        name: product.name,
        UnitPrice: product.unitPrice
      }))
    };
    this.activeModal.close(order);
    this.submit = true;
  }
}
