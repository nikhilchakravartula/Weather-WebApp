import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { map } from 'rxjs/operators';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class GeoCodingService
{

  constructor(private httpClient:HttpClient) {}

  ngOnInit()
  {

  }

  getLocation(address:Address)
  {
    let reqParams = new HttpParams();
    let url = "https://maps.googleapis.com/maps/api/geocode/json";
    reqParams = reqParams.append('address',address.street+address.city+address.state);
    reqParams = reqParams.append('key','key');

    return this.httpClient.get
    (
      url,
      {params:reqParams,responseType:'json'}
    ).pipe
    (
        map(
        (data:{[key:string]:any})=>
        {
          if(!data || !data.results)
          {
            throw new Error('Geo service failed. Data is invalid');
          }
          let location:Location= new Location();
          location.latitude = data.results[0].geometry.location.lat as string;
          location.longitude = data.results[0].geometry.location.lng as string;
          return location;
        }
        )
    );
  }

}
