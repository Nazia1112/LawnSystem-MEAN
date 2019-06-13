import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Temp } from '../shared/temp';

// import { } from '@types/googlemaps';

import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/lawnService.service';
import { Precip } from '../shared/precip';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  lat: number = Number(this.router.snapshot.params.lat);
  lng: number = Number(this.router.snapshot.params.lng);
  value: String = this.router.snapshot.params.address;
  mapType = 'satellite';

  data: Temp[];
  pdata: Precip[];
  pmonth = [];
  precip = [];
  month = [];
  temp = [];
  chart = [];
  chart2 = [];

  constructor(private httpClient: HttpClient, private service: ServiceService,
    private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.tempChat();
    this.precipChart();
    

    var myLatLng = {lat: this.lat, lng: this.lng};
  
    var map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 10,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello There!'
    });

  }


  tempChat() {
    this.service.getTemp().subscribe((res) => {

      this.data = res[0].results;
      this.data.forEach(y => {
        this.month.push(y.month);
        this.temp.push(y.temp);
      });
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.temp,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  precipChart() {
    this.service.getPrecip().subscribe((res) => {

      this.pdata = res[0].results;
      this.pdata.forEach(y => {
        this.pmonth.push(y.month);
        this.precip.push(y.precip);
      });
      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.precip,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  back() {
    this.route.navigate(['/dashboard']);
  }

  logout() {
    window.localStorage.clear();
    this.route.navigate(['/login'])
  }


}


