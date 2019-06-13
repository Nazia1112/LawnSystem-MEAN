import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '@angular/router';

import { ViewChild, ElementRef, NgZone, } from '@angular/core';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../service/lawnService.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  response: User;

  registerForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    username: [''],
    address: [''],
    password: [''],
    phone: [''],
    email: ['']
  })

  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  lat: number = -33.785809;
  lng: number = 151.121195;
  mapType = 'satellite';

  constructor(private fb: FormBuilder,
    private service: ServiceService,
    private router: Router, private ngZone: NgZone) { }

  public handleAddressChange(address: Address) {
   
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
  }

  changeAddress(event) {
    console.log(event.target.value);
    this.registerForm.patchValue({
      address: event.target.value
    })
  }

  ngOnInit() {
  }

  registerData() {
    this.service.addUser(this.registerForm.value).subscribe(res => {
    this.response = res;
      if (res.statusCode == 200) {
        alert("Succefully Register");
        //this.router.navigateByUrl('addlawn');
      }
    });
    this.registerForm.reset({
      firstname: '',
      lastname: '',
      username: '',
      address: '',
      password: '',
      phone: '',
      email: ''
    });

  }

  login() {
    this.router.navigate(['/login'])
  }


}


