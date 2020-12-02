import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'dial-code',
  templateUrl: './dial.html'
})
export class DialCodeComponent implements OnInit {
  @Output() selectCode = new EventEmitter();

  public dialCodes: any = [];
  public dialCode: any = '+1';
  public flag: string = '/assets/images/flags/us.svg';

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
  }
  selectDial(dial: any) {
    this.dialCode = dial.dialCode;
    this.selectCode.emit(this.dialCode);
    this.flag = `/assets/images/flags/${dial.code.toLowerCase()}.svg`;
  }
}
