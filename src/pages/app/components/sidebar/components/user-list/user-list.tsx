import React, { FC } from 'react';
import { UserCard } from 'ai-ui-kit/lib/components';
import { useRoom } from 'modules/room/hooks';
import { useList } from 'modules/user-list/hook';

import useQueryParams from 'hooks/use-query-params/use-query-params';

import HistorySkeleton from '../history-skeleton/history-skeleton';

import cls from './user-list.module.scss';

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { data, isLoading } = useList();
  const { mutate } = useRoom();
  const [query] = useQueryParams();

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        {!isLoading ? (
          data?.map(({ text, contact: { id, photoUrl, username, email, firstName } }) => (
            <UserCard
              key={id}
              url={photoUrl}
              username={username ? `@${username}` : email}
              title={firstName || email}
              size="small"
              status="off"
              history={{ text, photoUrl, username }}
              className="custom-card"
              active={!!(+query?.setId === +id)}
              type="group"
              onClick={() => {
                mutate({ id });
              }}
            />
          ))
        ) : (
          <HistorySkeleton length={8} />
        )}
      </div>
    </div>
  );
};

export default History;
