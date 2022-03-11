import React, { FC } from 'react';
import './style.scss';

export interface IActions {
  key: string;
  Icon: any;
  onClick: () => void;
}

interface IProps {
  title: string;
  descriptions: string;
  actions: IActions[];
}

export const Header: FC<IProps> = ({ descriptions, title, actions }) => {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        <span>{descriptions}</span>
      </div>
      <div className="actions">
        {actions.map(({ Icon, key, onClick }) => (
          <Icon key={key} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};
