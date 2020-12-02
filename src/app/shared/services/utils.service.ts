import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public data = new Subject<any>();
  public data$ = this.data.asObservable();

  public emptySearchbar = new Subject<any>();
  public showRegister = new Subject<any>();
  public showLogin = new Subject<any>();
  public changesDetect = new Subject<any>();  

  private appLoading = new Subject<any>();
  public appLoading$ = this.appLoading.asObservable();


  constructor() { }

  setLoading(loading: boolean) {
    this.appLoading.next(loading);
  }


  setData(dataeve : any){
    this.data.next(dataeve);
  }


}
