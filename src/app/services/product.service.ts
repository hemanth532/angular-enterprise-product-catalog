import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { catchError, from, map, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';
  products: WritableSignal<Product[]> = signal([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    from(
      this.http.get<Product[]>(this.apiUrl).pipe(
        catchError((reason) => {
          const message = 'Unable to load products. Please try again later.';
          this.error.set(`${message} ${reason?.message ?? ''}`.trim());
          return of([] as Product[]);
        })
      )
    ).pipe(
      map((results) => {
        this.products.set(results);
        this.loading.set(false);
        return results;
      })
    ).subscribe();
  }

  get productCount() {
    return computed(() => this.products().length);
  }
}
