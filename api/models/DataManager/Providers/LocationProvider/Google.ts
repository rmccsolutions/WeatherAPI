import fetch from "node-fetch";
import WeatherLocation from "../../../WeatherLocation";
import Provider from "../Provider";
export default class Google implements Provider {
  private url: string = process.env.WEATHER_API_GOOGLE_URL || "";
  private name: string = process.env.WEATHER_API_GOOGLE_NAME || "";
  private iconUrl: string = process.env.WEATHER_API_GOOGLE_ICON_URL || "";

  /**
   * Retrieves the locations lat and long by
   * city and region.
   *
   * @static
   * @param {WeatherLocation} weatherLocation
   * @returns {Promise<WeatherLocation>}
   * @memberof Google
   */
  public async byCityandRegion(
    weatherLocation: WeatherLocation
  ): Promise<WeatherLocation> {
    let url: string = `${process.env.WEATHER_API_GOOGLE_BASE_URL || ""}${
      weatherLocation.city
    },${weatherLocation.region}&key=${
      process.env.WEATHER_API_GOOGLE_KEY || ""
    }`;
    console.log(url);
    //fetch the location data
    let googleGeoLocation: any = await fetch(url);

    //covert to json
    googleGeoLocation = await googleGeoLocation.json();

    if (googleGeoLocation.error_message !== undefined) {
      throw new Error(googleGeoLocation.error_message);
    }

    //grab the geomentry object
    let geometry = googleGeoLocation.results.pop().geometry;
    let long: number = geometry.location.lng;
    let lat: number = geometry.location.lat;

    //set lat and long
    weatherLocation.setLong(long);
    weatherLocation.setLat(lat);

    return weatherLocation;
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
