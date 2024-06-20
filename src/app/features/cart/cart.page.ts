import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { Item } from '../../models/item.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CartPage implements OnInit {
  cart: Item[] = [];
  cartTotal: number = 0;
  user: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.cartTotal = this.calculateCartTotal(cart);
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  calculateCartTotal(cart: Item[]): number {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  async handleOrder() {
    if (!this.user) {
      this.router.navigate(['/signin']);
      return;
    }

    const order: Order = {
      user: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
      },
      items: this.cart,
      total: this.cartTotal,
      status: 'active',
      createdAt: new Date(),
      directionsLeg: {}, // Empty object for now, replace with actual data if available
      pickupTime: new Date().toISOString() // Current date and time in ISO format
    };

    this.apiService.sendOrder(order).subscribe(
      () => {
        // Handle successful order
        console.log('Order sent successfully');
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error('There was a problem sending the order:', error);
      }
    );
  }
}
