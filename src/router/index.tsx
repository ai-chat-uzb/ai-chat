import { FC, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateAccount, Login } from 'pages';
import { App } from 'pages/app/app';

import ProtectRouter from './protect-router';

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  const [user, setUser] = useState('');
  const [isLogined, setIsLogined] = useState('');

  return (
    <Routes>
      {/* public */}
      <Route path="sign-up" element={isLogined ? <Navigate to="app" /> : <CreateAccount />} />
      <Route path="login" element={isLogined ? <Navigate to="app" /> : <Login />} />
      {/* Authorization */}
      <Route path="app" element={<ProtectRouter user="xushnud" navigate="/login" />}>
        <Route path="*" element={<App />} />
      </Route>
      <Route path="*" element={user ? <Navigate to="/app" /> : <Navigate to="/login" />} />
    </Routes>
  );
};
