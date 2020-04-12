import WeatherProvider from "../WeatherProvider";
import WeatherLocation from "../../../WeatherLocation";
import Forecast from "../../../../models/Forecast";
import fetch from "node-fetch";
import Google from "../LocationProvider/Google";

export default class OpenWeatherProvider implements WeatherProvider {
  private url: string = process.env.WEATHER_API_OPEN_WEATHER_URL || "";
  private name: string = process.env.WEATHER_API_OPEN_WEATHER_NAME || "";
  private iconUrl: string = process.env.WEATHER_API_OPEN_WEATHER_ICON_URL || "";
  private weatherLocation: WeatherLocation;

  constructor(weatherLocation: WeatherLocation) {
    this.weatherLocation = weatherLocation;
  }

  /**
   * @param weatherLocation
   */
  public setWeatherLocation(weatherLocation: WeatherLocation) {
    this.weatherLocation = weatherLocation;
  }

  public async getMultiDayForecast(): Promise<[Forecast]> {
    let forecasts: [Forecast];
    //Retrieve lat and long by city and region/state/country
    let google: Google = new Google();
    this.weatherLocation = await google.byCityandRegion(this.weatherLocation);

    let apiUrl: string = `${
      process.env.WEATHER_API_OPEN_WEATHER_API_URL
    }lat=${this.weatherLocation.getLat()}&lon=${this.weatherLocation.getLong()}&appid=${
      process.env.WEATHER_API_OPEN_WEATHER_API_KEY
    }&units=${this.weatherLocation.units}`;
    console.log(apiUrl);
    let forecastsResponse: any = await fetch(apiUrl);
    forecastsResponse = await forecastsResponse.json();

    if (forecastsResponse.cod !== undefined) {
      throw new Error(forecastsResponse.message);
    }

    let forecast: Forecast = new Forecast(
      forecastsResponse.current.temp,
      forecastsResponse.current.temp,
      forecastsResponse.current.feels_like,
      forecastsResponse.current.weather.pop().main,
      forecastsResponse.current.dt
    );

    forecasts = [forecast];
    let day: any = null;
    for (day of forecastsResponse.daily) {
      forecast = new Forecast(
        day.temp.max,
        day.temp.min,
        -1,
        day.weather.pop().main,
        day.dt
      );
      forecasts.push(forecast);
    }

    return forecasts;
  }

  /**
   * @returns WeatherLocation
   */
  public getWeatherLocation(): WeatherLocation {
    return this.weatherLocation;
  }
  /**
   * Gets the provider url
   */
  public getUrl(): string {
    return this.url;
  }

  /**
   * Get provider name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get provider icon url
   */
  public getIconUrl(): string {
    return this.iconUrl;
  }
}
