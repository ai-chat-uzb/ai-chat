import { FC } from 'react';
import { Main } from 'layout';

import { UserSettingsModal } from './components/settings';
import { Content, Sidebar } from './components';

interface AppProps {}
const App: FC<AppProps> = () => (
  <>
    <UserSettingsModal />
    <Main leftChildren={<Sidebar />} rightChildren={<Content />} />
  </>
);

export default App;
