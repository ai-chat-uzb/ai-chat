import React, { FC, ReactNode } from 'react';

import cls from './main.module.scss';

interface MainProps {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
}

const Main: FC<MainProps> = ({ leftChildren, rightChildren }) => (
  <div className={cls.wrapper}>
    <div className={cls.container}>
      <div className={cls.left}>{leftChildren}</div>
      <div className={cls.right}>{rightChildren}</div>
    </div>
  </div>
);

export default Main;
