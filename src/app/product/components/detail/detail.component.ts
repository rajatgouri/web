import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService, CartService, AuthService } from '../../../shared/services';
import { ProductVariantService, ProductService } from '../../services';
import { WishlistService } from '../../../profile/services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { ShareButtons } from '@ngx-share/core';
import { Subscription } from 'rxjs/Subscription';
//import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../shared/services';
import { isSet, result } from 'lodash';
import {FormsModule} from '@angular/forms';

@Component({
  templateUrl: './detail.html'
})
export class ProductDetailComponent implements OnDestroy {
  public product: any;
  public discount: any = 100;
  public discountVal: any = 100;
  public variants: any = [];
  public isVariant: any = false;
  public tab: any = 'detail';
  public selectedVariant: any;
  public page: any = 1;
  public quantity: any = 1;
  public activeSlide: any = {};
  public slidePosition: any = 0;
  private productSubscription: Subscription;
  public slideConfig: any = {
    'slidesToShow': 5,
    'slidesToScroll': 5
  };
  public vatBasePrice:any = 0;
  public vatSalePrice:any = 0;
  public basePrice:any = 0;
  public price: any = 0;
  public pricePerDay: any = 0;
  public pricePerWeek: any = 0;
  public pricePerMonth: any = 0;
  public salePrice: any = 0;
  public stockQuantity: any = 0;
  public isShowVar: any = false;
  public userID: any;
  public fromDate: any;
  public toDate: any;
  public isProductRentAndShare = false;
  model: NgbDateStruct;
  today = this.calendar.getToday();
  placement = 'bottom';
  public isProductAvailableOnDateRange: boolean = true;
  public minDate:any;
  public maxDate:any;
  public disabledDates:NgbDateStruct[];
  public rentDurationText: string = '';
  public zipcode = '';
  public deliverable:boolean = false;
  public deliveryStatus: boolean = false;

  

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private authService: AuthService, private seoService: SeoService, 
    private variantService: ProductVariantService,
    private productService: ProductService,
    public share: ShareButtons, 
    private wishlistService: WishlistService, 
    private toasty: ToastyService,
    private cartService: CartService,
    private calendar: NgbCalendar,
    private formatter: NgbDateParserFormatter,
    private toastr: ToastrService,
    private utilService: UtilService,
    private router: Router) {
    if (this.authService.isLoggedin()) {
      this.authService.getCurrentUser().then(res => this.userID = res._id);
    }

    

    this.product = route.snapshot.data.product;

    if (this.product.shop && this.product.shop.gaCode) {
      seoService.trackPageViewForShop(this.product.shop._id, this.product.shop.gaCode);
    }
    this.productSubscription = this.route.data.subscribe(data => {
      this.product = data.product;
      console.log(this.product)
      
      if(!this.product.transactiontype){
        this.isProductAvailableOnDateRange = true;
      }
      else if((this.product.transactiontype.name == 'Rent' || this.product.transactiontype.name == 'Share')){
        this.isProductAvailableOnDateRange = false;
        this.isProductRentAndShare = true;
        this.minDate = {year: moment(this.product.startDate).year(), month: moment(this.product.startDate).month()+1, day: moment(this.product.startDate).date()};
        this.maxDate = {year: moment(this.product.endDate).year(), month: moment(this.product.endDate).month()+1, day: moment(this.product.endDate).date()};
      }
      this.updateSeo();
      this.selectedVariant = {};
      this.isVariant = false;
      this.quantity = 1;
      if(this.product.salePrice > 0 && !this.isProductRentAndShare){
        this.basePrice = this.product.salePrice;
      } else{
        this.basePrice = this.product.price;
      }
      this.pricePerDay = this.product.price;
      this.pricePerWeek = this.product.pricePerWeek;
      this.pricePerMonth = this.product.pricePerMonth;

      if (this.product.images.length) {
        this.activeSlide = this.product.images[0];
      } else if (!this.product.images.length && this.product.mainImage) {
        this.activeSlide = this.product.mainImage;
      }

      this.setPrice(this.product);
      this.getVariants();
      this.getProductBookedDate();

    });

    

    this.disabledDates = [];
  }

  isDisabled=(date:NgbDateStruct,current: {month: number,year:number})=> {
    //in current we have the month and the year actual
    return this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
  }

  
  isBooked = (date: NgbDate) =>  {
    return this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
  };

  areaCheck() {
    if(this.zipcode.trim().length <= 0) {
      return this.toasty.error(this.translate.instant('Please Enter Zipcode'));
    }
    this.productService.areaAvailibility(this.zipcode, this.product.location.coordinates, this.product.distance)
      .then((result) => {
        this.deliveryStatus = true;
        if(result.data.distance.code === 200 ) {
          this.deliverable = true;
        } else {
          this.deliverable = false;
        }
      })
      .catch(err => {
          return this.toasty.error(this.translate.instant('Please Enter Correct Zip code'));
      })

  }

  updateSeo() {
    let image = '';
    if (this.product.mainImage) {
      image = this.product.mainImage.mediumUrl;
    } else if (this.product.images.length) {
      image = this.product.images[0].mediumUrl;
    }
    this.seoService.update(this.product.name, this.product.metaSeo, image);
  }

  openVariant() {
    this.isShowVar = !this.isShowVar;
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  setPrice(product: any) {

    if(typeof this.fromDate !== 'undefined' && typeof this.toDate !== 'undefined'){
      product.price = this.calculateProductPrice();
      this.basePrice = product.price;
    }
    
    this.vatSalePrice = product.salePrice * this.product.taxPercentage / 100 || 0;
    this.vatBasePrice = product.price * this.product.taxPercentage / 100 || 0;
    this.price = product.price + this.vatBasePrice || product.price;
    if(!this.isProductRentAndShare){
      this.salePrice = product.salePrice + this.vatSalePrice || product.salePrice;
    }
    

    //This is for rental price calculation
    if((typeof this.fromDate !== 'undefined' && typeof this.toDate !== 'undefined') || this.isProductRentAndShare){
      if(product.depositAmont){
        this.price = this.price + product.depositAmont;
        this.salePrice = this.price;
      }
    }

    this.discountVal = this.price ? ((this.price - this.salePrice) / this.price * 100).toFixed(2) : 0;
    this.stockQuantity = product.stockQuantity;
  }

  getVariants() {
    this.variantService.search(this.product._id, { take: 100 }).then((resp) => {
      this.variants = resp.data.items;
    });
  }

  changeSlide(index: number) {
    this.slidePosition = index;
    this.activeSlide = this.product.images[index];
  }

  selectVariant(val: any, index: any) {
    if (this.selectedVariant && this.selectedVariant === val) {
      this.isVariant = false;
      this.selectedVariant.isSelected = false;
      this.setPrice(this.product);
      this.selectedVariant = {};
      return;
    }
    this.isVariant = true;
    if (this.selectedVariant) {
      this.selectedVariant.isSelected = false;
    }
    this.selectedVariant = val;
    this.variants[index].isSelected = true;
    this.setPrice(this.variants[index]);
  }

  addWishList(item: any) {
    if (!this.authService.isLoggedin()) {
      return this.toasty.error(this.translate.instant('Please login before adding to wishlist.'));
    }
    this.wishlistService.create({ productId: item._id })
      .then(resp => this.toasty.success(this.translate.instant('Added to wishlist successfully.')))
      .catch(err => this.toasty.error(err.data.data.message || this.translate.instant('Error occured, please try again later.')));
  }

  addCart() {

    if (!this.stockQuantity) {
      return this.toasty.error(this.translate.instant('This item is out of stock.'));
    }

    if (this.quantity > this.stockQuantity) {
      return this.toasty.error(this.translate.instant('Quantity is not valid, please check and try again!'));
    }

    if(this.isProductRentAndShare)
    {
        if(this.fromDate!='' && this.toDate!=''){
          this.cartService.add({
            productId: this.isVariant ? this.selectedVariant.productId : this.product._id,
            productVariantId: this.isVariant ? this.selectedVariant._id : null,
            variant : this.isVariant ? this.selectedVariant : null,
            product: this.product,
            fromDate: this.formatter.format(this.fromDate),
            toDate: this.formatter.format(this.toDate)
          }, this.quantity);
        }
    } else {
      this.cartService.add({
        productId: this.isVariant ? this.selectedVariant.productId : this.product._id,
        productVariantId: this.isVariant ? this.selectedVariant._id : null,
        variant : this.isVariant ? this.selectedVariant : null,
        product: this.product
      }, this.quantity);  
    }
    
    //This is for Renter and Shared
    if(this.isProductRentAndShare){
      this.router.navigate(['/cart/checkout']);
    }
    
  }


  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  onAvailableChange(event){

    
    let startDate = this.formatter.format(this.fromDate);
    let endDate = this.formatter.format(this.toDate);
    if(startDate!='' && endDate !='')
    {
      if(startDate > endDate){
        return this.toasty.error(this.translate.instant('To date is grater then from date'));
      }
      else {
        this.utilService.setLoading(true);
        let param = {'alias':this.product.alias, 'startDate': startDate, 'endDate': endDate}
        this.productService.checkProductAvailability(param).then((resp) => {
        if(!resp.data){
            this.isProductAvailableOnDateRange = false;
            return this.toasty.error(this.translate.instant('Product is not available for this dates.'));
          } else {

            //This is to get date different
            this.product.price = this.pricePerDay;
            this.setPrice(this.product);
            this.isProductAvailableOnDateRange = true;
          }
        });
        this.utilService.setLoading(false);
      }
    } else {
      return this.toasty.error(this.translate.instant('Please select from date and to date'));
    }
    
  }

  calculateProductPrice(){

    let startDate = this.formatter.format(this.fromDate);
    let endDate = this.formatter.format(this.toDate);

    var fromDate = moment(startDate);
    var toDate = moment(endDate).add(1, 'day');
    var diff = moment.duration(toDate.diff(fromDate));
    let price = 0;
    let month = diff.months();
    let week = diff.weeks();
    let days = ((diff.days())%7);
    if(month > 0){
      price += month*this.product.pricePerMonth;
      //console.log("Price 1"+price);
    }
    if(week > 0){
      price += week*this.product.pricePerWeek;
      //console.log("Price 2"+price);
    }
    if(days > 0){
      price += days*this.product.price;
      //console.log("Price 3"+price);
    }

    //This is for text duration
    let duration = '';
    if(month > 0){
      if(month == 1){
        duration += month+" Month ";
      } else{
        duration += month+" Months ";
      }
    }
    if(week > 0){
      if(week == 1){
        duration += week+" Week ";
      } else{
        duration += week+" Weeks ";
      }
    }

    if(days > 0){
      if(days == 1){
        duration += days+" Day ";
      } else{
        duration += days+" Days ";
      }
    }

    this.rentDurationText = duration;


    /*console.log(price);
    console.log(month);
    console.log(week);
    console.log(days);*/
    return price;
  }

  getProductBookedDate() {
    this.utilService.setLoading(true);
    let param = {'alias':this.product.alias}
    this.productService.getProductOrders(param).then((resp) => {
      if(resp.data){
        var dateList = [];
        for (let order of resp.data){
          dateList = this.getDatesList(order.startDate, order.endDate);
          if(dateList){
            for (let date of dateList){
              this.disabledDates.push({year: moment(date).year(), month: moment(date).month()+1, day: moment(date).date()});  
            }
          }
        }
        
        console.log(this.disabledDates);
      }
    });
    this.utilService.setLoading(false);
  }

  getDatesList(startDate:any, stopDate:any) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }
}
