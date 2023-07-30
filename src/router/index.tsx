import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App, CreateAccount, Login } from 'pages';

import { useAuth } from 'hooks';

import ProtectRouter from './protect-router';

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  const { isLogined, user } = useAuth();

  return (
    <Routes>
      {/* public */}
      <Route path="sign-up" element={isLogined ? <Navigate to="app" /> : <CreateAccount />} />
      <Route path="login" element={isLogined ? <Navigate to="app" /> : <Login />} />
      {/* Authorization */}
      <Route path="app" element={<ProtectRouter user={user} navigate="/login" />}>
        <Route index element={<App />} />
      </Route>
      <Route path="*" element={user ? <Navigate to="/app" /> : <Navigate to="/login" />} />
    </Routes>
  );
};
