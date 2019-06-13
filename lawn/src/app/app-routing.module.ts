import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import{RegisterComponent} from './register/register.component';
import { LawnComponent } from './lawn/lawn.component';
import {AuthGuard} from './guard/auth.guard';
import { WelcomeComponent} from './welcome/welcome.component';
import {TemperatureComponent} from './temperature/temperature.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path : 'addlawn', component : LawnComponent, canActivate:[AuthGuard]},
  {path :'dashboard' , component: WelcomeComponent, canActivate:[AuthGuard]},
  { path:'temp/:lat/:lng/:address', component: TemperatureComponent,canActivate:[AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
