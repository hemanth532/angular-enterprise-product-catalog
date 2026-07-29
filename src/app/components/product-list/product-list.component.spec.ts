import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;

  const sampleProducts: Product[] = [
    {
      id: 1,
      title: 'Sample Product',
      price: 29.99,
      description: 'A great sample product.',
      category: 'electronics',
      image: 'https://via.placeholder.com/150',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    spyOn(productService, 'loadProducts').and.callThrough();

    fixture.detectChanges();

    expect(productService.loadProducts).toHaveBeenCalled();
  });

  it('should display product cards when data is loaded', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(sampleProducts);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-card').length).toBe(1);
    expect(compiled.textContent).toContain('Sample Product');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
