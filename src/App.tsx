import { FC } from 'react';
import { CreateAccount } from 'pages';

import 'assets/styles/main.scss';

interface AppProps {}

export const App: FC<AppProps> = () => (
  <>
    <CreateAccount />
    {/* <Login /> */}
  </>
);
