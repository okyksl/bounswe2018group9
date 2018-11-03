import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { ForgotPasswordPage } from './pages/forgotPassword/forgotPassword.page';
import { ChangePasswordPage } from './pages/change-password/change-password.page';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninPage },
  { path: 'signup', component: SignupPage },
  { path: 'forgotPassword', component: ForgotPasswordPage  },
  { path: 'changePassword', component: ChangePasswordPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }