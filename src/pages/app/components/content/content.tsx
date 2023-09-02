import { FC, useState } from 'react';
import { Button, Icons, Input, Tabs } from 'ai-ui-kit/lib/components';
import { Form } from 'modules/chat-input';

import { useAuth } from 'hooks';

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
      children: <h1>hello </h1>
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
      <div className={cls['top-container']}>
        <Tabs items={items} activeKey={activeKeys} onChange={tab => setActiveKeys(tab)} />
      </div>
      <div className={cls['bottom-container']}>
        <Form.ChatInput defaultValues={{ chatInput: '' }}>
          {({ control }) => (
            <div className={cls['chat-input']}>
              <Input
                control={control}
                name="chatInput"
                type="text"
                placeholder="You can ask me anything! I am here to help."
                chat={true}
              />
              <Button size="small" colorView="full" view="outline">
                <Icons name="send" size={36} />
              </Button>
            </div>
          )}
        </Form.ChatInput>
      </div>
    </div>
  );
};

export default Content;
