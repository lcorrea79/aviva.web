import { Component, Input } from '@angular/core';
//----------------------------------------------------------------------------
// Imports Bootstrap
//----------------------------------------------------------------------------
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//----------------------------------------------------------------------------
// Imports Models and Services
//----------------------------------------------------------------------------
import { IOrderProvider } from 'src/app/data/models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  //------------------------------------------------------------------------
  // @Input Attributes Section
  //------------------------------------------------------------------------
  @Input() title!: string;
  @Input() loading: boolean = false;
  @Input() order: IOrderProvider = {} as IOrderProvider;
  
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    public activeModal: NgbActiveModal
    
  ) {}

  //------------------------------------------------------------------------
  // Component Lifecycle Eventhandler Methods Section
  //------------------------------------------------------------------------
    ngOnInit(): void {
        console.log("Order para mostrar: ", this.order);
  }
   
    
}
