import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComplainComponent } from '../../../shared/complain/complain.component';

@Component({
  selector: 'profile-sliderbar',
  templateUrl: './sliderbar.html'
})
export class ProfileSliderBarComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  complain() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(ComplainComponent, ngbModalOptions);
  }
}
