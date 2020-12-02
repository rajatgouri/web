import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService, SystemService, CartService } from '../services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComplainComponent } from '../complain/complain.component';
import { TranslateService } from '@ngx-translate/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ProductService } from '../../product/services';
import { UtilService } from './../../shared/services/utils.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() updateFields = new EventEmitter();
  @ViewChild('searchautocomplete') searchautocomplete ;
  @ViewChild('dropdownMenu') dropdownMenu:ElementRef;

  public currentUser: any;
  public isShowed: any = false;
  private userLoadedSubscription: Subscription;
  public appConfig: any = {};
  public userLang: any = 'ca';
  public languages: any = [];
  public flag: any = `/assets/images/flags/ca.svg`;
  public isLoaded: any = false;
  private cartLoadedSubscription: Subscription;
  public cart: any = [];
  public q: string = '';
  public items: any = [];
  public searchData: any = [];
  public isLoading = false;
  public keyword = 'name';
  public search_ = '';
  public backdrop: boolean = false;
  public showEmail: boolean = false;
  public CountryISO = CountryISO;
  @ViewChild('Modal') Modal: ElementRef;
  credentials = {
    shopType: '',
    email: '',
    phone :''
  }

  constructor(private router: Router, private authService: AuthService, private systemService: SystemService,
    private modalService: NgbModal, 
    private translate: TranslateService, 
    private cartService: CartService,
    private productService: ProductService,
    private util: UtilService,
    private toasty: ToastrService) {
    this.userLoadedSubscription = authService.userLoaded$.subscribe(data => this.currentUser = data);
    this.cartLoadedSubscription = cartService.cartChanged$.subscribe(data => this.cart = data);
    this.systemService.configs().then(resp => {
      this.isLoaded = true;
      this.languages = resp.i18n.languages;
      this.flag = `/assets/images/flags/ca.svg`;
      this.appConfig = resp;
    });
  }

  ngOnInit() {
    this.cart = this.cartService.get();
    if (this.authService.isLoggedin()) {
      this.authService.getCurrentUser().then(resp => {
        this.currentUser = resp;
      });
    }

    this.util.emptySearchbar.subscribe((res) => {
      this.searchautocomplete.query = ''
      this.searchautocomplete.data = []
      this.searchautocomplete.clear();
    })  

    this.util.changesDetect.subscribe(res => {
      this.authService.getUser().then(resp => {
        this.currentUser = resp;
      })
    })
  }

  

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.userLoadedSubscription.unsubscribe();
  }

  logout() {
    this.authService.removeToken();
    window.location.href = '/';
  }

  dropdown() {}

  

  complain() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(ComplainComponent, ngbModalOptions);
  }

  changeLang(lang: any) {
    // this.systemService.setUserLang(lang);
    this.translate.use(lang);
    this.userLang = lang;
    this.flag = `/assets/images/flags/${this.userLang}.svg`;
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.search();

    }
  }

  search() {
    if (!this.productService.searchFields['q'].trim()) {
      return;
    }

    // nativate to search page
    // this.router.navigate(['/products/search'], {
    //   queryParams: { q: this.productService.searchFields['q'] }
    // });
  }

  onClearSearch(e) {
    if(this.searchautocomplete.query === '') {
      this.productService.searchFields['q'] = '';
    }

    if(this.router.url.match(/\/products\/search\?q=*/gm) ||  this.router.url === '/') {
      if (this.router.url.match(/\/products\/search\?q=*/gm)) {
        return this.router.navigate(['/'])
      }
      
      this.submitSearch();
      this.searchautocomplete.close();
    }

    
  }

  selectEvent(item) {

    console.log(item)
    //this.router.navigate(['products/', item.alias]);
    this.productService.searchFields['q'] = encodeURIComponent(item.name);
    
    // this.updateFields.emit(this.productService.searchFields);
    this.router.navigate(['/products/search'], {
      queryParams: { q: this.productService.searchFields['q'] }
    });
  }
 
  onChangeSearch(val: string) {
      this.productService.searchFields['q'] = encodeURIComponent(val);
    // this.updateFields.emit(this.searchFields);
    this.query();
  }

  keypressEvent(event){
    console.log(event);
    if(event.keyCode == 13){
      this.submitSearch();
    }
  }

  submitSearch(){
    // // do something when input is focuseds    
    // this.updateFields.emit(this.productService.searchFields);
    this.router.navigate(['/products/search'], {
      queryParams: { q: this.productService.searchFields['q'] }
    });
    // // this.updateFields.emit(this.productService.searchFields);
    // this.query();
  }
  
  onFocused(e){
    // do something when input is focused
  }



  query(){

    const params = Object.assign({
      //q: this.q
    }, this.productService.searchFields);

    this.productService.search(params).then((res) => {
      this.items = res.data.items;
      this.util.setLoading(false);
      this.isLoading = false;
      this.searchData = {'id':'', 'name': this.productService.searchFields.q, "alias":''}
      this.searchData = Object.keys(this.items).map(key => {
        let data = {};
        data = {'id': this.items[key].id, "name":this.items[key].name, "alias": this.items[key].alias};
        return data;
      });
    }).catch(() => {
        this.util.setLoading(false);
        this.isLoading = false;
    });

  }

  openSeller(type:any)
  {
    this.credentials.shopType = type;
    if(!this.currentUser){
      // this.showModal();
    } else {
      const token = this.authService.generateAutoLoginToken(this.currentUser._id, 'seller').then((resp) => {
        if(resp.data.message == 'TOKEN_GENERATED'){
          if(resp.data.data)
          {
          
            let loginToken = resp.data.data.autoLoginToken;
            window.location.href = `${window.appConfig.sellerUrl}/auth/autologin/${loginToken}`;
          }
        }
      }).catch((err) => {
        this.util.setLoading(false);
        this.isLoading = false;
      });   
    }
  }


  showModal() {
    this.backdrop = true;
    this.Modal.nativeElement.style.display = "block";
    this.Modal.nativeElement.classList.add('show')

  }

  hideModal() {
    this.Modal.nativeElement.classList.remove('show');
    this.Modal.nativeElement.style.display = 'none';
    this.backdrop = false;

  }

  onChecked(event) {
    let value = event.target.value;
    if(value=== 'email') {
      this.showEmail = true;
    } else {
      this.showEmail = false;
    }
  }

  onSubmitModal(frm: NgForm) {
    if(!frm.valid) {
      return this.toasty.error('Please enter a valid Form');
    }

    let subscription;
    if(this.showEmail) {
      let email = frm.value.email;
      subscription = this.authService.generateTokenForSellerLogin({email: email})
        
    } else {
      let phone = frm.value.phone;
      subscription = this.authService.generateTokenForSellerLogin({phone: phone.e164Number})
    }

    subscription.then(response => {
      this.toasty.success('Link Send To Your Phone');
      this.hideModal();
      this.resetModal();
    })
    .catch(err => {
      this.toasty.error(err.data.data.message)
    })
  }


  public onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  
  resetModal() {
    this.credentials = {
      shopType: '',
      email: '',
      phone: ''
    }
  }
  
}
