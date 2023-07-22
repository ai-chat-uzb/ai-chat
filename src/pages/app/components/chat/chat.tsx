import React, { FC } from 'react';

import cls from './chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => <div className={cls.wrapper}>chat</div>;

export default Chat;
