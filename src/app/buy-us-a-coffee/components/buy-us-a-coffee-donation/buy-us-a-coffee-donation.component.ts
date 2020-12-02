import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService } from 'ng2-toasty';
import { UtilService } from '../../../shared/services';
import { DonationService } from '../../services/donation.service';

@Component({
	selector: 'buy-us-a-coffee-donation',
	templateUrl: './buy-us-a-coffee-donation.html'
})
export class BuyUsACoffeeDonationComponent {

	public donations = [];
	public page: Number = 1;
	public take: Number = 10;
	public total: Number = 0;
	public searchFields: any = {
		status: ''
	};

	public sortOption = {
		sortBy: 'createdAt',
		sortType: 'desc'
	};
	public isLoading = false;
	constructor(
		private utilService: UtilService,
		private donationService: DonationService,
		private toasty: ToastyService,
		private translate: TranslateService
	) {}


	ngOnInit() {
		this.query();
	}


	query() {
		console.log('y')
		this.isLoading = true;
		this.utilService.setLoading(true);
		const params = Object.assign({
			page: this.page,
			take: this.take,
			sort: `${this.sortOption.sortBy}`,
			sortType: `${this.sortOption.sortType}`
		}, this.searchFields);

		this.donationService.getDonations(params).then(res => {
			this.isLoading = false;
			this.utilService.setLoading(false);

			this.donations = res.data.data;
			this.total = res.data.count;
		})
		.catch(err => {
			this.isLoading = false;
			this.utilService.setLoading(false);
			this.toasty.error(this.translate.instant('Something went wrong, please try again!'))	
		})
	}

	sortBy(field: string, type: string) {
		this.sortOption.sortBy = field;
		this.sortOption.sortType = type;
		this.query();
	}
}
