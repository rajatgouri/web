import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/detail/detail.component';
import { ProductResolver } from './resolvers/product.resolver';
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
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
