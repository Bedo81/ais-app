import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../models/item.model';
import { ItemsService } from '../../core/services/items.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ItemsPage implements OnInit {
  items$: Observable<Item[]>;
  selectedCategory: string = 'food';

  constructor(private itemsService: ItemsService, private cartService: CartService) {
    this.items$ = this.itemsService.items$;
  }

  ngOnInit() {
    this.itemsService.scheduleRefetch(60 * 60 * 1000); // Refetch every hour
  }

  handleCategoryChange(category: string | null | undefined | any) {
    if (category) {
      this.selectedCategory = category;
    }
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  get filteredItems$(): Observable<Item[]> {
    return this.items$.pipe(
      map(items => items.filter(item => item.category === this.selectedCategory))
    );
  }
}
