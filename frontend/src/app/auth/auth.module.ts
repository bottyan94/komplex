import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './login/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
