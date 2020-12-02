import { Component, OnInit, Output, EventEmitter, AfterContentInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from '../../product/services';
import { ProducttransactiontypeService } from '../../product/services/producttransactiontype.service';
import {NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadScriptService } from '../services/lazyload.service';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.html'
})
export class SearchbarComponent implements OnInit{

  @Output() updateFields = new EventEmitter();
  public tree: any = [];
  public transactionType: any = [];
  public selectedCategory = 'Categories';
  public searchFields: any = {
    transactiontypeId:''
  };

  slideConfig = {
    "slidesToShow": 9, 
    "slidesToScroll": 1,
    "responsive": [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 9,
        }
      },

      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3
        }
      },
      
    ]
  };

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  constructor(public router: Router, 
    private categoryService: CategoryService,
    private producttransactiontypeService: ProducttransactiontypeService,
    private lazyLoadService: LazyLoadScriptService,
    private route: ActivatedRoute) { 

      this.producttransactiontypeService.findForDropdown()
      .then((resp) => {
          this.transactionType = resp.data;
      });  
    }

  ngOnInit() {
    this.categoryService.tree()
      .then(resp => {
        this.tree = resp
        this.setSelectedCategory();
      });
  }


  setSelectedCategory() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params.categoryId) {
        this.selectedCategory = this.tree.filter(t => t._id === params.categoryId )[0].name
      } else {
        this.selectedCategory = 'Categories';
      }
    })
  }
  search(item: any) {
    // nativate to search page
    this.selectedCategory = item.name;
    this.router.navigate(['/products/search'], {
      queryParams: { categoryId: item._id }
    });
  }


  changeTransactionType(transactiontypeId: any){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products/search'], {
      queryParams: { transactiontypeId: transactiontypeId }
    });
  }

  
}
