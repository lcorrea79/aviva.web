import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
//----------------------------------------------------------------------------
// Imports Data Table
//----------------------------------------------------------------------------
import { SelectionType, SortType } from '@swimlane/ngx-datatable';
//----------------------------------------------------------------------------
// Imports Bootstrap
//----------------------------------------------------------------------------
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//----------------------------------------------------------------------------
// Imports Section (Observable)
//----------------------------------------------------------------------------
import { Observable, Subject, filter, first, map, takeUntil } from 'rxjs';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as selector from '../../../../store/selectors';
import * as actions from '../../../../store/actions';
//----------------------------------------------------------------------------
// Imports Models and Services
//----------------------------------------------------------------------------
import { IProduct } from 'src/app/data/models/product.model';
import { AlertService } from 'src/app/core/services/alert.service';
//----------------------------------------------------------------------------
// Imports Components
//----------------------------------------------------------------------------
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { NewOrderFormComponent } from 'src/app/modules/order/components/new-order-form/new-order-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  //------------------------------------------------------------------------
  // Private Fields Section
  //------------------------------------------------------------------------
  private unsubscribe$ = new Subject<void>();
  //------------------------------------------------------------------------
  // Data table cell template
  //------------------------------------------------------------------------
  
  @ViewChild('checkboxTemplate', { static: true }) checkboxTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate', { static: true }) cellTemplate: TemplateRef<any>;
  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  //------------------------------------------------------------------------
  // Public Fields Section
  //------------------------------------------------------------------------
  public breadCrumbItems!: Array<{}>;
  public columns: any[] = [];
  public selectionType = SelectionType.checkbox;
  public sortType = SortType.single;
  public loadingIndicator: boolean;
  public searchValue = '';
  public loading$: Observable<boolean> = this.store.select(selector.selectProductLoading);
  public error$: Observable<string | null> = this.store.select(selector.selectProductError);
  public rows$ = this.store.select(selector.selectProductList);
  public rows: IProduct[];
  public product$: Observable<IProduct> = this.store.select(selector.selectSelectedProduct);
  public selectedProduct: IProduct;
  public selectedProducts: IProduct[] = [];
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router
  ) { }
  //------------------------------------------------------------------------
  // Component Lifecycle Eventhandler Methods Section
  //------------------------------------------------------------------------
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'AVIVA', link: '/orders' },
      { label: 'Products', active: true },
    ];

    this.initColumns();

    this.loadProductData();

    this.rows$.pipe(takeUntil(this.unsubscribe$)).subscribe();
  
    this.product$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (product: IProduct) => {
        if (product) {
          this.selectedProduct = product;
        }
      },
    });

    this.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe((loading: boolean) => {
      if (loading) {
        this.alertService.startLoadingMessage('Loading Products...');
      } else {
        this.alertService.stopLoadingMessage();
      }
    });
  }
  //------------------------------------------------------------------------
  initColumns() {
    this.columns = [
      { width: 10, name: '', cellTemplate: this.checkboxTemplate }, 
      { width: 210, prop: 'name', name: 'Product', cellTemplate: this.cellTemplate },
      { width: 350, prop: 'details', name: 'Details', cellTemplate: this.cellTemplate },     
      { width: 150, prop: 'unitPrice', name: 'Unit Price', cellTemplate: this.numberTemplate },
      { width: 100, prop: 'status', name: 'Status', cellTemplate: this.statusTemplate },
      { width: 50, name: 'Actions', cellTemplate: this.actionTemplate },
    ];
  }
  //------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  //------------------------------------------------------------------------
  onSearchChanged(value: string) {
    this.searchValue = value;
    if (value.length > 3) {
      this.loadProductByName(value);
    }
    if (value.length == 0) {
      this.loadProductData();
    }
  }
  //------------------------------------------------------------------------
  newProduct() {
    this.showModal();
  }

  //------------------------------------------------------------------------
  newOrder() {
    this.showModalNewOrder(this.selectedProducts);
  }
  //---------------------------------------------------------------------
  enumToArray(enumObj: object): Array<any> {
    return Object.keys(enumObj).map((key) => ({ value: enumObj[key], label: key }));
  }
  //------------------------------------------------------------------------
  loadProductData() {
    this.store.dispatch(actions.productActions.loadProducts());
  }
  //------------------------------------------------------------------------
  loadProductByName(value: string) {
    this.store.dispatch(actions.productActions.loadProductsByName({ name: value}));
  }
  //---------------------------------------------------------------------------
  updateProductStatus(product: IProduct) {
    var _product = Object.assign({}, product);
    _product.status = !product.status;
      this.store.dispatch(actions.productActions.updateProduct({ product: _product }));
  }
 
  //------------------------------------------------------------------------
  async updateProduct(product: IProduct) {
    this.showModal(product);
  }
  //------------------------------------------------------------------------
  showModal(product?: IProduct) {
    const modalRef = this.modalService.open(ProductFormComponent, {
      size: 'lg',
      backdrop: true,
      centered: true,
      beforeDismiss: () =>
        componentInstance?.productForm?.dirty
          ? this.alertService
            .confirmAlert(
              'Are you sure you want to close this modal?',
              'Unsaved changes will be lost!',
              'Yes, close it',
              'No, keep it open',
            )
            .then((result) => {
              return result.isConfirmed;
            })
          : true,
    });

    const componentInstance = modalRef.componentInstance as ProductFormComponent;

    componentInstance.title = product ? 'Edit Product' : 'New Product';
    componentInstance.product = product;

    modalRef.result
      .then((result) => {
        if (result) {
          const action = result.id ? actions.productActions.updateProduct({ product: result }) 
                                   : actions.productActions.createProduct({ product: result});

          this.store.dispatch(action);
        }
      })
      .catch((error) => {
        if (error) {
          this.alertService.showToast('error', 'An error occurred. Check the console for more details.', error);
        }
      });
  }
  //------------------------------------------------------------------------
  showModalNewOrder(products?: IProduct[]) {
    const modalRef = this.modalService.open(NewOrderFormComponent, {
      size: 'lg',
      backdrop: true,
      centered: true,
      beforeDismiss: () => true        
    });

    const componentInstance = modalRef.componentInstance as NewOrderFormComponent;

    componentInstance.title = 'Crear Orden';
    componentInstance.products = products;

    modalRef.result
      .then((result) => {
        if (result) {
          console.log("Ordern creada:", result)
          const action = actions.orderActions.createOrder({order: result});
          this.store.dispatch(action);
          this.router.navigate(["/orders"]);
        }
      })
      .catch((error) => {
        if (error) {
          this.alertService.showToast('error', 'An error occurred. Check the console for more details.', error);
        }
      });
  }
  //------------------------------------------------------------------------
  selectProduct(selectedProduct: IProduct) {
    this.store.dispatch(actions.productActions.loadProduct({ id: selectedProduct.id }));
    this.store
      .select(selector.selectSelectedProduct)
      .pipe(
        filter((product) => product.id == selectedProduct.id),
        first(),
      );

  }

  onRowSelected(row: any, $event:any): void {
    if ($event.target.checked)
      this.selectedProducts.push(row)
    else this.selectedProducts = this.selectedProducts.filter(product => product.id !== row.id);
  }
}
