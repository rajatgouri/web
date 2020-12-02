import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishListComponent } from './components/wishlist/list.component';
import { UpdateComponent } from './components/update/update.component';
import { RefundListingComponent } from './components/refund/refund-listing.component';

const routes: Routes = [
  {
    path: 'wishlist',
    component: WishListComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
  {
    path: 'refunds',
    component: RefundListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
