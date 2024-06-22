import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.fetchOrders();
  }

  fetchOrders() {
    this.apiService.getActiveAndPreparingOrders().subscribe(
      orders => this.ordersSubject.next(orders),
      error => console.error('Error fetching orders', error)
    );
  }

  // getActiveOrders(): Observable<Order[]> {
  //   return this.orders$.pipe(
  //     map(orders => orders.filter(order => order.status === 'active' || order.status === 'preparing'))
  //   );
  // }

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
