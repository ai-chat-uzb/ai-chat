import { FC, useEffect, useState } from 'react';
import { Button, Icons, Tabs } from 'ai-ui-kit/lib/components';
import { socket } from 'index';
import moment from 'moment';

import { useAuth } from 'hooks';

import Chat from '../chat/chat';

import cls from './content.module.scss';

interface ContentProps {}

const Content: FC<ContentProps> = () => {
  const [activeKeys, setActiveKeys] = useState('2');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { user } = useAuth();

  const items = [
    {
      key: '1',
      label: (
        <>
          <Icons size={20} name="logo" /> <span>Artificium</span>
        </>
      ),
      children: `Content of Tab Pane 1`
    },
    {
      key: '2',
      label: (
        <>
          <Icons size={20} name="commentCircle" /> <div>Chat</div>
        </>
      ),
      children: <Chat list={messageList} />
    },
    {
      key: '3',
      label: (
        <>
          <Icons size={20} name="folder" /> <span>Library</span>
        </>
      ),
      children: `Content of Tab Pane 3`
    }
  ];

  useEffect(() => {
    socket.emit('join_room', 1);
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
      // @ts-ignore
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: 1,
        author: user.username,
        message: currentMessage,
        date: moment().clone().format('LLL'),
        photoUrl: user.photoUrl
      };

      await socket.emit('send_message', messageData);
      // @ts-ignore
      setMessageList(list => [...list, messageData]);
    }
  };

  return (
    <div className={cls.wrapper}>
      {/* <button onClick={() => reset()}>reset</button> */}
      <Tabs items={items} activeKey={activeKeys} onChange={tab => setActiveKeys(tab)} />
      {/* <div className={cls['chat-input']} /> */}
      <div className={cls['chat-input']}>
        <input type="text" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
        <Button children="Submit" size="large" colorView="full" view="line" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default Content;
