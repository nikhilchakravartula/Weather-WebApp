import { Component, OnInit,Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import  *  as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import  windbarb  from 'highcharts/modules/windbarb';
import { DailyValues } from '../models/weather.model';
more(Highcharts);
windbarb(Highcharts);



@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.css']
})
export class DailyTempChartComponent implements OnInit {

  @Input('dailyTempChartData') weatherData:DailyValues[];
  Highcharts:typeof Highcharts;
  chartOptions: Highcharts.Options;
  data:any[]=[];
  constructor(private weatherService:WeatherService) { }

  ngOnInit(): void {
    this.Highcharts = Highcharts;

    for (let dayData of this.weatherData)
    {
      let dataRow = []
      dataRow.push(Math.round(new Date(dayData.startTime).getTime()));
      dataRow.push(dayData.temperatureMin);
      dataRow.push(dayData.temperatureMax)
      this.data.push(dataRow);
    }

    this.chartOptions = {
      chart: {
        type: 'arearange',
        zoomType: 'x',
        scrollablePlotArea: {
            scrollPositionX: 1
        }
    },
    title: {
        text: 'Temperature Ranges (Min, Max)'
    },

    xAxis: {
        type: 'datetime',
        labels: {
            step: 1
        },
        tickInterval:1000 * 60 * 60 * 24
    },

    yAxis: {
        title: {
            text: null
        }
    },

    tooltip: {
        // crosshairs: true,
        shared: true,
        valueSuffix: '°F',
        xDateFormat: '%A, %b %e'
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Temperatures',
        data: this.data,
        type: 'arearange',
    }],
    plotOptions: {
        arearange: {

            fillColor: {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#faab20'],
                    [1, '#d1d9dd']
                ]
            }
        },
        series: {
            // lineColor: '#faab20',
            lineWidth: 1
        }
    },
    responsive: {
      rules: [{
          condition: {
              maxWidth: 700
          },
          chartOptions: {
            xAxis: {
              type: 'datetime',
              labels: {
                  step: 1
              },
              tickInterval:1000 * 60 * 60 * 24 * 2
          }
          }
      }]
  }

    }
  }

}
