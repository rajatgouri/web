import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment.component';
import { UtilsModule } from '../utils/utils.module';
import { PaymentService } from './payment.service';

const routes: Routes = [{
	path: 'methods/:orderId',
	component: PaymentComponent
}];

@NgModule({
  imports: [
		CommonModule,
		NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [

	],
  declarations: [
    PaymentComponent
  ],
  entryComponents: [],
  providers: [
    PaymentService
  ]
})

export class PaymentModule {}
