import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../carts/services/cart.service';
@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  product: Product | null = null;
  addToCart(product: Product): void {
    const quantity = Number(prompt('Enter the quantity:', '1'));
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.addToCart(product, quantity);
    } else {
      alert('Invalid quantity');
    }
  }
constructor(private route: ActivatedRoute,
  private productService: ProductsService,private cartService: CartService) {}
 ngOnInit(): void {
  const productId = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.getProductById(productId).subscribe({
    next: (product) => this.product = product,
    error: (err) => console.error('Error fetching product details', err)
  });
 } 

}

