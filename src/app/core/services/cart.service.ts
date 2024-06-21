import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Item[]>(this.getCartFromLocalStorage());
  cart$ = this.cartSubject.asObservable();

  private cartTotalSubject = new BehaviorSubject<number>(this.calculateCartTotal(this.getCartFromLocalStorage()));
  cartTotal$ = this.cartTotalSubject.asObservable();

  constructor() {}

  private getCartFromLocalStorage(): Item[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToLocalStorage(cart: Item[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private calculateCartTotal(cart: Item[]): number {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  addToCart(item: Item) {
    const currentCart = this.cartSubject.value;
    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    this.cartSubject.next(currentCart);
    this.cartTotalSubject.next(this.calculateCartTotal(currentCart));
    this.saveCartToLocalStorage(currentCart);
  }

  removeFromCart(itemId: string) {
    const currentCart = this.cartSubject.value.filter(item => item.id !== itemId);
    this.cartSubject.next(currentCart);
    this.cartTotalSubject.next(this.calculateCartTotal(currentCart));
    this.saveCartToLocalStorage(currentCart);
  }

  clearCart() {
    this.cartSubject.next([]);
    this.cartTotalSubject.next(0);
    localStorage.removeItem('cart');
  }
}
