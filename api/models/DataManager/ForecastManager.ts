import WeatherLocation from "../WeatherLocation";
import OpenWeatherProvider from "./Providers/Weather/OpenWeatherProvider";
import WeatherProvider from "./Providers/WeatherProvider";
import Forcast from "../Forecast";

export default class ForecastManager {
  private weatherLocation: WeatherLocation;
  private providerUsed: WeatherProvider;

  constructor(weatherLocation: WeatherLocation) {
    this.weatherLocation = weatherLocation;
    this.providerUsed = new OpenWeatherProvider(this.weatherLocation);
  }

  public async getMultiDayDayForcasts(): Promise<[Forcast]> {
    return await this.providerUsed.getMultiDayForecast();
  }

  public getProvider(): WeatherProvider {
    return this.providerUsed;
  }
}
