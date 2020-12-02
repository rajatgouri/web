import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { ConfigResolver } from './shared/resolver';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', loadChildren: './starter/starter.module#StarterModule' },
      { path: 'payment', loadChildren: './payment/payment.module#PaymentModule' },
      { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
      { path: 'page', loadChildren: './static-page/static-page.module#StaticPageModule' },
      { path: 'products', loadChildren: './product/product.module#ProductModule' },
      { path: 'shops', loadChildren: './shop/shop.module#ShopModule' },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: './profile/profile.module#ProfileModule'
      },
      { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: './order/order.module#OrderModule'
      },
      {
        path: 'donations',
        canActivate: [AuthGuard],
        loadChildren: './buy-us-a-coffee/buy-us-a-coffee.module#BuyUsACoffeeModule'
      },
      {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: './message/message.module#MessageModule'
      }
    ]
  },
  {
    path: 'auth',
    component: FullComponent,
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', loadChildren: './auth/auth.module#AuthModule' }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
