import React, { FC } from 'react';

import { UserContentListProps } from './components/user-content/user-content';
import { UserContent } from './components';

import cls from './chat.module.scss';

interface ChatProps extends UserContentListProps {}

const Chat: FC<ChatProps> = ({ list }) => (
  <div className={cls.wrapper}>
    <UserContent list={list} />
  </div>
);

export default Chat;
