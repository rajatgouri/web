import { UtilService } from './../../../shared/services/utils.service';
import { Component, Input, OnChanges } from '@angular/core';
import { ProductService } from '../../services';
import * as _ from 'lodash';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.html'
})
export class FeaturedProductsComponent implements OnChanges {
  @Input() options: any = '';
  public items: any = [];
  public page: any = 1;
  public itemsPerPage: any = 8;
  public searchFields: any = {};
  public sort: any = 'random';
  public sortType: any = '';
  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    arrows: true,
    autoplay: false,
    nextArrow: '<div class="next-1"><i class="fa fa fa-arrow-circle-o-right"></i></div>',
    prevArrow: '<div class="prev-1"><i class="fa fa fa-arrow-circle-o-left"></i></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  constructor(private util: UtilService, private productService: ProductService) { }


  ngOnChanges() {
    this.query();
  }

  query() {
    if (this.options.productId) {
      this.relatedQuery();
    } else {
      this.featuredQuery();
    }
  }

  featuredQuery() {
    this.util.setLoading(true);
    const params = Object.assign({
      page: this.page,
      take: this.itemsPerPage,
      sort: this.sort,
      sortType: this.sortType
    }, this.options);

    this.productService.search(params).then((res) => {
      this.items = res.data.items;
      this.util.setLoading(false);
    }).catch(() => this.util.setLoading(false));
  }

  relatedQuery() {
    this.util.setLoading(true);
    const params = {
      page: this.page,
      take: this.itemsPerPage
    };

    this.productService.related(this.options.productId, params).then((res) => {
      this.items = [];
      this.items = res.data;
      this.util.setLoading(false);
    }).catch(() => this.util.setLoading(false));
  }
}
