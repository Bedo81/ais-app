import { OrdersPage } from './../features/orders/orders.page';
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'cart',
        loadComponent: () => import('../features/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'items',
        loadComponent: () => import('../features/items/items.page').then((m) => m.ItemsPage),
      },
      {
        path: 'orders',
        loadComponent: () => import('../features/orders/orders.page').then((m) => m.OrdersPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'signin',
    loadComponent: () => import('../core/auth/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
