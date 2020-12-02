import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BannerService } from './service';
import { ProductService } from '../product/services';
import { UtilService } from './../shared/services/utils.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.html'
})
export class BannerComponent implements OnInit {
  @Input() position: any = 'default';
  @Output() updateFields = new EventEmitter();
  public bannerStyle: any = {};
  public banners: any = [];
  public isLoading = false;
  public items: any = [];
  public data: any = [];
  public keyword = 'name';
  //public item_list: any = [];

  public slideConfig: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  public searchFields: any = {
    q: '',
    transactiontypeId:''
  };

  constructor(private service: BannerService, 
    private productService: ProductService,
    private util: UtilService,
    private router: Router,
    private route: ActivatedRoute) {

      /*this.route.queryParamMap.subscribe((params: Params) => {
        if (params.params.transactiontypeId) {
            this.searchFields = {
              q: '',
              transactiontypeId:''
            };
          this.searchFields = Object.assign(this.searchFields, params.params);
        }else {
          this.searchFields = {
            q: '',
            transactiontypeId:'',
          };
          //this.query();
        }
      });*/
  }

  ngOnInit() {
    this.service.random({
      take: 5,
      position: this.position
    })
      .then(resp => {
        if (resp.data.length) {
          this.banners = resp.data.map(item => {
            return {
              imageUrl: item.media ? item.media.fileUrl : '/assets/images/banner.jpg',
              link: item.link ? item.link : '#'
            };
          });
        } else {
          this.banners = [{
            imageUrl: '/assets/images/banner.jpg'
          }];
        }
      });
  }

  selectEvent(item) {
    //this.router.navigate(['products/', item.alias]);
    this.productService.searchFields['q'] = encodeURIComponent(item.name);
    this.updateFields.emit(this.productService.searchFields);
  }
 
  onChangeSearch(val: string) {

    this.productService.searchFields['q'] = encodeURIComponent(val);
    // this.updateFields.emit(this.searchFields);
    this.query();
  }

  keypressEvent(event){
    if(event.keyCode == 13){
      this.submitSearch();
    }
  }
  
  onFocused(e){
    // do something when input is focused
  }

  submitSearch(){
    // do something when input is focused
    this.updateFields.emit(this.productService.searchFields);
    this.query();
  }

  query(){

    const params = Object.assign({
      //q: this.q
    }, this.productService.searchFields);

    this.productService.search(params).then((res) => {
      this.items = res.data.items;
      this.util.setLoading(false);
      this.isLoading = false;
      
      this.data = {'id':'', 'name': this.productService.searchFields.q, "alias":''}
      this.data = Object.keys(this.items).map(key => {
        let data = {};
        data = {'id': this.items[key].id, "name":this.items[key].name, "alias": this.items[key].alias};
        return data;
      });
    }).catch(() => {
        this.util.setLoading(false);
        this.isLoading = false;
    });

  }
}
