import axios, { AxiosPromise } from 'axios';
import { getWeatherForecastPath } from '../consts';
import { ILocation, IPosition } from '../models';

type IGetWeatherForecast = (params: IPosition) => AxiosPromise<ILocation>;

export const getWeatherForecast: IGetWeatherForecast = (params) =>
  axios({
    method: 'get',
    url: getWeatherForecastPath(params),
  });
