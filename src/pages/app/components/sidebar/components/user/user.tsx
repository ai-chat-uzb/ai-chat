import { FC } from 'react';
import { Dropdown, UserCard } from 'ai-ui-kit/lib/components';
import { MenuProps } from 'antd';

import { useAuth } from 'hooks';

import cls from './user.module.scss';

interface UserProps {}

const User: FC<UserProps> = () => {
  const { user, settingsModalHandler, reset } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `Settings`,
      onClick: () => settingsModalHandler()
    },
    {
      key: '2',
      label: `Log Out`,
      onClick: () => reset()
    }
  ];

  return (
    <div className={cls.wrapper}>
      <UserCard
        rightElement={
          <Dropdown iconName="settings" trigger={['click']} iconSize={24} placement="bottom" menu={{ items }} />
        }
        title={user?.firstName}
        username={`@${user?.username}`}
        status="off"
        size=""
        url={user.photoUrl}
      />
    </div>
  );
};

export default User;
