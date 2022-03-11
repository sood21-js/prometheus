import { STORAGE_KEY } from './consts';
import { IPosition } from './models';

export const convertTempreture = (t: number | undefined) => (t ? (((t - 32) * 5) / 9).toFixed() : '-') + "'C";

export const getPositionsFromStorage = (): IPosition[] => JSON.parse(localStorage.getItem(STORAGE_KEY.POSITIONS) || '[]');

export const addPositionToStorage = (position: IPosition) => {
  const lastPositions = getPositionsFromStorage();
  const result = lastPositions.some(({ latitude, longitude }) => position.latitude === latitude || position.longitude === longitude);

  if (!result) {
    localStorage.setItem(STORAGE_KEY.POSITIONS, JSON.stringify([position, ...lastPositions]));
  }
};

export const updatePositionToStorage = (positions: IPosition[]) => {
  localStorage.setItem(STORAGE_KEY.POSITIONS, JSON.stringify(positions));
};
