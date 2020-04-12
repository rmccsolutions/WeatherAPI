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

  /**
   * Returns milti day forecast
   *
   * @returns {Promise<[Forecast]>}
   * @memberof OpenWeatherProvider
   */
  public async getMultiDayForecast(): Promise<[Forecast]> {
    let forecasts: [Forecast];
    let forecastsResponse: any = await this.multiDayForecastRequest();

    let forecast: Forecast = new Forecast(
      forecastsResponse.current.temp,
      forecastsResponse.current.weather.pop().main,
      forecastsResponse.current.dt
    );
    forecast.feelsLike = forecastsResponse.current.feels_like;

    //Forty eight hourly forcast
    if (forecastsResponse.hourly.length > 0) {
      let hourly: any;
      let hourlyForecast: Forecast;
      let fortyEighthourly: any = [];
      for (hourly of forecastsResponse.hourly) {
        hourlyForecast = new Forecast(
          hourly.temp,
          hourly.weather.pop().main,
          hourly.dt
        );
        fortyEighthourly.push(hourlyForecast);
      }
      if (fortyEighthourly.length > 0) {
        forecast.hourly = fortyEighthourly;
      }
    }

    forecasts = [forecast];
    let day: any = null;
    for (day of forecastsResponse.daily) {
      forecast = new Forecast(day.temp.day, day.weather.pop().main, day.dt);
      forecast.high = day.temp.max;
      forecast.low = day.temp.min;
      forecasts.push(forecast);
    }

    return forecasts;
  }

  /**
   * Multiday forcast request.
   */
  private async multiDayForecastRequest() {
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

    return forecastsResponse;
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
