import { UtilsModule } from './../utils/utils.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { StaticPageComponent } from './components/static-page.component';

import { StaticPageService } from './services/static-page.service';

const routes: Routes = [{
  path: ':alias',
  component: StaticPageComponent
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    UtilsModule
  ],
  declarations: [
    StaticPageComponent
  ],
  providers: [StaticPageService]
})

export class StaticPageModule { }
