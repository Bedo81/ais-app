import { Component, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order.model';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type OrderSortKeys = 'createdAt' | 'pickupTime';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersPage implements OnInit {
  orders$ = this.orderService.orders$;
  sortBy = new BehaviorSubject<OrderSortKeys>('createdAt');
  sortByValue: OrderSortKeys = 'createdAt'; // Property bound to ngModel
  sortedOrders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.fetchOrders(); // Ensure orders are fetched when the component initializes

    this.sortedOrders$ = combineLatest([this.orders$, this.sortBy]).pipe(
      map(([orders, sortBy]) => this.sortOrders(orders, sortBy))
    );
  }

  sortOrders(orders: Order[], sortBy: OrderSortKeys): Order[] {
    return orders.sort((a, b) => {
      if (a.status === 'preparing' && b.status !== 'preparing') {
        return -1;
      }
      if (a.status !== 'preparing' && b.status === 'preparing') {
        return 1;
      }
      return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
    });
  }

  updateStatus(order: Order, status: string) {
    if (order.id) {
      this.orderService.updateOrderStatus(order.id, status).subscribe();
    }
  }

  viewOrderDetails(order: Order) {
    // Implement navigation to order details page or show accordion
  }
}
