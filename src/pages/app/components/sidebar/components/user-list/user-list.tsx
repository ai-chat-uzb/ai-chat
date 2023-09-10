import React, { FC } from 'react';
import { toast, UserCard } from 'ai-ui-kit/lib/components';
import { useRoom } from 'modules/room/hooks';
import { useList } from 'modules/user-list/hook';

import HistorySkeleton from '../history-skeleton/history-skeleton';

import cls from './user-list.module.scss';

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { data, isLoading } = useList();
  const { mutate } = useRoom();

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        {!isLoading ? (
          data?.map(({ text, sentId: { id, photoUrl, username, email, firstName } }) => (
            <UserCard
              key={id}
              url={photoUrl}
              username={username ? `@${username}` : email}
              title={firstName || email}
              size="small"
              status="off"
              history={{ text, photoUrl, username }}
              className="custom-card"
              onClick={() => {
                mutate({ id });
                toast.success({ content: `Contact was established with ${username || firstName}` });
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
