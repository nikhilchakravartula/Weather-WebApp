import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather.model';
import { DetailsPaneService } from './services/details-pane.service';
import { AnimationEvent} from '@angular/animations';
import { detailsAnimation,resultsAnimation } from './app.transitions';
import { Address } from './models/address.model';

class STATE
{
  static SEARCH:string = "SEARCH";
  static ERROR:string = "ERROR";
  static PROGRESS_BAR:string = 'PROGRESS_BAR';
  static RESULTS:string ='RESULTS';
  static DETAILS:string = 'DETAILS';
  static FAVORITES:string = 'FAVORITES';
}

class IDS
{
  static RESULTS = 0;
  static FAVORITES = 1;
  static ERROR = -2;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[detailsAnimation,resultsAnimation]
})
export class AppComponent {
  title = 'WeatherApp';
  state:string='';
  animationState='';
  detailsPaneRowId = -1;
  prevDetailsPaneRowId = -1;
  weatherData:Weather;
  showDetails:boolean;
  showResults:boolean;
  animationDisabled:boolean = true;
  activeId =IDS.RESULTS;
  constructor(private weatherService:WeatherService,private detailsPaneService:DetailsPaneService)
  {
    this.detailsPaneService.showDetailsPaneIn.subscribe((rowId:number)=>
      {

        this.prevDetailsPaneRowId = this.detailsPaneRowId;
        this.detailsPaneRowId = rowId;

        this.state=STATE.DETAILS;
        this.animationState = STATE.DETAILS;


      });
      this.showDetails= this.showResults = false;
  }

  onFavoriteClick(event:Address)
  {
    this.state = STATE.FAVORITES;
    this.onSubmit(event);

  }
  onSubmit(address:Address)
  {

    this.state= STATE.PROGRESS_BAR;
    this.activeId = IDS.RESULTS;
    this.showResults = this.showDetails = false;
    this.weatherService.getWeatherData(address).
    subscribe( (data:Weather)=>{
        this.weatherData = data;

        this.state=STATE.RESULTS;
        this.animationState = STATE.RESULTS;
        this.showResults = true;
        this.detailsPaneRowId = -1;
      },error=>
      {
        this.onError();
        console.log("App component subscribe error");
      });
  }

  onComingBack()
  {


    this.state = STATE.RESULTS;
    this.animationState  = STATE.RESULTS;


  }


  onResultsAnimationStart(event:AnimationEvent)
  {
    // if(event.fromState===STATE.RESULTS && event.toState===STATE.DETAILS)
    // {
    //   this.showDetails = true;
    // }
  }
  onResultsAnimationDone(event:AnimationEvent)
  {
    // this.animationDisabled = false;
    if(event.fromState===STATE.RESULTS && event.toState===STATE.DETAILS)
    {
      this.showResults = false;
      this.showDetails = true;
    }
    // else if(event.fromState===STATE.DETAILS && event.toState === STATE.RESULTS)
    // {
    //   this.show = 1;
    //   this.detailsPaneRowId = -1;
    // }
  }

  // onDetailsAnimationStart(event:AnimationEvent)
  // {

  //   if(event.fromState===STATE.RESULTS && event.toState === STATE.DETAILS)
  //   {
  //     this.showDetails=true;
  //     this.detailsPaneRowId = -1;
  //   }
  // }
  onDetailsAnimationDone(event:AnimationEvent)
  {
    // this.animationDisabled = false;
    // if(event.fromState===STATE.RESULTS && event.toState===STATE.DETAILS)
    // {
    //   this.show = 2;
    // }
    if(event.fromState===STATE.DETAILS && event.toState === STATE.RESULTS)
    {
      this.showResults = true;
      this.showDetails = false;
      this.animationState=STATE.RESULTS;
      // this.prevDetailsPaneRowId = this.detailsPaneRowId;
      // this.detailsPaneRowId = -1;
    }
  }

  onError()
  {

    this.state = STATE.ERROR;

  }

  onClear()
  {
    this.showResults=this.showDetails = false;
    this.activeId = IDS.RESULTS;
    this.state = STATE.SEARCH;
  }

  onDetailsClick()
  {

    this.showResults=false;
    this.showDetails=true;
  }
}
