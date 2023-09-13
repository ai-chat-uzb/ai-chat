import { FC, useEffect, useState } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { NORMAL_FORMAT } from 'helpers/constants';
import Lottie from 'lottie-react-component';
import { useHistory } from 'modules/history/hooks';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAuth } from 'hooks';
import useQueryParams from 'hooks/use-query-params/use-query-params';

import emptyJson from 'assets/lottie/empty/empty.json';

import cls from './chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const { user } = useAuth();
  const { count, messageHistory } = useMessageContext();
  const [query] = useQueryParams();
  const { mutate } = useHistory();
  const [activeCount, setActiveCount] = useState(1);

  useEffect(() => {
    console.log('hi');
  }, [query?.roomId]);

  return (
    <div className={cls.wrapper}>
      {messageHistory.length > 0 ? (
        <div id="scrollableDiv" className={cls['chat-container']}>
          <InfiniteScroll
            dataLength={10}
            next={() => {
              if (activeCount <= count) {
                mutate({ id: activeCount + 1 });

                if (activeCount < count) setActiveCount(activeCount + 1);
              }
            }}
            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}
            inverse={true} //
            hasMore={true}
            loader={
              count !== activeCount && (
                <div className={cls.loader}>
                  <div className={cls['lds-dual-ring']} />
                </div>
              )
            }
            scrollableTarget="scrollableDiv"
            height="calc(100vh - 232px)"
            endMessage={<span />}
            refreshFunction={() => {
              if (activeCount <= count) {
                mutate({ id: activeCount });
                if (activeCount < count) setActiveCount(activeCount + 1);
              }
            }}
            pullDownToRefresh={true}
            // pullDownToRefreshContent={<div style={{ textAlign: 'center' }}>Circle SVG/img</div>}
            // releaseToRefreshContent={<div style={{ textAlign: 'center' }}>Circle SVG/img</div>}
          >
            {messageHistory.map((item, index) => (
              <BaseUserContent
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                userName={user.username}
                description={item.message}
                date={item.timeCreated ? moment(item.timeCreated).clone().format(NORMAL_FORMAT) : ''}
                status="active"
                url=""
                author={item.userId === user.id}
                chat="private"
                consecutively={index !== 0 && item.userId === messageHistory[index - 1].userId}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className={cls.container}>
          <div className={cls.row}>
            <Lottie animationData={emptyJson} loop />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
