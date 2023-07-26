import { FC } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';
import { CONTENT_PRIVATE_CHAT } from 'helpers/constants';
import { useAuth } from 'modules/create-account/hook';

import cls from './user-content.module.scss';

interface UserContentProps {}

const UserContent: FC<UserContentProps> = () => {
  const { user } = useAuth();

  return (
    <div className={cls.wrapper}>
      {CONTENT_PRIVATE_CHAT.map((item, index) => (
        <BaseUserContent
          key={item.id}
          userName={item.userName}
          description={item.description}
          date={item.date}
          status="active"
          url={item.url}
          author={item.userName === 'xushnud'}
          chat="private"
          consecutively={index !== 0 && item.userName === CONTENT_PRIVATE_CHAT[index - 1].userName}
        />
      ))}
    </div>
  );
};

export default UserContent;
