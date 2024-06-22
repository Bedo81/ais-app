import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UserOrdersPage implements OnInit {
  user$ = this.authService.user$;
  orders$!: Observable<Order[]>;
  isLoading = true;
  error: any = null;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.orders$ = this.orderService.getOrdersForUser(user.uid);
        this.orders$.subscribe({
          next: () => {
            this.isLoading = false;
            this.cdr.markForCheck();
          },
          error: err => {
            this.error = err;
            this.isLoading = false;
            this.cdr.markForCheck();
          }
        });
      }
    });
  }
}
