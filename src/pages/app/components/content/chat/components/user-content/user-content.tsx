import { FC, useState } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { NORMAL_FORMAT } from 'helpers/constants';
import { Types } from 'modules/chat-input';
import { useHistory } from 'modules/history/hooks';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAuth } from 'hooks';
import useQueryParams from 'hooks/use-query-params/use-query-params';

import cls from './user-content.module.scss';

export interface UserContentListProps extends Types.IEntity.AllMessage {}

const UserContent: FC<UserContentListProps> = ({ list }) => {
  const [query, { pushQuery }] = useQueryParams();
  const { user } = useAuth();
  const { count, messageHistory } = useMessageContext();
  const { mutate } = useHistory();
  const [activeCount, setActiveCount] = useState(0);

  console.log(query);

  // console.log('messageHistory === ', messageHistory);

  // useEffect(() => {
  //   console.log(activeCount <= count && query?.roomId);
  // }, [query, isLoading, isRefetching]);

  // console.log(activeCount <= count && query?.roomId);

  return (
    <div id="scrollableDiv" className={cls.wrapper}>
      <InfiniteScroll
        dataLength={10}
        next={() => {
          if (activeCount <= count) {
            console.log(activeCount);
            pushQuery({ page: activeCount + 1 });
            setActiveCount(activeCount + 1);
          }
        }}
        style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}
        inverse={true} //
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        height="calc(100vh - 232px)"
        endMessage={<span />}
        refreshFunction={() => {
          if (activeCount <= count) {
            console.log(activeCount);
            pushQuery({ page: activeCount + 1 });
            setActiveCount(activeCount + 1);
          }
        }}
        pullDownToRefresh={true}
        pullDownToRefreshContent={<div style={{ textAlign: 'center' }}>Circle SVG/img</div>}
        releaseToRefreshContent={<div style={{ textAlign: 'center' }}>Circle SVG/img</div>}
      >
        {list.map((item, index) => (
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
            consecutively={index !== 0 && item.userId === list[index - 1].userId}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserContent;
