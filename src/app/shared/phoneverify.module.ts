import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneverifyComponent } from './phoneverify/phoneverify.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PhoneverifyComponent],
  imports:[
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports: [PhoneverifyComponent]
})
export class PhoneverifyModule { }
