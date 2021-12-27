import { Address } from "./address.model";

export class Weather
{
  address:Address;
  hourlyValues: HourlyValues[];
  dailyValues: DailyValues[];
  constructor()
  {
    this.hourlyValues = [];
    this.dailyValues = [];
  }
}

export class WeatherValues
{
  startTime:Date;
  temperature: number;
  temperatureApparent: number;
  temperatureMin: number;
  temperatureMax: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressureSeaLevel: number;
  weatherCode: number;
  precipitationProbability: number;
  precipitationType: number;
  visibility: number;
  cloudCover: number;

}
export class HourlyValues extends WeatherValues {
  uvIndex?: number | null;
}
export class DailyValues extends WeatherValues{
  sunriseTime: Date;
  sunsetTime: Date;
  moonPhase: number;
}
