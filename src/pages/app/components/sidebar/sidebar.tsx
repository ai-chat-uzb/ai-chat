import React, { FC } from 'react';
import { Button, Typography } from 'ai-ui-kit/lib/components';

import { useAuth } from 'hooks';
import useRefreshToken from 'hooks/use-refresh-token';

import { SearchBar, User } from './components';

import cls from './sidebar.module.scss';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { reset, user } = useAuth();
  const refresh = useRefreshToken();

  return (
    <div className={cls.wrapper}>
      <Button size="medium" colorView="full" view="glass" htmlType="button" width="100%" onClick={() => reset()}>
        Reset
      </Button>
      <User />
      <Button size="medium" colorView="full" view="glass" htmlType="button" width="100%" onClick={() => refresh()}>
        Refresh
      </Button>
      <Typography size={20} lineHeight={24} color="--color-heisenberg-5" weight={600}>
        {user?.firstName}
      </Typography>
      <SearchBar />
    </div>
  );
};

export default Sidebar;
