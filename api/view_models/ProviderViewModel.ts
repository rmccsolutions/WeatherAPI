export default class ProviderViewModel {
  public name: string;
  public url: string;
  public iconUrl: string;

  constructor(name: string, url: string, iconUrl: string) {
    this.name = name;
    this.url = url;
    this.iconUrl = iconUrl;
  }
}
