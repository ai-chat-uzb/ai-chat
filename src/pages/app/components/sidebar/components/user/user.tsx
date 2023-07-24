import { FC } from 'react';
import { Button, UserList } from 'ai-ui-kit/lib/components';
import { useAuth } from 'modules/create-account/hook';

import cls from './user.module.scss';

interface UserProps {}

const User: FC<UserProps> = () => {
  const { user } = useAuth();

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
          />
        }
        title={user?.firstName}
        username={user?.email}
        status={undefined}
        url="https://firebasestorage.googleapis.com/v0/b/ai-chat-c50cc.appspot.com/o/Person%3DEmily%20Liu.svg?alt=media&token=e20ad0ee-e6bb-4ae6-aee4-4b44e26084a7"
      />
    </div>
  );
};

export default User;
