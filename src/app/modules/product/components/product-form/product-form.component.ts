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
import { IProduct } from 'src/app/data/models/product.model';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  //------------------------------------------------------------------------
  // @Input Attributes Section
  //------------------------------------------------------------------------
  @Input() title!: string;
  @Input() loading: boolean = false;
  @Input() states: any[] = [];
  @Input() product: IProduct = {} as IProduct;
  //------------------------------------------------------------------------
  // Public Properties Section
  //------------------------------------------------------------------------
  public productForm!: FormGroup;
  public submit!: boolean;
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
      private cdr: ChangeDetectorRef,
      private alertService: AlertService,
  ) {}

  //------------------------------------------------------------------------
  // Component Lifecycle Eventhandler Methods Section
  //------------------------------------------------------------------------
    ngOnInit(): void {
        this.createForm();
  }
  //------------------------------------------------------------------------
  // Public Methods Section
  //------------------------------------------------------------------------
  public onSubmit(): void {
    this.activeModal.close(this.productForm.value);
    this.submit = true;
  }
  //------------------------------------------------------------------------
  // Private Methods Section
  //------------------------------------------------------------------------
    public createForm(): void {    
        const group: any = {
           name: [this.product?.name ?? '', [Validators.required]],
           details: [this.product?.details ?? '', [Validators.required]],
          status: [this.product?.status ?? true],
          unitPrice: [this.product?.unitPrice ?? 0, Validators.required]       
    };

    if (this.product?.id) {
        group.id = [this.product?.id];
    }

        console.log("product value: ", this.product);
        this.productForm = this.fb.group(group);

    }
    //------------------------------------------------------------------------
    get form() {
        return this.productForm.controls;
    }
    
}
