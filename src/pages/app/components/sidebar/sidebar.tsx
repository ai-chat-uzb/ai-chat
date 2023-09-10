import React, { FC } from 'react';
import { Typography } from 'ai-ui-kit/lib/components';

import { SearchBar, User, UserList } from './components';

import cls from './sidebar.module.scss';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => (
  <div className={cls.wrapper}>
    <div className={cls.container}>
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
    <Typography
      size={12}
      weight="600"
      lineHeight={18}
      spacing={0.15}
      children="HISTORY"
      padding="24px 16px"
      color="--color-black-4"
      textAlign="start"
    />
    <UserList />
  </div>
);

export default Sidebar;
