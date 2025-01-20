// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { OrderService } from './order.service';
// import { ApiService } from './api.service';
// import { ConfigurationService } from '../../core/services/configuration.service';
// import { IOrderRequest } from '../models/order.model';

// describe('OrderService', () => {
//   let service: OrderService;
//   let httpMock: HttpTestingController;
//   let apiServiceSpy: jasmine.SpyObj<ApiService<any>>;
//   let configServiceSpy: jasmine.SpyObj<ConfigurationService>;

//   beforeEach(() => {
//     const apiSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put']);
//     const configSpy = jasmine.createSpyObj('ConfigurationService', ['baseUrl']);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         OrderService,
//         { provide: ApiService, useValue: apiSpy },
//         { provide: ConfigurationService, useValue: configSpy },
//       ],
//     });

//     service = TestBed.inject(OrderService);
//     httpMock = TestBed.inject(HttpTestingController);
//     apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService<any>>;
//     configServiceSpy = TestBed.inject(ConfigurationService) as jasmine.SpyObj<ConfigurationService>;

//     configServiceSpy.baseUrl = 'https://localhost:9001';
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('getOrder', () => {
//     it('should call ApiService.get with the correct URL', () => {
//       const orderId = '123';
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/order/${orderId}`;

//       service.getOrder(orderId);

//       expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
//     });
//   });

//   // describe('createOrder', () => {
//   //   it('should call ApiService.post with the correct URL and payload', () => {
//   //     const orderRequest: IOrderRequest = { /* Mock order request data */ };
//   //     const expectedUrl = `${configServiceSpy.baseUrl}/v1/order`;

//   //     service.createOrder(orderRequest);

//   //     expect(apiServiceSpy.post).toHaveBeenCalledWith(expectedUrl, orderRequest);
//   //   });
//   // });

//   describe('cancelOrder', () => {
//     it('should call ApiService.put with the correct URL', () => {
//       const orderId = '123';
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/order/cancel/${orderId}`;

//       service.cancelOrder(orderId);

//       expect(apiServiceSpy.put).toHaveBeenCalledWith(expectedUrl, {});
//     });
//   });

//   describe('payOrder', () => {
//     it('should call ApiService.put with the correct URL', () => {
//       const orderId = '123';
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/order/pay/${orderId}`;

//       service.payOrder(orderId);

//       expect(apiServiceSpy.put).toHaveBeenCalledWith(expectedUrl, {});
//     });
//   });

//   describe('getAllOrders', () => {
//     it('should call ApiService.get with the correct URL', () => {
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/order`;

//       service.getAllOrders();

//       expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
//     });
//   });
// });
