import React, { CSSProperties, useCallback, useEffect, useMemo, useState, FC } from 'react';
import { Dropdown, Menu, Spin } from 'antd';
import { useNavigate } from 'react-router';
import { ArrowUpOutlined } from '@ant-design/icons';
import { ILocation, IPosition } from '../../models';
import { getWeatherForecast } from '../../api/requst';
import { convertTempreture } from '../../utils';

import './style.scss';

interface IProps {
  position: IPosition;
  index: number;
  onDelete: (index: number) => void;
}

interface IWrapperProps {
  isLoading: boolean;
}

const Wrapper: FC<IWrapperProps> = ({ children, isLoading }) => (isLoading ? <Spin tip="Loading...">{children}</Spin> : <>{children}</>);

export const Item: FC<IProps> = ({ position, index, onDelete }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ILocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const responce = await getWeatherForecast(position);
      setData(responce.data);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [position]);

  const handleEdit = useCallback(() => {
    navigate(`/${data?.latitude},${data?.longitude}`);
  }, [data?.latitude, data?.longitude, navigate]);

  const menu = useMemo(() => {
    const handleMenuClick = ({ key }: any) => {
      if (key === 'delete') {
        onDelete(index);
      }

      if (key === 'update') {
        loadInfo();
      }
    };

    return (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key={'delete'}>Delete</Menu.Item>
        <Menu.Item key={'update'}>Update info</Menu.Item>
      </Menu>
    );
  }, [index, loadInfo, onDelete]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo, position]);

  if (!data && !isLoading) {
    return null;
  }

  const arrowStyle: CSSProperties = {
    transform: `rotate(${data?.currently.windBearing}deg)`,
  };

  return (
    <div className="item">
      <Wrapper isLoading={isLoading}>
        <div className="main">
          <div>
            <div className="temp">{convertTempreture(data?.currently.temperature)}</div>
            <div className="title">
              <span>{`${data?.timezone} ${data?.longitude} ${data?.latitude}`}</span>
              <span>{data?.currently.icon}</span>
              <span>{data?.currently.summary}</span>
            </div>
          </div>
          <div className="actions">
            <Dropdown.Button overlay={menu} className="btn" type="primary" onClick={handleEdit}>
              Edit
            </Dropdown.Button>
          </div>
        </div>
        <div className="description">
          <span>
            Wind Speed <ArrowUpOutlined style={arrowStyle} />
          </span>
          <span>{`${data?.currently.windSpeed} KM/H`}</span>
          <span>{`Humidity ${data?.currently.humidity}`}</span>
        </div>
      </Wrapper>
    </div>
  );
};
