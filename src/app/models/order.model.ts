import { Item } from './item.model';

export interface Order {
  id?: string;
  user: {
    uid: string;
    displayName: string;
    email: string;
  };
  items: Item[];
  total: number;
  status: string;
  createdAt: Date;
  pickupTime: Date;
  directionsLeg: any;
  [key: string]: any; // Allow additional properties
}
