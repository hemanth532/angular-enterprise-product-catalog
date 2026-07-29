import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private readonly refreshState = signal(0);
  readonly searchTerm = signal('');
  readonly filteredProducts = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const products = this.productService.products();
    return query
      ? products.filter((product) => product.title.toLowerCase().includes(query))
      : products;
  });

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.loadProducts();
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  refreshProducts() {
    this.refreshState.update((value) => value + 1);
    this.productService.loadProducts();
  }
}
