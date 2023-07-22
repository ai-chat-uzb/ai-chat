import { FC } from 'react';
import { Main } from 'layout';

import { Content, Sidebar } from './components';

interface AppProps {}
const App: FC<AppProps> = () => <Main leftChildren={<Sidebar />} rightChildren={<Content />} />;

export default App;
