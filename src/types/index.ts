export interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  latitude: number;
  longitude: number;
  attendees: number;
  organizerId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  latitude: number;
  longitude: number;
}