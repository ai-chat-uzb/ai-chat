import { FC } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';
import { Types } from 'modules/chat-input';

import { useAuth } from 'hooks';

import cls from './user-content.module.scss';

export interface UserContentListProps extends Types.IEntity.AllMessage {}

const UserContent: FC<UserContentListProps> = ({ list }) => {
  const { user } = useAuth();

  return (
    <div className={cls.wrapper}>
      {list.map((item, index) => (
        <BaseUserContent
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          userName={user.username}
          description={item.message}
          date=""
          status="active"
          url=""
          author={item.userId === user.id}
          chat="private"
          consecutively={index !== 0 && item.userId === list[index - 1].userId}
        />
      ))}
    </div>
  );
};

export default UserContent;
