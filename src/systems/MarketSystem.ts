import { EventBus } from '../core/EventBus';

export interface MarketListing {
  id: string;
  sellerId: string;
  item: any;
  price: number;
  listedAt: number;
}

export class MarketSystem {
  listings: MarketListing[] = [];

  listItem(sellerId: string, item: any, price: number) {
    const listing: MarketListing = {
      id: `listing_${Date.now()}`,
      sellerId,
      item,
      price,
      listedAt: Date.now()
    };
    this.listings.push(listing);
    EventBus.emit('market:item_listed', listing);
    return listing;
  }

  buyItem(listingId: string, buyerId: string) {
    const index = this.listings.findIndex(l => l.id === listingId);
    if (index === -1) return null;

    const listing = this.listings[index];
    this.listings.splice(index, 1);

    EventBus.emit('market:item_sold', { listing, buyerId });
    return listing;
  }
}