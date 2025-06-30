export interface Teacher {
  _id: string;
  id: number;
  tz: string;
  firstName: string;
  lastName: string;
  class: string;
  phone: string;
  address: any; // אפשר להגדיר מבנה מלא אם צריך
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}