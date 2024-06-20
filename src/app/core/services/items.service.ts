import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from '../../models/item.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService implements OnDestroy {
  private itemsSubject = new BehaviorSubject<Item[]>(this.getItemsFromLocalStorage());
  items$ = this.itemsSubject.asObservable();
  private fetchSubscription: Subscription | null = null;

  constructor(private apiService: ApiService) {
    this.refetchItemsIfNeeded();
  }

  ngOnDestroy() {
    this.unsubscribeFetch();
  }

  private getItemsFromLocalStorage(): Item[] {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }

  private saveItemsToLocalStorage(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  private unsubscribeFetch() {
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe();
      this.fetchSubscription = null;
    }
  }

  fetchItems(): Observable<Item[]> {
    this.unsubscribeFetch(); // Unsubscribe from any previous subscription
    this.fetchSubscription = this.apiService.getItems().pipe(
      tap(items => {
        this.itemsSubject.next(items);
        this.saveItemsToLocalStorage(items);
      })
    ).subscribe();
    return this.items$;
  }

  refetchItemsIfNeeded() {
    const lastFetch = localStorage.getItem('lastFetch');
    const now = new Date().getTime();
    const refreshInterval = 60 * 60 * 1000; // 1 hour

    if (!lastFetch || now - parseInt(lastFetch) > refreshInterval) {
      this.fetchItems().subscribe(() => {
        localStorage.setItem('lastFetch', now.toString());
      });
    }
  }

  scheduleRefetch(interval: number) {
    setInterval(() => this.fetchItems().subscribe(), interval);
  }
}
