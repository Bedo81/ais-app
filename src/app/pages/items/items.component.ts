import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Item } from '../../models/item.model';
import { CartService } from '../../services/cart.service';
import { ItemsService } from '../../services/items.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  selectedCategory: string = 'food';

  constructor(private itemsService: ItemsService, private cartService: CartService) {
    this.items$ = this.itemsService.items$;
  }

  ngOnInit() {
    this.itemsService.fetchItems().subscribe();
  }

  handleCategoryChange(category: string | null | undefined | any) {
    if (category) {
      this.selectedCategory = category;
    }
  }

  addToCart(item: Item) {
    this.cartService.addItem(item);
  }

  get filteredItems$(): Observable<Item[]> {
    return this.items$.pipe(
      map(items => items.filter(item => item.category === this.selectedCategory))
    );
  }
}
