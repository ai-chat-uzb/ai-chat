import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Types } from 'modules/create-account';

interface ProtectRouterProps {
  user?: Types.IForm.IUser | null;
  navigate: string;
}

const ProtectRouter: FC<ProtectRouterProps> = ({ user, navigate }) =>
  user?.firstName ? <Outlet /> : <Navigate to={navigate} />;

export default ProtectRouter;
