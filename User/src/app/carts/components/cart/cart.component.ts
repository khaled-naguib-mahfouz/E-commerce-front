import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/CartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  total: number = 0;
  cartItems: CartItem[] = [];



  constructor(private cartService :CartService) {
  }
  ngOnInit(): void {
    this.loadCartItems();

  }
  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => console.error('Error fetching cart items', err)
    });
  }
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id).subscribe({
      next: () => this.loadCartItems(),
      error: (err) => console.error('Error removing cart item', err)
    });
  }
  
  updateQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = Number(inputElement.value);
    if (quantity > 0) {
      this.cartService.updateCartItemQuantity(item.product.id, quantity).subscribe({
        next: () => this.loadCartItems(),
        error: (err) => console.error('Error updating cart item quantity', err)
      });
    }

}}
