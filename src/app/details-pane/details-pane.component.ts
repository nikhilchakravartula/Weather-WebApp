
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DailyValues } from '../models/weather.model';
import { DAYS,MONTHS,WEATHER_STATUS } from '../app.constants';
import { OutputEmitter } from '@angular/compiler/src/output/abstract_emitter';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Address } from '../models/address.model';
import {} from 'googlemaps';
// import { ScriptService } from '../services/script.service';
@Component({
  selector: 'app-details-pane',
  templateUrl: './details-pane.component.html',
  styleUrls: ['./details-pane.component.css']

})
export class DetailsPaneComponent implements OnInit {

  @Input('data') dayData:DailyValues;
  @Input('address') address:Address;
  @Output('goBack') goBack:EventEmitter<boolean>;
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  title:string = '';
  weatherStatus = ''
  tweet_msg = '';
  lat:number;
  lng:number;
  constructor() {
    this.goBack = new EventEmitter<boolean>();
  }

  ngOnInit(): void
  {

    this.title = DAYS[this.dayData.startTime.getDay()]+", "+ ('0' + this.dayData.startTime.getDate()).slice(-2) + " "+MONTHS[this.dayData.startTime.getMonth()] + " "+this.dayData.startTime.getFullYear();
    this.weatherStatus = WEATHER_STATUS[this.dayData.weatherCode].title;
    let street ='';
    this.lat = parseFloat(this.address.location.latitude);
    this.lng = parseFloat(this.address.location.longitude);
    if(this.address.street)
    {
      street = this.address.street+", ";
    }
    else
    {
      street='';
    }
    this.tweet_msg = "https://twitter.com/intent/tweet?text="+encodeURIComponent("The temperature in "+
                    street+
                    this.address.city+", "+
                    this.address.state+
                    " on "+
                    this.title+
                    " is "+
                    this.dayData.temperature+"°F and the conditions are "+
                    this.weatherStatus)+"&hashtags=CSCI571WeatherForecast";


  }
  // Initialize and add the map
  initMap(): void {
    let lat:number = parseFloat(this.address.location.latitude);
    let long:number = parseFloat(this.address.location.longitude);
    const mapProperties = {
      center: new google.maps.LatLng(lat,long),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
     const marker = new google.maps.Marker({
      position: {lat:lat,lng:long},
      map: this.map,
    });
}

  onGoBack()
  {
    this.goBack.emit(true);
  }
}
