import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopDetailComponent } from './components/detail/detail.component';
import { ShopResolver } from './resolvers/shop.resolver';
import { SearchResolver } from './resolvers/search.resolver';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      search: SearchResolver
    }
  },
  {
    path: ':alias',
    component: ShopDetailComponent,
    resolve: {
      shop: ShopResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
