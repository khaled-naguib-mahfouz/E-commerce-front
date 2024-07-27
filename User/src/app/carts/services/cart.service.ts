import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject, of } from 'rxjs';
import { CartItem } from '../../models/CartItem';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  addToCart(product: any, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  removeFromCart(productId: number): Observable<void> {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    return of();
  }
 
  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }
  
  updateCartItemQuantity(productId: number, quantity: number): Observable<void> {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    return of();
  }

  constructor() { }
}
