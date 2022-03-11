import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import GoogleMapReact from 'google-map-react';
import { Content, Header, Marker } from '../../components';
import { IPosition } from '../../models';
import { APP_PATH, DEFAULT_POSITION } from '../../consts';
import { addPositionToStorage } from '../../utils';

import './style.scss';

export const Crate: FC = () => {
  const [position, setPosition] = useState<IPosition>(DEFAULT_POSITION);
  const navigate = useNavigate();
  const params = useParams<{ position: string }>();

  useEffect(() => {
    const currentPosition = params.position?.split(',');
    if (Array.isArray(currentPosition) && currentPosition.length > 1) {
      setPosition({ latitude: Number(currentPosition[0]), longitude: Number(currentPosition[1]) });
    }
  }, [params.position]);

  const handleChangePosition = useCallback(({ lat, lng }) => {
    setPosition({ latitude: lat, longitude: lng });
  }, []);

  const handleSubmit = useCallback(() => {
    addPositionToStorage(position);
    navigate(APP_PATH.MAIN);
  }, [navigate, position]);

  const title = params.position ? 'Edit Location' : 'Add new Location';

  return (
    <>
      <Header title={title} descriptions={`${position.latitude}, ${position.longitude}`} actions={[]} />
      <Content>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact defaultCenter={{ lat: position.latitude, lng: position.longitude }} defaultZoom={11} onClick={handleChangePosition}>
            <Marker lat={position.latitude} lng={position.longitude} onAdd={handleSubmit} />
          </GoogleMapReact>
        </div>
      </Content>
    </>
  );
};
