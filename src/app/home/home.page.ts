import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../model/user';
import { AuthService } from './../services/auth.service';

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
  user: User;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
  }

  ionViewDidEnter() {
    this.setUser();
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
