import { IPosition } from './models';

const API_KEY = '41bb42825';

export const APP_PATH = {
  MAIN: '/',
  CREATE: '/:position',
};
export const STORAGE_KEY = {
  POSITIONS: 'positions',
};

export const DEFAULT_POSITION: IPosition = { latitude: 59.955413, longitude: 30.337844 };

type TGetWeatherForecastPath = (params: IPosition) => string;
export const getWeatherForecastPath: TGetWeatherForecastPath = ({ latitude, longitude }) => `/${API_KEY}/${latitude},${longitude}`;
