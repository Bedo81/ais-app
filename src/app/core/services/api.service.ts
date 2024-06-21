import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../models/order.model';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private itemsUrl = `${environment.apiUrl}/items`;
  private orderUrl = `${environment.apiUrl}/addOrder`;
  private activeOrdersUrl = `${environment.apiUrl}/getActiveAndPreparingOrders`;
  private updateOrderStatusUrl = `${environment.apiUrl}/updateOrderStatus`;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  sendOrder(order: Order): Observable<any> {
    return this.http.post(this.orderUrl, order);
  }

  getActiveAndPreparingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.activeOrdersUrl);
  }

  updateOrderStatus(id: string, status: string): Observable<void> {
    return this.http.put<void>(this.updateOrderStatusUrl, { id, status });
  }
}
