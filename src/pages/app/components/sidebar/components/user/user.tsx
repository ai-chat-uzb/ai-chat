import { FC } from 'react';
import { Button, UserList } from 'ai-ui-kit/lib/components';
import { useAuth } from 'modules/create-account/hook';

import cls from './user.module.scss';

interface UserProps {}

const User: FC<UserProps> = () => {
  const { user, settingsModalHandler } = useAuth();

  return (
    <div className={cls.wrapper}>
      <UserList
        rightElement={
          <Button
            iconName="settings"
            size="small"
            colorView="full"
            view="outline"
            iconSize={24}
            htmlType="button"
            className="custom-user-settings-btn"
            onClick={() => settingsModalHandler()}
          />
        }
        title={user?.firstName}
        username={`@${user?.username}`}
        status={undefined}
        url={user.avatarUrl}
      />
    </div>
  );
};

export default User;
