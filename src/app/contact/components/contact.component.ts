import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ContactService } from '../services/contact.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contact-page',
  templateUrl: './contact.html'
})
export class ContactComponent implements OnInit {
  public submitted: boolean = false;
  public contact: any = {
    name: '',
    email: '',
    message: ''
  };
  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute, private toasty: ToastyService, private contactService: ContactService) { }

  ngOnInit() { }

  submit(frm: any) {
    this.submitted = true;
    if (frm.invalid) {
      return;
    }

    this.contactService.create(this.contact)
      .then(() => {
        this.toasty.success(this.translate.instant('Your message has been sent. Our admin will contact with you ASAP.'));
        this.router.navigate(['/']);
      })
      .catch(() => this.toasty.error(this.translate.instant('Something went wrong, please check and try again!')));
  }
}