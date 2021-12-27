import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class IpinfoService
{

  constructor(private httpClient:HttpClient) {}

  ngOnInit()
  {

  }

  getLocation()
  {
    let reqParams = new HttpParams();
    let url = "https://ipinfo.io/";
    reqParams = reqParams.append('token','token');
    return this.httpClient.get(url,{
      params:reqParams,
      responseType:'json'
    })
    .pipe(
        map((data:{[key:string]:any})=>
        {
          let address:Address= new Address();
          address.location.latitude =data.loc.split(",")[0];
          address.location.longitude =data.loc.split(",")[1];
          address.city = data.city;
          address.state = data.region;
          address.country = data.country;
          return address;
        }
        ));
    }

}
