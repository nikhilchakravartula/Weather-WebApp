import { Component, OnInit,Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import  *  as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import { HourlyValues } from '../models/weather.model';
more(Highcharts);
@Component({
  selector: 'app-hourly-meteogram',
  templateUrl: './hourly-meteogram.component.html',
  styleUrls: ['./hourly-meteogram.component.css']
})
export class HourlyMeteogramComponent implements OnInit {

  @Input('hourlyTempData') weatherData:HourlyValues[];
  humidity:{x:number,y:number}[] = [];
  winds:{x:number,value:number,direction:number}[] = [];
  temperatures:{x:number,y:number}[] = [];
  pressures:{x:number,y:number}[] = [];
  Highcharts:typeof Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { }

  loadData() {

    // Loop over hourly (or 6-hourly) forecasts
    Array.from(this.weatherData).forEach((node, i) => {
        let date = new Date(node.startTime)
        //Subtract UTC time
        const x = date.getTime()-date.getTimezoneOffset()*60*1000
        //const x = Date.parse(node.startTime);
        this.temperatures.push({
            x,
            y: Math.round(node.temperature)
        });

        this.humidity.push({
            x,
            y: Math.round(node.humidity)
        });

        if (i % 2 === 0) {
            this.winds.push({
                x,
                value:Math.round(node.windSpeed),
                direction: node.windDirection
            });
        }

        this.pressures.push({
            x,
            y: Math.round(node.pressureSeaLevel)
        });
    });
    // Create the chart when the data is loaded
};


  ngOnInit(): void {


    this.loadData();
    this.Highcharts = Highcharts;
    this.chartOptions = {
      chart: {
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 310,
      alignTicks: false,
      scrollablePlotArea: {
          minWidth: 720
      }
  },

  // defs: {
  //     patterns: [{
  //         id: 'precipitation-error',
  //         path: {
  //             d: [
  //                 'M', 3.3, 0, 'L', -6.7, 10,
  //                 'M', 6.7, 0, 'L', -3.3, 10,
  //                 'M', 10, 0, 'L', 0, 10,
  //                 'M', 13.3, 0, 'L', 3.3, 10,
  //                 'M', 16.7, 0, 'L', 6.7, 10
  //             ].join(' '),
  //             stroke: '#68CFE8',
  //             strokeWidth: 1
  //         }
  //     }]
  // },

  title: {
      text: 'Hourly Weather (For Next 5 Days)',
      align: 'center',
      style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
      }
  },

  credits: {
      text: 'Forecast',
      position: {
          x: -40
      }
  },

  tooltip: {
      shared: true,
      useHTML: true,
  },

  xAxis: [{ // Bottom X axis
      type: 'datetime',
      tickInterval: 2 * 36e5, // two hours
      minorTickInterval: 36e5, // one hour
      tickLength: 0,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      offset: 30,
      showLastLabel: true,
      labels: {
          format: '{value:%H}'
      },
      crosshair: true
  }, { // Top X axis
      linkedTo: 0,
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
      labels: {
          format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
          align: 'left',
          x: 3,
          y: -5
      },
      opposite: true,
      tickLength: 20,
      gridLineWidth: 1
  }],

  yAxis: [
      { // temperature axis
      title: {
          text: null
      },
      labels: {
          format: '{value}°',
          style: {
              fontSize: '10px'

          },
          x: -3
      },
      plotLines: [{ // zero plane
          value: 0,
          color: '#BBBBBB',
          width: 1,
          zIndex: 2
      }],
      maxPadding: 0.3,
      minRange: 8,
      tickInterval: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)'

  },
     { // humidity axis
      title: {
          text: null
      },
      labels: {
          enabled: false
      },
      gridLineWidth: 0,
      tickLength: 0,
      minRange: 10,
      min: 0

  }, { // Air pressure
      allowDecimals: false,

      title: { // Title on top of axis
          text: 'inHg',
          offset: 0,
          align: 'high',
          rotation: 0,
          style: {
              fontSize: '10px',
             color:'#faab20'
          },
          textAlign: 'left',
          x: 3
      },
      labels: {
          style: {
              fontSize: '8px',
     color:'#faab20'
          },
          y: 2,
          x: 3
      },
      gridLineWidth: 0,
      opposite: true,
      showLastLabel: false
  }],

  legend: {
      enabled: false
  },

  plotOptions: {
      series: {
          pointPlacement: 'between'
      }
  },


  series: [{
      name: 'Temperature',
      // allowDecimals:false,
      data: this.temperatures,
      type: 'spline',
      clip:false,
      marker: {
          enabled: false,
          states: {
              hover: {
                  enabled: true
              }
          }
      },
      tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
              '{series.name}: <b>{point.y}°F</b><br/>'
      },
      zIndex: 1,
      color: '#FF3333',
      negativeColor: '#48AFE8'
  },
  {
      name: 'Humidity',
      // allowDecimals:false,
      data: this.humidity,
      type: 'column',
      color: '#68CFE8',
      yAxis: 1,
      groupPadding: 0,
      pointPadding: 0,
      grouping: false,
      dataLabels: {
          enabled: true,
          filter: {
              operator: '>',
              property: 'y',
              value: 0
          },
          style: {
              fontSize: '8px',
              color: 'gray'
          }
      },
      tooltip: {
          valueSuffix: ' %'
      }
  },
  {
      name: 'Air pressure',
      type:'line',
      // allowDecimals:false,
      color: '#faab20',
      data: this.pressures,
      marker: {
          enabled: false
      },
      // shadow: false,
      tooltip: {
          valueSuffix: ' inHg'
      },
      dashStyle: 'ShortDot',
      yAxis: 2
  }, {
      name: 'Wind',
      type: 'windbarb',
      id: 'windbarbs',
      // allowDecimals:false,
      // color: Highcharts.getOptions().colors[1],
      color: '#FF3333',
      lineWidth: 1,
      data: this.winds,
      vectorLength: 10,
      yOffset: -15,
      xOffset:-1.75,
      tooltip: {
          valueSuffix: ' mph'
      }
  }]
  };

  }

}
