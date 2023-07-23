import { FC, useState } from 'react';
import { Icons, Tabs } from 'ai-ui-kit/lib/components';
import { useAuth } from 'modules/create-account/hook';

import Chat from '../chat/chat';

import cls from './content.module.scss';

interface ContentProps {}

const Content: FC<ContentProps> = () => {
  const { reset } = useAuth();
  const [activeKeys, setActiveKeys] = useState('2');

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
          <Icons size={20} name="commentCircle" /> <span>Chat</span>
        </>
      ),
      children: <Chat />
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

  return (
    <div className={cls.wrapper}>
      <button onClick={() => reset()}>reset</button>
      <Tabs items={items} activeKey={activeKeys} onChange={tab => setActiveKeys(tab)} />
      <div className={cls['chat-input']} />
    </div>
  );
};

export default Content;
