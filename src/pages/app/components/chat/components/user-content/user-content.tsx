import { FC } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';

import { useAuth } from 'hooks';

import cls from './user-content.module.scss';

export interface UserContentListProps {
  list: { room: number; author: string; date: string; message: string; photUrl: string }[];
}

const UserContent: FC<UserContentListProps> = ({ list }) => {
  const { user } = useAuth();

  return (
    <div className={cls.wrapper}>
      {list
        ? list.map((item, index) => (
            <BaseUserContent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              userName={item.author}
              description={item.message}
              date={item.date}
              status="active"
              url={item.photUrl}
              author={item.author === user.username}
              chat="private"
              consecutively={index !== 0 && item.author === list[index - 1].author}
            />
          ))
        : 'Empty ❓'}
    </div>
  );
};

export default UserContent;
