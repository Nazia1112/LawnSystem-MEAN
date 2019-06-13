import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LawnComponent } from './lawn/lawn.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { AuthGuard } from './guard/auth.guard';
import {ServiceService} from './service/lawnService.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    LawnComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    HttpModule,
  
  ],
  providers: [
    AuthGuard,
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
