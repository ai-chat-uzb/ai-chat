import React, { FC } from 'react';
import { UserCard } from 'ai-ui-kit/lib/components';
import { useHistory } from 'modules/history/hook';
import { useRoom } from 'modules/room/hooks';

import loader from 'assets/images/loader/loader.svg';

import cls from './history.module.scss';

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { data, isLoading } = useHistory();
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
              onClick={() => mutate({ id })}
            />
          ))
        ) : (
          <div className={cls.loader}>
            <img src={loader} alt="loader" className={cls.load} />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
