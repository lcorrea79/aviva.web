import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should make a GET request', () => {
      const mockResponse = { data: 'test' };
      const url = 'test-url';
      const params = new HttpParams().set('key', 'value');

      service.get(url, { params }).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === url);
      expect(req.request.params.get('key')).toBe('value');
      req.flush(mockResponse);
    });
  });

  describe('post', () => {
    it('should make a POST request', () => {
      const mockResponse = { data: 'test' };
      const url = 'test-url';
      const payload = { key: 'value' };

      service.post(url, payload).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => req.method === 'POST' && req.url === url);
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('put', () => {
    it('should make a PUT request', () => {
      const mockResponse = { data: 'test' };
      const url = 'test-url';
      const payload = { key: 'value' };

      service.put(url, payload).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => req.method === 'PUT' && req.url === url);
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make a DELETE request', () => {
      const mockResponse = { data: 'test' };
      const url = 'test-url';

      service.delete(url).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => req.method === 'DELETE' && req.url === url);
      req.flush(mockResponse);
    });
  });
});
