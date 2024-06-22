import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../../models/order.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchOrders() {
    this.apiService.getActiveAndPreparingOrders().subscribe(
      orders => this.ordersSubject.next(orders),
      error => console.error('Error fetching orders', error)
    );
  }

  getActiveOrders(): Observable<Order[]> {
    return this.orders$;
  }

  getOrdersForUser(uid: string): Observable<Order[]> {
    return this.apiService.getOrdersForUser(uid);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.apiService.updateOrderStatus(orderId, status).pipe(
      map(() => {
        const orders = this.ordersSubject.value.map(order => order.id === orderId ? { ...order, status } : order);
        this.ordersSubject.next(orders);
      })
    );
  }
}
