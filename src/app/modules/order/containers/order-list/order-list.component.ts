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
import { Observable, Subject, filter, first, firstValueFrom, map, takeUntil } from 'rxjs';
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
import { IOrder, IOrderProvider } from 'src/app/data/models/order.model';
import { AlertService } from 'src/app/core/services/alert.service';
//----------------------------------------------------------------------------
// Imports Components
//----------------------------------------------------------------------------
import { OrderFormComponent } from '../../components/order-form/order-form.component';
import { cloneDeep } from 'lodash';
import { OrderStatusMap } from 'src/app/data/models/enums';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  //------------------------------------------------------------------------
  // Private Fields Section
  //------------------------------------------------------------------------
  private unsubscribe$ = new Subject<void>();
  //------------------------------------------------------------------------
  // Data table cell template
  //------------------------------------------------------------------------
  @ViewChild('cellTemplate', { static: true }) cellTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate: TemplateRef<any>;
  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate', { static: true }) controlDataTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  //------------------------------------------------------------------------
  // Public Fields Section
  //------------------------------------------------------------------------
  public breadCrumbItems!: Array<{}>;
  public columns: any[] = [];
  public selectionType = SelectionType.checkbox;
  public sortType = SortType.single;
  public loadingIndicator: boolean;
  public currentPage = 1;
  public pageSize = 10;
  public searchValue = '';
  public loading$: Observable<boolean> = this.store.select(selector.selectOrderLoading);
  public error$: Observable<string | null> = this.store.select(selector.selectOrderError);
  public rows$ = this.store.select(selector.selectOrderList);
  public order$: Observable<IOrderProvider> = this.store.select(selector.selectSelectedOrder);
  public rows = [];
  public selectedOrder: IOrderProvider;
  public orderStatusMap = OrderStatusMap;
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private alertService: AlertService
  ) { }
  //------------------------------------------------------------------------
  // Component Lifecycle Eventhandler Methods Section
  //------------------------------------------------------------------------
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'AVIVA', link: '/orders' },
      { label: 'Orders', active: true },
    ];

    this.initColumns();

    this.loadOrderData();

    this.rows$.pipe(takeUntil(this.unsubscribe$)).subscribe();
    
    this.order$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (order: IOrderProvider) => {
        if (order) {
          this.selectedOrder = order;
        }
      },
    });

    this.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe((loading: boolean) => {
      if (loading) {
        this.alertService.startLoadingMessage('Loading Orders...');
      } else {
        this.alertService.stopLoadingMessage();
      }
    }); 

  }
  //------------------------------------------------------------------------
  initColumns() {
    this.columns = [
      { width: 210, prop: 'orderId', name: 'Order ID', cellTemplate: this.cellTemplate },
      { width: 150, prop: 'method', name: 'Method', cellTemplate: this.cellTemplate },
      { width: 150, prop: 'status', name: 'Status', cellTemplate: this.statusTemplate },
      { width: 150, prop: 'amount', name: 'Amount', cellTemplate: this.numberTemplate },
     // { width: 150, prop: 'controlData', name: 'API PAGO', cellTemplate: this.controlDataTemplate },
      { width: 100, name: 'Actions', cellTemplate: this.actionTemplate },
    ];
  }
  //------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  //------------------------------------------------------------------------
  newOrder() {
    //this.showModal();
  }
  //------------------------------------------------------------------------
  enumToArray(enumObj: object): Array<any> {
    return Object.keys(enumObj).map((key) => ({ value: enumObj[key], label: key }));
  }
  //------------------------------------------------------------------------
  loadOrderData() {
    this.store.dispatch(actions.orderActions.loadOrders());
    
  }
  
  //------------------------------------------------------------------------
  async cancelOrder(order: IOrder) {
    this.alertService.confirmAlert('Are you sure?', 'This action is irreversible.', 'Confirm', 'Cancel').then((result) => {
      if (result.isConfirmed) {
            this.store.dispatch(actions.orderActions.cancelOrder({id: order.orderId}));
      }
    });
  }
  //------------------------------------------------------------------------
  async payOrder(order: IOrder) {
    this.alertService.confirmAlert('Are you sure?', 'This action is irreversible.', 'Confirm', 'Cancel').then((result) => {
      if (result.isConfirmed) {
            // The user confirmed the action, you can proceed with the delete.
            this.store.dispatch(actions.orderActions.payOrder({id: order.orderId}));
      }
    });
  }
  //------------------------------------------------------------------------
  async viewOrder(order: IOrder) {    
    // Despacha la acción para cargar la orden seleccionada
  this.store.dispatch(actions.orderActions.loadOrder({ id: order.orderId }));

  // Espera a que el selector de la orden emitida coincida con la orden seleccionada
  const selectedOrder = await firstValueFrom(
    this.order$.pipe(
      filter((o) => o?.orderId === order.orderId) // Solo procede cuando la orden coincide
    )
  );

  if (selectedOrder) {
    await this.showModal(selectedOrder); // Pasa la orden seleccionada al modal
  } else {
    console.error('No se pudo cargar la orden seleccionada');
  }
  }
  //------------------------------------------------------------------------
  async showModal(order: IOrderProvider) {
    const modalRef = this.modalService.open(OrderFormComponent, {
      size: 'lg',
      backdrop: true,
      centered: true,
      beforeDismiss: () => true
    });

    const componentInstance = modalRef.componentInstance as OrderFormComponent;

    componentInstance.title = 'Order Information';
    componentInstance.order = order;//await firstValueFrom(this.order$);  
  }
  //------------------------------------------------------------------------
  // selectOrder(selectedOrder: IOrder) {
  //   this.store.dispatch(actions.orderActions.loadOrder({ id: selectedOrder.orderId }));
  //   this.store
  //     .select(selector.selectSelectedOrder)
  //     .pipe(
  //       filter((order) => order.orderId == selectedOrder.orderId),
  //       first(),
  //     );

  // }
  
}
