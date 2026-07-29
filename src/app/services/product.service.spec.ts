import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'A test product',
      category: 'test',
      image: 'https://via.placeholder.com/150',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products successfully', () => {
    service.loadProducts();

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    expect(service.products()).toEqual(mockProducts);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeNull();
  });

  it('should set error when request fails', () => {
    service.loadProducts();

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    expect(service.products()).toEqual([]);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toContain('Unable to load products');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
