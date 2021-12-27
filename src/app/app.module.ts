import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form/search-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results/results.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { DailyTempChartComponent } from './daily-temp-chart/daily-temp-chart.component';
import { HourlyMeteogramComponent } from './hourly-meteogram/hourly-meteogram.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DetailsPaneComponent } from './details-pane/details-pane.component';
import { ErrorComponent } from './error/error.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsComponent,
    FavouritesComponent,
    DailyWeatherComponent,
    DailyTempChartComponent,
    HourlyMeteogramComponent,
    ProgressBarComponent,
    DetailsPaneComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'apiKey',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
