import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CartService } from '../../../carts/services/cart.service';
import { Product } from '../../../models/product';
import { RouterModule,Routes } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent,RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})

export class AllProductsComponent implements OnInit {
  selectedCategoryId: number=0;
  products: any[] = [];
  categories: any[] = [];
  isLoading: boolean = false;


  constructor(private service: ProductsService, private cartService:CartService,private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true;

    this.service.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products', 
          err);
          this.isLoading = false;
        }
  });
  }
  addToCart(product: Product): void {
    const quantity = Number(prompt('Enter the quantity:', '1'));
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.addToCart(product, quantity);
    } else {
      alert('Invalid quantity');
    }
  }

  loadCategories(): void {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.isLoading = false;
      }

    });
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId === 0) {
      this.loadProducts();
    } else {

      this.service.getProductsByCategory(this.selectedCategoryId).subscribe({
        next: (products) => {this.products = 
          products;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching products by category:', err);
          alert('Failed to fetch products by category. Please try again later.');
          this.isLoading = false;

        }
      });
    }
  }
}