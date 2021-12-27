export const WEATHER_STATUS:{[key:number]:{title:string,src:string}}={
  '1000':{title:'Clear',src:'/assets/images/weather_symbols/clear_day.svg'},
  '1100':{title:'Mostly Clear',src:'/assets/images/weather_symbols/mostly_clear_day.svg'},
  '1101':{title:'Partly Cloudy',src:'/assets/images/weather_symbols/partly_cloudy_day.svg'},
  '1102':{title:'Mostly Cloudy',src:'/assets/images/weather_symbols/mostly_cloudy.svg'},
  '1001':{title:'Cloudy',src:'/assets/images/weather_symbols/cloudy.svg'},
  '2000':{title:'Fog',src:'/assets/images/weather_symbols/fog.svg'},
  '2100':{title:'Light Fog',src:'/assets/images/weather_symbols/fog_light.svg'},
  '8000':{title:'Thunderstorm',src:'/assets/images/weather_symbols/tstorm.svg'},
  '5001':{title:'Flurries',src:'/assets/images/weather_symbols/flurries.svg'},
  '5100':{title:'Light Snow',src:'/assets/images/weather_symbols/snow_light.svg'},
  '5000':{title:'Snow',src:'/assets/images/weather_symbols/snow.svg'},
  '5101':{title:'Heavy Snow',src:'/assets/images/weather_symbols/snow_heavy.svg'},
  '7102':{title:'Light Ice Pellets',src:'/assets/images/weather_symbols/ice_pellets_light.svg'},
  '7000':{title:'Ice Pellets',src:'/assets/images/weather_symbols/ice_pellets.svg'},
  '7101':{title:'Heavy Ice Pellets',src:'/assets/images/weather_symbols/ice_pellets_heavy.svg'},
  '4000':{title:'Drizzle',src:'/assets/images/weather_symbols/drizzle.svg'},
  '6000':{title:'Freezing Drizzle',src:'/assets/images/weather_symbols/freezing_drizzle.svg'},
  '6200':{title:'Light Freezing Rain',src:'/assets/images/weather_symbols/freezing_rain_light.svg'},
  '6001':{title:'Freezing Rain',src:'/assets/images/weather_symbols/freezing_rain.svg'},
  '6201':{title:'Heavy Freezing Rain',src:'/assets/images/weather_symbols/freezing_rain_heavy.svg'},
  '4200':{title:'Light Rain',src:'/assets/images/weather_symbols/rain_light.svg'},
  '4001':{title:'Rain',src:'/assets/images/weather_symbols/rain.svg'},
  '4201':{title:'Heavy Rain',src:'/assets/images/weather_symbols/rain_heavy.svg'},
  '3000':{title: 'Light Wind',src:'/assets/images/weather_symbols/wind_light.svg'},
  '3001':{title: 'Wind',src:'/assets/images/weather_symbols/wind.svg'},
  '3002':{title: 'Strong Wind',src:'/assets/images/weather_symbols/wind_strong.svg'}
};
export const DAYS:string[]=[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
export const MONTHS:string[]=[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


export const precipitationDict:{[key:string]:string} =
{'0': 'N/A',
'1': 'Rain',
'2': 'Snow',
'3': 'Freezing Rain',
'4': 'Ice Pellets'
}
;
