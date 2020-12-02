import { Component } from '@angular/core';
import { CartService, AuthService } from '../../../shared/services';

@Component({
templateUrl: './checkout-success.html'
})
export class CheckoutSuccessComponent {
public isLoggedIn = this.auth.isLoggedin();

constructor( private service: CartService, private auth: AuthService) {
	this.service.clean();
	}
}
