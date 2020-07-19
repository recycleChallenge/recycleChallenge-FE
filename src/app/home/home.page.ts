import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  signupForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      fileSource: new FormControl(null, Validators.required),
    });
    this.loginForm = new FormGroup({
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    // this.setUser();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.patchValue({
        fileSource: file
      });
    }
  }

  setUser() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!!session) {
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
      })
    }
  }

  ionViewDidEnter() {
    this.setUser();
  }

  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  estimate() {
    this.router.navigate(['/recycle-estimate'])
  }

  close() {
    this.modalRef.hide();
    this.router.navigate(['/recycle-add']);
  }

  goToMyinfo() {
    this.router.navigate(['/myinfo'])
  }

  goToStatics() {
    this.router.navigate(['/statics'])
  }

  openLogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openSignup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  login() {
    const { mail, password } = this.loginForm.value;
    this.authService.login(mail, password).subscribe(resp => {
      if (resp) {
        this.modalRef.hide();
        const session = JSON.stringify({ mail, password })
        localStorage.setItem('session', session);
        this.authService.getCurrentUser().subscribe(resp => {
          this.user = resp;
          alert(`반갑습니다 ${resp.name}님!`);
        })
      } else {
        alert('계정정보가 올바르지 않습니다.')
      }
    })
  }

  signUp() {
    const { name, mail, password, fileSource } = this.signupForm.value;
    const formData = new FormData();
    formData.append('userId', `${0}`)
    formData.append('point', `${0}`)
    formData.append('name', name)
    formData.append('mail', mail)
    formData.append('password', password)
    formData.append('image', fileSource)

    this.authService.signup(formData).subscribe(resp => {
      alert(`반갑습니다 ${resp.name}님!`);
      this.modalRef.hide();
      this.authService.login(resp.mail, resp.password).subscribe(resp => {
        const session = JSON.stringify({ mail, password })
        localStorage.setItem('session', session);
        this.authService.getCurrentUser().subscribe(resp => {
          this.user = resp;
        })
      });
    })
  }
}
