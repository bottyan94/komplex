import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './pages/base/base.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '',
    component: BaseComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
