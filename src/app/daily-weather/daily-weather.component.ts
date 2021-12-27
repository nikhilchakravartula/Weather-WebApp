import { Component, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WEATHER_STATUS,DAYS,MONTHS } from '../app.constants';
import { DailyValues } from '../models/weather.model';
import { DetailsPaneService } from '../services/details-pane.service';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {


  @Input('dailyWeatherData') weatherData:DailyValues[];

  constructor(private weatherService:WeatherService,private detailsPaneService:DetailsPaneService) {

   }

  ngOnInit(): void {

  }

  dateToStr(date:Date)
  {
   return DAYS[date.getDay()]+", "+('0' + date.getDate()).slice(-2)  + " "+MONTHS[date.getMonth()] + " "+date.getFullYear();
  }
  getStatusTitle(weatherCode:number):string
  {
    return WEATHER_STATUS[weatherCode].title;
  }
  getStatusImage(weatherCode:number):string
  {
    return WEATHER_STATUS[weatherCode].src;
  }
  onClickDetailsPane(event:Event,rowid:number)
  {
    event.preventDefault();
    this.detailsPaneService.showDetailsPaneIn.next(rowid);
  }
}
