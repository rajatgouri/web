import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingResolver } from './resolvers/listing.resolver';
import { ViewResolver } from './resolvers/view.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: ListingComponent,
    resolve: {
      listing: ListingResolver
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      order: ViewResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
