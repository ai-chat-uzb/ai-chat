import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectRouterProps {
  user?: string;
  navigate: string;
}

const ProtectRouter: FC<ProtectRouterProps> = ({ user, navigate }) => (user ? <Outlet /> : <Navigate to={navigate} />);

export default ProtectRouter;
