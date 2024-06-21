import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsComponent {
  @Input() cart: Item[] = [];
  @Input() cartTotal: number = 0;
  @Output() remove = new EventEmitter<string>();

  removeFromCart(itemId: string) {
    this.remove.emit(itemId);
  }
}
