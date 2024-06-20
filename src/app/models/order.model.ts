import { Item } from './item.model';

export interface Order {
  user: {
    uid: string;
    displayName: string;
    email: string;
  };
  items: Item[];
  total: number;
  status: string;
  createdAt: Date;
  directionsLeg: any; // Define the correct type if available
  pickupTime: string; // ISO string
}
