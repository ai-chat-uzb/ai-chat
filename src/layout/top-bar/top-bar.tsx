import { FC, ReactNode } from 'react';

import cls from './top-bar.module.scss';

interface TopBarProps {
  leftElement?: ReactNode;
  centerElement?: ReactNode;
  rightElement?: ReactNode;
}

const TopBar: FC<TopBarProps> = ({ leftElement, centerElement, rightElement }) => (
  <div className={cls.wrapper}>
    <div>{leftElement}</div> <div>{centerElement}</div> <div>{rightElement}</div>
  </div>
);

export default TopBar;
