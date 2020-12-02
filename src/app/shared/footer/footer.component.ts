import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemService, AuthService } from '../services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
  public appConfig: any;
  public languages: any = [];
  public userLang: any = 'en';
  public sellerLink = '';
  public settings: any;

  constructor(private translate: TranslateService, private systemService: SystemService, private authService: AuthService) {
    this.appConfig = window.appConfig;

    systemService.configs().then(resp => {
      if (resp) {
        this.languages = resp.i18n.languages;
        this.userLang = resp.userLang;
      }
      this.settings = resp;
    });
    authService.userLoaded$.subscribe(() => this.updateSellerLink());
  }

  ngOnInit() {
    this.updateSellerLink();
  }

  // changeLang(lang: string) {
  //   this.systemService.setUserLang(lang);
  //   this.translate.use(lang);
  //   this.userLang = lang;
  // }

  updateSellerLink() {
    const accessToken = this.authService.getAccessToken();
    this.sellerLink = `${this.appConfig.sellerUrl}?access_token=${accessToken}`;
  }
}
