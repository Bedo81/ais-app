import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  user: any;
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  handleSignOut() {
    this.authService.signOut();
  }
}
