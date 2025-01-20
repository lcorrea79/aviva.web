import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/data/models/product.model';

class MockNgbModal {
  open() {
    return {
      componentInstance: {},
      result: Promise.resolve(),
    };
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore;
  let modalService: NgbModal;
  let alertService: AlertService;

  const initialState = {
    product: {
      loading: false,
      error: null,
      list: [],
      selected: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [FormsModule, StoreModule.forRoot({})],
      providers: [
        provideMockStore({ initialState }),
        { provide: NgbModal, useClass: MockNgbModal },
        {
          provide: AlertService,
          useValue: {
            startLoadingMessage: jasmine.createSpy('startLoadingMessage'),
            stopLoadingMessage: jasmine.createSpy('stopLoadingMessage'),
            showToast: jasmine.createSpy('showToast'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    modalService = TestBed.inject(NgbModal);
    alertService = TestBed.inject(AlertService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize breadcrumb items on init', () => {
  //   component.ngOnInit();
  //   expect(component.breadCrumbItems).toEqual([
  //     { label: 'AVIVA', link: '/' },
  //     { label: 'Products', active: true },
  //   ]);
  // });

 
  it('should open modal when showModal is called', async () => {
    const spy = spyOn(modalService, 'open').and.callThrough();
    component.showModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should add a product to selectedProducts on onRowSelected', () => {
    const product: IProduct = { id: 1, name: 'Test Product', details: '', status: true, unitPrice: 10 };
    const event = { target: { checked: true } };
    component.onRowSelected(product, event);
    expect(component.selectedProducts).toContain(product);
  });

  it('should remove a product from selectedProducts on onRowSelected', () => {
    const product: IProduct = { id: 1, name: 'Test Product', details: '', status: true, unitPrice: 10 };
    component.selectedProducts = [product];
    const event = { target: { checked: false } };
    component.onRowSelected(product, event);
    expect(component.selectedProducts).not.toContain(product);
  });


  // it('should reset products when onSearchChanged is called with an empty value', () => {
  //   const spy = spyOn(component, 'loadProductData');
  //   component.onSearchChanged('');
  //   expect(spy).toHaveBeenCalled();
  // });
});
