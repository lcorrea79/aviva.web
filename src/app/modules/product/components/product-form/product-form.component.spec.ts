import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './product-form.component';
import { AlertService } from '../../../../core/services/alert.service';
import { ChangeDetectorRef } from '@angular/core';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let activeModalSpy: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(async () => {
    const alertServiceMock = jasmine.createSpyObj('AlertService', ['startLoadingMessage', 'stopLoadingMessage', 'showToast']);
    const activeModalMock = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AlertService, useValue: alertServiceMock },
        { provide: NgbActiveModal, useValue: activeModalMock },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    activeModalSpy = TestBed.inject(NgbActiveModal) as jasmine.SpyObj<NgbActiveModal>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Test Product',
      details: 'Test Details',
      status: true,
      unitPrice: 100,
    };
    component.title = 'Edit Product';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with product data', () => {
    expect(component.productForm.value).toEqual({
      id: 1,
      name: 'Test Product',
      details: 'Test Details',
      status: true,
      unitPrice: 100,
    });
  });

  it('should mark the form as submitted and close the modal on submit', () => {
    component.onSubmit();
    expect(component.submit).toBeTrue();
    expect(activeModalSpy.close).toHaveBeenCalledWith(component.productForm.value);
  });

  it('should create the form with default values when no product is provided', () => {
    component.product = {} as any;
    component.createForm();
    expect(component.productForm.value).toEqual({
      name: '',
      details: '',
      status: true,
      unitPrice: 0,
    });
  });

  it('should expose form controls via the form getter', () => {
    expect(component.form.name.value).toBe('Test Product');
    expect(component.form.details.value).toBe('Test Details');
  });
});