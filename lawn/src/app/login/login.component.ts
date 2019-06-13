import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service/lawnService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Logindata = this.fb.group({
    "username": ['', [Validators.required]],
    "password": ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ServiceService) { }

  ngOnInit() {
  }

  login() {

    this.service.loginUser(this.Logindata.value).subscribe((res) => {
      console.log(res);

      if (res.status == 200) {
        window.localStorage.setItem('key', res.token);
        this.router.navigateByUrl('dashboard');
      }

    })
  }


  register() {
    this.router.navigate(['/register']);
  }

}
