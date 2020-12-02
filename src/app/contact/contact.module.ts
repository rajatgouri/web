import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact.component';

import { ContactService } from './services/contact.service';

import { UtilsModule } from '../utils/utils.module';

const routes: Routes = [{
  path: 'us',
  component: ContactComponent
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes),
    UtilsModule
  ],
  declarations: [
    ContactComponent
  ],
  providers: [ContactService]
})

export class ContactModule { }