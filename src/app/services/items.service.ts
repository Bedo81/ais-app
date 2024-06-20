import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchItems(): Observable<Item[]> {
    return this.apiService.getItems().pipe(
      tap(items => this.itemsSubject.next(items))
    );
  }
}
