import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService } from 'ng2-toasty';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { CartService, AuthService } from '../../../shared/services';
import { DonationService } from '../../services/donation.service';

@Component({
	selector: 'buy-us-a-coffee',
	templateUrl: './buy-us-a-coffee.html'
})
export class BuyUsACoffeeComponent {
	@ViewChild('buyCoffeeModal') buyCoffeeModal: ElementRef;
	@ViewChild(StripeCardComponent) card: StripeCardComponent;

	
	public stripeTest: FormGroup;
	public stripeToken: any = null;

	public cardHolderName: any = '';
	public cardOptions: any = {};
	constructor(
		private service: CartService,
		private auth: AuthService,
		private stripeService: StripeService,
		private fb: FormBuilder,
		private toasty: ToastyService,
		private translate: TranslateService,
		private donationService: DonationService,
	) {

	}


	ngOnInit() {
		this.stripeService.setKey(window.appConfig.stripeKey);
		this.stripeTest = this.fb.group({
			cardName: ['', [Validators.required]],
			amount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
		});
	}

	openModal() {
		this.buyCoffeeModal.nativeElement.style.display = 'block';
	}

	closeModal() {

		this.buyCoffeeModal.nativeElement.style.display = 'none';

	}

	onChangeAmount(event) {
		let value = event.target.value;


		if(value < 1) {
			this.stripeTest.patchValue({
				'amount': 1 
			})
		} else if (value > 100) {
			this.stripeTest.patchValue({
				'amount': 100 
			})
		}
	}

	onKeyPress(e){
		e.preventDefault()
	}

	onSubmit() {
		if (this.stripeTest.invalid) {
			return this.toasty.error(this.translate.instant('Please submit valid form'));
		}

		const name = this.stripeTest.get('cardName').value;
		if (!name) {
			return this.toasty.error(this.translate.instant('Please enter card holder name!'));
		}
		this.stripeService
			.createToken(this.card.getCard(), { name })
			.subscribe(result => {
				if (result.token) {
					// Use the token to create a charge or a customer
					// https://stripe.com/docs/charges
					this.stripeToken = result.token.id;
					this.doPost();
				} else if (result.error) {
					// Error creating the token
					this.toasty.error(this.translate.instant(result.error.message));
					//this.toasty.error(this.translate.instant('Something went wrong, please try again!'));
				}
			});
	}

	doPost() {
		this.closeModal();

		this.donationService.donate({
			gateway: 'stripe',
			service: 'donate',
			name: this.stripeTest.get('cardName').value,
			amount: this.stripeTest.get('amount').value,
			description: 'Buy us a Coffee Donation',
			stripeToken: this.stripeToken
		})
		.then(res => {
			this.toasty.success(this.translate.instant('Thank for your Support!'));
			this.stripeTest.reset();
			this.card.getCard().clear();
		})
		.catch((err) => this.toasty.error(this.translate.instant('Something went wrong, please try again!')));
	}
}
