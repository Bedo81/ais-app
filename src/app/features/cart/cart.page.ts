import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { Order } from '../../models/order.model';
import { CartItemsComponent } from './cart-items.component';
import { firstValueFrom } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, CartItemsComponent]
})
export class CartPage implements OnInit, OnDestroy {
  cart$ = this.cartService.cart$;
  cartTotal$ = this.cartService.cartTotal$;
  user: any;
  pickupTime: string;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {
    // Set the initial pickup time to current time + 10 minutes
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 10);
    this.pickupTime = currentTime.toISOString().substring(0, 16); // Properly formatted for ion-datetime
  }

  ngOnInit() {
    this.authService.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    // This method is necessary for the untilDestroyed operator to work
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  async handleOrder() {
    if (!this.user) {
      this.router.navigate(['/signin']);
      return;
    }

    const cart = await firstValueFrom(this.cart$) ?? [];
    const cartTotal = await firstValueFrom(this.cartTotal$) ?? 0;

    const order: Order = {
      user: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
      },
      items: cart,
      total: cartTotal,
      status: 'active',
      createdAt: new Date(),
      directionsLeg: {}, // Empty object for now, replace with actual data if available
      pickupTime: new Date(new Date().toISOString().split('T')[0] + 'T' + this.pickupTime.split('T')[1]) // Today's date with selected time
    };

    this.apiService.sendOrder(order).subscribe({
      next: () => {
        // Handle successful order
        console.log('Order sent successfully');
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        console.error('There was a problem sending the order:', error);
      }
    });
  }
}
