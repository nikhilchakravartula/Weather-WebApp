import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Weather,HourlyValues,DailyValues } from '../models/weather.model';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http:HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  getWeatherData(address:Address)
  {
    let reqParams = new HttpParams();
    reqParams = reqParams.append('latitude',address.location.latitude);
    reqParams = reqParams.append('longitude',address.location.longitude);

    return this.http.get('/weather',{
      params:reqParams,
      responseType:'json'
    }).pipe(
      map( (data:{[key:string]:any})=>
      {

        if(data.code)
        {
          throw new Error("Resource exhausted");
        }
        let weatherData = new Weather();
        weatherData.address = address;
        for(let rawHourlyValues of data.hourly.data.timelines[0].intervals)
        {
          let hourlyValues= new HourlyValues()
          Object.assign(hourlyValues,rawHourlyValues.values);
          hourlyValues.startTime = new Date(rawHourlyValues.startTime);
          weatherData.hourlyValues.push(hourlyValues);
        }

        for(let rawDailyValues of data.daily.data.timelines[0].intervals)
        {
          let dailyValues= new DailyValues();
          Object.assign(dailyValues,rawDailyValues.values);
          dailyValues.startTime = new Date(rawDailyValues.startTime);
          dailyValues.sunriseTime = new Date(dailyValues.sunriseTime);
          dailyValues.sunsetTime = new Date(dailyValues.sunsetTime);
          weatherData.dailyValues.push(dailyValues);
        }

        return weatherData;

      })
      );
  }
}


