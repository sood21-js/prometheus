import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Crate } from './pages';
import { APP_PATH } from './consts';

import 'antd/dist/antd.css';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_PATH.CREATE} element={<Crate />} />
        <Route path={APP_PATH.MAIN} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
