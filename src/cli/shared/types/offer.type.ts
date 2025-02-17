import {Location} from './location.type.js';
import {City} from './city.type.js';
import {OfferType} from './offer-type.enum.js';
import {Host} from './host.type.js';

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
