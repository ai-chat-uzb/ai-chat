import React, { FC } from 'react';
import { Typography } from 'ai-ui-kit/lib/components';

import { useAuth } from 'hooks';

import { SearchBar, User } from './components';

import cls from './sidebar.module.scss';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { reset, user } = useAuth();

  return (
    <div className={cls.wrapper}>
      <User />
      <Typography
        size={12}
        weight="600"
        lineHeight={18}
        spacing={0.15}
        children="GENERAL"
        padding="24px 16px"
        color="--color-black-4"
        textAlign="start"
      />
      <SearchBar />
    </div>
  );
};

export default Sidebar;
