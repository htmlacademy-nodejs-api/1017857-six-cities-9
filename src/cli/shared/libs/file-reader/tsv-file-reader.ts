import { readFileSync } from "node:fs";

import { FileReader } from "./file-reader.interface.js";
import {City, CityName, Host, Location, Offer, OfferType} from "../../types/index.js";


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ){}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      id,
      title,
      description,
      type,
      price,
      images,
      city,
      location,
      goods,
      host,
      isPremium,
      isFavorite,
      rating,
      bedrooms,
      maxAdults
    ] = line.split('\t');

    return {
      id,
      title,
      type: this.parseOfferType(type),
      price: this.parsePrice(price),
      city: this.parseCity(city),
      location: this.parseLocation(location),
      isFavorite: this.parseStringToBoolean(isFavorite),
      isPremium: this.parseStringToBoolean(isPremium),
      rating: this.parseRating(rating),
      description,
      bedrooms: this.parseStringToNumber(bedrooms),
      goods: this.parseGoods(goods),
      host: this.parseHost(host),
      images: this.parseImages(images),
      maxAdults: this.parseStringToNumber(maxAdults)
    }
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split('|');
  }

  private parseLocation(locationString: string): Location {
    const [latitude, longitude, zoom] = locationString.split('|').map(Number);

    return { latitude, longitude, zoom };
  }

  private parseRating(ratingString: string): number {
    return Number(ratingString);
  }

  private parseStringToNumber(parsedString: string): number {
    return Number.parseInt(parsedString, 10);
  }

  private parseStringToBoolean(parsedString: string): boolean {
    return parsedString === 'true';
  }

  private parseHost(hostString: string): Host {
    const [isPro, name, avatarUrl] = hostString.split('|');

    return {
      name,
      avatarUrl,
      isPro: isPro === "true",
    };
  }

  private parseGoods(goodsString: string): string[] {
    const goodsArray = goodsString.split("|").map((good) => good.trim()).filter((good) => good.length > 0);

    if (goodsArray.length === 0) {
      throw new Error("No valid goods found.");
    }

    return goodsArray;
  }

  private parseOfferType(typeString: string): OfferType {
    const offerType = Object.values(OfferType).find((offer) => offer === typeString.trim());

    if (!offerType) {
      throw new Error(`Invalid offer type: ${typeString}`);
    }

    return offerType;
  }

  private parseCity(cityString: string): City {
    const [name, ...locationData] = cityString.split('|');

    if (!Object.values(CityName).includes(name as CityName)) {
      throw new Error(`Invalid city name: ${name}`);
    }

    return {
      name: name as CityName,
      location: this.parseLocation(locationData.join('|')),
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
