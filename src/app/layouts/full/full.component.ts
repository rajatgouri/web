import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../shared/services';


@Component({
  templateUrl: './full.component.html'
})
export class FullComponent implements OnInit {
  public isHome: boolean = false;
  datafield: any;
  constructor(private router: Router , private utilService: UtilService) {

  }

  ngOnInit() {
    this.isHome = this.router.url.indexOf('/home') > -1;

  }


  onUpdateFields(event){
    console.log(event);
    this.utilService.setData(event);
  }
}
