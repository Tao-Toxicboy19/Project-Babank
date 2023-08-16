export interface Floating {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  setuptime: string;
  speed: number;
}

export interface FloatingState {
  data: Floating[]
}