import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://us-central1-ris-app-a3f30.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API_URL}/getItems`);
  }
}
