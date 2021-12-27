import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  autocomplete:Subject<{city:string,state:string}[]>;
  service:google.maps.places.AutocompleteService;
  constructor(private mapsAPILoader: MapsAPILoader) {
    this.autocomplete = new Subject();
    this.mapsAPILoader.load().then(() => {
      this.service = new google.maps.places.AutocompleteService();
    });
   }

   displaySuggestions(
    predictions: google.maps.places.QueryAutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus)
    {
      if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
        console.log("Places service failed");
        return;
    }
    let preds:{city:string,state:string}[] = [];
    predictions.forEach((prediction) => preds.push({city:prediction.terms[0].value,state:prediction.terms[1].value}));
    this.autocomplete.next(preds);
  };

  getPredictions(key:string)
  {

    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    let params = new HttpParams();
    params = params.append('key','key');
    params = params.append('components','country:us')
    params = params.append('input',key);
    params = params.append('types','(cities)');
    this.service.getPlacePredictions({ input: key,
              componentRestrictions:{country:"us"},
              types:["(cities)"]
              },
              this.displaySuggestions.bind(this));
    // return this.http.get(url,{params:params,responseType:'json'}).pipe(
    //   map( (data:any)=>
    //   {
    //     let predictions:{city:string,state:string}[]=[];
    //     if(data.status!=="OK")
    //     {
    //       return predictions;
    //     }
    //     for(let obj of data.predictions)
    //     {
    //       predictions.push({city:obj.terms[0].value,state:obj.terms[1].value});
    //     }
    //     return predictions;
    //   }

    // ));
  }

}
