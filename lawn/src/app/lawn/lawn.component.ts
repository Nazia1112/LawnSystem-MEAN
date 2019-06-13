import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { ServiceService } from '../service/lawnService.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.css']
})
export class LawnComponent implements OnInit {


  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  lat: number = -33.785809;
  lng: number = 151.121195;

  response = [];

  LawnForm = this.fb.group({
    lawnArea: '',
    lawnAddress: this.fb.group({
      value:'',
      lat:'',
      lng:''
    }),
    silty: '',
    grassType: ''
  })

  constructor(private fb: FormBuilder, private service: ServiceService, private router : Router) { }

  handleAddressChange(address: Address) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    this.LawnForm.patchValue({
      lawnAddress:{
        value: address.formatted_address,
        lng: address.geometry.location.lng(),
        lat: address.geometry.location.lat()
      }
    })
    // this.lng = address.geometry.location.lng();
    // this.lat = address.geometry.location.lat();
  }

  
  ngOnInit() {
    this.service.listUp().subscribe(res => { this.response = res.data; })
  }


  addLawn() {
    this.service.addLawn(this.LawnForm.value).subscribe(res => {
      ;
      if (res.status == 200) {
        console.log("Successfully added");
      }
    });
    this.service.listUp().subscribe(res => {
    this.response = res.data;
      console.log(this.response, "resd")
    })
    this.router.navigate(['dashboard'])
    // this.productService.getData().subscribe(res => this.response = res);

  }

  showList(){
    this.router.navigate(['/dashboard']);
  }

  logout()
  {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }



}
