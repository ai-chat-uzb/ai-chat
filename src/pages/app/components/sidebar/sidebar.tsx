import React, { FC } from 'react';
import { Typography } from 'ai-ui-kit/lib/components';
import useAuth from 'modules/create-account/hook/use-auth';

import cls from './sidebar.module.scss';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { reset, user } = useAuth();

  return (
    <div className={cls.wrapper}>
      <Typography size={20} lineHeight={24} color="--color-heisenberg-5" weight={600}>
        {user?.firstName}
      </Typography>
    </div>
  );
};

export default Sidebar;
