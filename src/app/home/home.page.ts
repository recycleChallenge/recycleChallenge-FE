import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  image: any;
  modalRef: BsModalRef;
  config = {
    animated: true,
  };

  constructor(
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  estimate() {
    this.router.navigate(['recycle-estimate'])
  }

  close() {
    this.modalRef.hide();
    this.router.navigate(['recycle-add']);
  }
}
