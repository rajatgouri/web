import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { UtilService } from './services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spinner',
  template: `<div class="preloader" *ngIf="isSpinnerVisible">
    <div class="spinner">
      <img src="/assets/images/loading.gif">
    </div>
  </div>`,
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;
  private loadingSubscription: Subscription;

  constructor(private router: Router, private utilService: UtilService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSpinnerVisible = true;
      } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isSpinnerVisible = false;
      }
    }, () => {
      this.isSpinnerVisible = false;
    });

    this.loadingSubscription = this.utilService.appLoading$.subscribe(loading => this.isSpinnerVisible = loading);
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
    this.loadingSubscription.unsubscribe();
  }
}
