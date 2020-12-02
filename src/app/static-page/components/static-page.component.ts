import { UtilService } from './../../shared/services/utils.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { StaticPageService } from '../services/static-page.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'static-page',
  templateUrl: './view.html'
})
export class StaticPageComponent {
  public page: any = {};

  constructor(private translate: TranslateService, private util: UtilService,
     private route: ActivatedRoute, private toasty: ToastyService, private staticpageService: StaticPageService) {
    this.route.params.subscribe(data => {
      this.util.setLoading(true);
      this.staticpageService.find(data.alias).then((res) => {
        this.util.setLoading(false);
        this.page = res.data;
      })
        .catch(() => {
          this.util.setLoading(false);
          this.toasty.error(this.translate.instant('Something went wrong, please try again!'));
        });
    });

  }

}
