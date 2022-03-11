export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  timezone: string;
  currently: {
    temperature: number;
    humidity: number;
    windBearing: number;
    windSpeed: number;
    summary: string;
    icon: string;
  };
}


