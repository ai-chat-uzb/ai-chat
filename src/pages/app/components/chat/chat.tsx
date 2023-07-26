import React, { FC } from 'react';

import { UserContent } from './components';

import cls from './chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => (
  <div className={cls.wrapper}>
    <UserContent />
  </div>
);

export default Chat;
