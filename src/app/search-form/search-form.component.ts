import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import {WeatherService} from '../services/weather.service';
import { Address } from '../models/address.model';
import { GeoCodingService } from '../services/geocoding.service';
import { IpinfoService } from '../services/ipinfo.service';
import { Location } from '../models/location.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutocompleteService } from '../services/autocomplete.service';

@Component({
  selector: 'app-search-form-component',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  address:Address;
  weatherData:any={};
  @Output() submitForm:EventEmitter<Address>;
  @Output() error:EventEmitter<boolean>;
  @Output() clear:EventEmitter<boolean>;
  @ViewChild('submitBtn') submitBtn:HTMLButtonElement;
  cityStates: {city:string,state:string}[] = []
  filteredCities: Observable<string[]>;

  states:{short:string,full:string}[] = [
    {short:'AL',full:'Alabama'},
    {short:'AK',full:'Alaska'},
    {short:'AZ',full:'Arizona'},
    {short:'AR',full:'Arkansas'},
    {short:'CA',full:'California'},
    {short:'CO',full:'Colorado'},
    {short:'CT',full:'Connecticut'},
    {short:'DE',full:'Delaware'},
    {short:'DC',full:'District Of Columbia'},
    {short:'FL',full:'Florida'},
    {short:'GA',full:'Georgia'},
    {short:'HI',full:'Hawaii'},
    {short:'ID',full:'Idaho'},
    {short:'IL',full:'Illinois'},
    {short:'IN',full:'Indiana'},
    {short:'IA',full:'Iowa'},
    {short:'KS',full:'Kansas'},
    {short:'KY',full:'Kentucky'},
    {short:'LA',full:'Louisiana'},
    {short:'ME',full:'Maine'},
    {short:'MD',full:'Maryland'},
    {short:'MA',full:'Massachusetts'},
    {short:'MI',full:'Michigan'},
    {short:'MN',full:'Minnesota'},
    {short:'MS',full:'Mississippi'},
    {short:'MO',full:'Missouri'},
    {short:'MT',full:'Montana'},
    {short:'NE',full:'Nebraska'},
    {short:'NV',full:'Nevada'},
    {short:'NH',full:'New Hampshire'},
    {short:'NJ',full:'New Jersey'},
    {short:'NM',full:'New Mexico'},
    {short:'NY',full:'New York'},
    {short:'NC',full:'North Carolina'},
    {short:'ND',full:'North Dakota'},
    {short:'OH',full:'Ohio'},
    {short:'OK',full:'Oklahoma'},
    {short:'OR',full:'Oregon'},
    {short:'PA',full:'Pennsylvania'},
    {short:'RI',full:'Rhode Island'},
    {short:'SC',full:'South Carolina'},
    {short:'SD',full:'South Dakota'},
    {short:'TN',full:'Tennessee'},
    {short:'TX',full:'Texas'},
    {short:'UT',full:'Utah'},
    {short:'VT',full:'Vermont'},
    {short:'VA',full:'Virginia'},
    {short:'WA',full:'Washington'},
    {short:'WV',full:'West Virginia'},
    {short:'WI',full:'Wisconsin'},
    {short:'WY',full:'Wyoming'}
    ];

    searchForm:FormGroup;
    autodetect = false;


    constructor(private fb:FormBuilder,
      private weatherService:WeatherService,
      private geoCodingService:GeoCodingService,
      private ipinfoService:IpinfoService,
      private autocompleteService:AutocompleteService) {
      this.searchForm = fb.group({
        street : [null,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        city : [null,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        state : [null,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        autodetect : [null]
      });
      this.submitForm = new EventEmitter<Address>();
      this.address = new Address();
      this.error = new EventEmitter<boolean>();
      this.clear = new EventEmitter<boolean>();

     }



     ngOnInit(): void {

        this.autocompleteService.autocomplete.subscribe({
          next:data=>
          {
            this.cityStates = data;
          }
        });
        this.searchForm.controls['city'].valueChanges.subscribe(
        {
          next : enteredData=>
          {
            if(!enteredData || enteredData.trim()==='')
              this.cityStates = []
            else this.autocompleteService.getPredictions(enteredData);
          }
        }
        );
        // pipe(
        // startWith(''),
        // map(value => this._filter(value)),);
    }

    // private _filter(value: string): string[] {
    //   const filterValue = this._normalizeValue(value);
    //   return this.cities.filter(city => this._normalizeValue(city).includes(filterValue));
    // }

    // private _normalizeValue(value: string): string {
    //   if(value)
    //     return value.toString().toLowerCase().replace(/\s/g, '');
    //   else return '';
    // }


    onAutoDetectChange()
    {
      this.autodetect = (this.autodetect===true?false:true);

      if(this.autodetect)
      {
        this.searchForm.controls['city'].disable();
        this.searchForm.controls['state'].disable();
        this.searchForm.controls['street'].disable();
        this.submitBtn.disabled = true;
        this.ipinfoService.getLocation().subscribe(
          (data)=>
          {
            this.address = data;
            this.submitBtn.disabled = false;
          },
          (error)=>
          {
            this.error.emit(true);
            console.log("Error in search form for autodetection");
          }
        )
      }
      else
      {
        this.searchForm.controls['city'].enable();
        this.searchForm.controls['state'].enable();
        this.searchForm.controls['street'].enable();
      }

    }




    onCitySelected(event:MatAutocompleteSelectedEvent )
    {

    }
    onSubmit(event:Event)
    {
      event.preventDefault();
      if(this.autodetect)
      {
        this.ipinfoService.getLocation().subscribe(
          (data)=>
          {
            this.address = data;
            this.submitRequest();
          },
          (error)=>
          {
            this.error.emit(true);
            console.log("Error in search form for autodetection");
          }
        )

      }
      else
      {
        this.address.street = (this.searchForm.controls['street'].value);
        this.address.city = (this.searchForm.controls['city'].value);
        this.address.state = (this.searchForm.controls['state'].value);
        this.geoCodingService.getLocation(this.address).subscribe(data=>
          {
            this.address.location = data;
            this.submitRequest();
          },
          error=>
          {
              console.log("Error in geocoding service "+error);
              this.error.emit(true);
          })

      }

    }


    submitRequest()
    {
      this.submitForm.emit(this.address);
    }

    onClear()
    {
      this.searchForm.reset();
      this.searchForm.controls['city'].enable();
      this.searchForm.controls['state'].enable();
      this.searchForm.controls['street'].enable();
      this.autodetect = false;
      this.clear.emit(true);
    }



}
