import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'feed', loadChildren: './events/events.module#EventsModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
