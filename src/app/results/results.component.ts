import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weather,HourlyValues,DailyValues } from '../models/weather.model';
import { DetailsPaneService } from '../services/details-pane.service';
import { StorageService } from '../services/storage.service';

class COLORS
{
  static YELLOW:string= 'yellow';
  static WHITE:string = 'white';
}
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input('data') weatherData:Weather;
  @Input('detailsPaneRowId') detailsPaneRowId:number;
  @Output() detailsClick:EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor(private storageService:StorageService,
    private detailsPaneService:DetailsPaneService){}
  starStyle = '';
  ngOnInit(): void {

    if(this.storageService.isFavorite(this.weatherData.address.city,this.weatherData.address.state))
    {
      this.starStyle ='favorite';
    }
  }

  toggleFavorites(event:Event)
  {
    event.preventDefault();
    if(this.storageService.isFavorite(this.weatherData.address.city,this.weatherData.address.state))
    {
      this.storageService.remove(this.weatherData.address.city,this.weatherData.address.state);
      this.starStyle='';
      return;
    }

    this.storageService.add(this.weatherData.address);
    this.starStyle='favorite';
  }

  onDetailsClick()
  {
    // this.detailsClick.emit(true);
    this.detailsPaneService.showDetailsPaneIn.next(this.detailsPaneRowId);
  }
}
