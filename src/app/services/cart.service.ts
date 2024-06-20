import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor() {}

  addItem(item: Item): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next([...currentItems, item]);
  }

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  removeItem(item: Item): void {
    const currentItems = this.itemsSubject.value.filter(i => i.id !== item.id);
    this.itemsSubject.next(currentItems);
  }
}
