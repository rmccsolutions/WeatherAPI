import Forecast from "../../Forecast";
import Provider from "./Provider";
export default interface WeatherProvider extends Provider {
  getName(): string;
  getUrl(): string;
  getIconUrl(): string;
  getMultiDayForecast(): Promise<[Forecast]>;
}
