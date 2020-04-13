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
    let addressComponent : any = googleGeoLocation.results.pop();
    let formattedAddress : string = addressComponent.formatted_address;
    let long: number = addressComponent.geometry.location.lng;
    let lat: number = addressComponent.geometry.location.lat;

    //set lat and long
    weatherLocation.setFormattedAddress(formattedAddress);
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
