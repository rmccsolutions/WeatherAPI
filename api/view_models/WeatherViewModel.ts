import Forecast from "../models/Forecast";
import WeatherLocationViewModel from "./WeatherLocationViewModel";
import ProviderViewModel from "./ProviderViewModel";

export default class WeatherViewModel {
  public provider: ProviderViewModel;
  public weatherLocation: WeatherLocationViewModel;
  public forecasts: [Forecast];

  constructor(
    provider: ProviderViewModel,
    weatherLocation: WeatherLocationViewModel,
    forecasts: [Forecast]
  ) {
    this.provider = provider;
    this.weatherLocation = weatherLocation;
    this.forecasts = forecasts;
  }
}
