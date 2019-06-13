import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/lawnService.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  response = []
  constructor(private service : ServiceService, private router : Router) { }

  ngOnInit() {
    this.service.listUp().subscribe(res =>{
      console.log(res.data)
      this.response = res.data; 
    })
  }
  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }

  AddLawn(){
    this.router.navigate(['/addlawn'])
  }

  showtemp(){
    this.router.navigate(['/temp']);
  }

  deleteLawn(data) {
    // console.log(data);
    this.service.deleteLawn({ "_id": data }).subscribe((data) => {
      console.log(data);
      if (data['deleted']) {
        alert('Deleted');
        console.log(data.data,"hello");
        this.response = data.data;
      }
      else {
        alert('Error in Deletion');
      }
    });
  };


}
