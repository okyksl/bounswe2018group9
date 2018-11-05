import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import {LoadingController, NavController} from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private loadingController :LoadingController) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8)]]
      }
    );
  }

  ngOnInit() {
  }

  register() {
    this.presentLoading();
    this.authService.register(this.form.value,()=> this.loadingController.dismiss());
  }
  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
}
