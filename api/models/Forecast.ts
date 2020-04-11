/**
 * Forecast
 */
export default class Forecast {
  public high: number;
  public low: number;
  public feelsLike: number;
  public status: string;

  /**
   * @param {number} high
   * @param {number} low
   * @param {number} feelsLike
   * @param {string} status
   */
  constructor(high: number, low: number, feelsLike: number, status: string) {
    this.high = high;
    this.low = low;
    this.feelsLike = feelsLike;
    this.status = status;
  }
}
