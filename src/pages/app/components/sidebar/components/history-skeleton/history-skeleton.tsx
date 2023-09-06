import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import cls from './history-skeleton.module.scss';

interface HistorySkeletonProps {
  length: number;
}

const HistorySkeleton: FC<HistorySkeletonProps> = ({ length = 8 }) => {
  const data = [];

  for (let i = 1; i <= length; i++) {
    data.push(i);
  }
  return (
    <div className={cls.wrapper}>
      <div className={cls.cards}>
        {data.map(item => (
          <div key={item} className={cls.card}>
            <Skeleton width={35} height={35} highlightColor="#363A3D" baseColor="#1A1D21" borderRadius={15} />
            <div className={cls.container}>
              <div className={cls.row}>
                <Skeleton width={80} height={13} highlightColor="#363A3D" baseColor="#1A1D21" borderRadius={8} />
                <Skeleton width={50} height={13} highlightColor="#363A3D" baseColor="#1A1D21" borderRadius={8} />
              </div>
              <Skeleton width="100%" height={13} highlightColor="#363A3D" baseColor="#1A1D21" borderRadius={8} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySkeleton;
