import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Content, Header, Item } from '../../components';
import { IPosition } from '../../models';
import { IActions } from '../../components/layout/Header';
import { APP_PATH } from '../../consts';
import { getPositionsFromStorage, updatePositionToStorage } from '../../utils';

import './style.scss';

export const Main: FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<IPosition[]>([]);

  useEffect(() => {
    const newList = getPositionsFromStorage();
    if (newList.length !== 0) {
      setList(newList);
    }
  }, []);

  const handleCreate = useCallback(() => {
    navigate(`${APP_PATH.CREATE}`);
  }, [navigate]);

  const handleDelete = useCallback((index) => {
    const list = getPositionsFromStorage();

    if (Array.isArray(list)) {
      const newList = list.filter((_, i) => i !== index);
      updatePositionToStorage(newList);
      setList(newList);
    }
  }, []);

  const actions = useMemo<IActions[]>(
    () => [
      { Icon: SearchOutlined, onClick: () => {}, key: 'search' },
      { Icon: MenuOutlined, onClick: () => {}, key: 'more' },
    ],
    [],
  );

  return (
    <>
      <Header title="Prometheus" descriptions="You can add, edit and delete locations" actions={actions} />
      <Content>
        {list.map((l, index) => (
          <Item key={`${l.latitude}_${l.longitude}`} position={l} index={index} onDelete={handleDelete} />
        ))}

        <div className="add">
          <Button type="primary" ghost className="add-btn" onClick={handleCreate}>
            Add new location
          </Button>
        </div>
      </Content>
    </>
  );
};
