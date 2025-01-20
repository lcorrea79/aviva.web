// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ProductService } from './product.service';
// import { ApiService } from './api.service';
// import { ConfigurationService } from '../../core/services/configuration.service';
// import { IProduct } from '../models/product.model';

// describe('ProductService', () => {
//   let service: ProductService;
//   let apiServiceSpy: jasmine.SpyObj<ApiService<any>>;
//   let configServiceSpy: jasmine.SpyObj<ConfigurationService>;

//   beforeEach(() => {
//     const apiSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
//     const configSpy = jasmine.createSpyObj('ConfigurationService', ['baseUrl']);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         ProductService,
//         { provide: ApiService, useValue: apiSpy },
//         { provide: ConfigurationService, useValue: configSpy },
//       ],
//     });

//     service = TestBed.inject(ProductService);
//     apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService<any>>;
//     configServiceSpy = TestBed.inject(ConfigurationService) as jasmine.SpyObj<ConfigurationService>;

//     configServiceSpy.baseUrl = 'https://localhost:9001';
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('getProduct', () => {
//     it('should call ApiService.get with the correct URL', () => {
//       const productId = 1;
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product/${productId}`;

//       service.getProduct(productId);

//       expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
//     });
//   });

//   describe('createProduct', () => {
//     it('should call ApiService.post with the correct URL and payload', () => {
//       const product: IProduct = { 
//         id: 1,
//         name: 'Test Product',
//         details: 'Test product details',
//         status: true,
//         unitPrice: 100.0
//       };
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product`;

//       service.createProduct(product);

//       expect(apiServiceSpy.post).toHaveBeenCalledWith(expectedUrl, product);
//     });
//   });

//   describe('updateProduct', () => {
//     it('should call ApiService.put with the correct URL and payload', () => {
//       const productId = 1;
//       const product: IProduct = { 
//         id: 1,
//         name: 'Updated Product',
//         details: 'Updated product details',
//         status: false,
//         unitPrice: 120.0
//       };
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product/${productId}`;

//       service.updateProduct(productId, product);

//       expect(apiServiceSpy.put).toHaveBeenCalledWith(expectedUrl, product);
//     });
//   });

//   describe('deleteProduct', () => {
//     it('should call ApiService.delete with the correct URL', () => {
//       const productId = 1;
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product/${productId}`;

//       service.deleteProduct(productId);

//       expect(apiServiceSpy.delete).toHaveBeenCalledWith(expectedUrl);
//     });
//   });

//   describe('getAllProducts', () => {
//     it('should call ApiService.get with the correct URL', () => {
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product`;

//       service.getAllProducts();

//       expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
//     });
//   });

//   describe('getProductByNameList', () => {
//     it('should call ApiService.get with the correct URL', () => {
//       const name = 'TestProduct';
//       const expectedUrl = `${configServiceSpy.baseUrl}/v1/Product/name/${name}`;

//       service.getProductByNameList(name);

//       expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
//     });
//   });
// });
