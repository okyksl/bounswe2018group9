import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.page.html',
  styleUrls: ['./forgotPassword.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  forgotPassword(){
    this.authService.forgotPassword(this.form.value);
  }

}
