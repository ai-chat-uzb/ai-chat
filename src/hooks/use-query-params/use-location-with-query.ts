import { useLocation } from 'react-router';
import { ParseOptions } from 'query-string';

import withParsedQuery from './with-parsed-query';

export default ({ queryOptions }: { queryOptions: ParseOptions }) => {
  const location = useLocation();

  return withParsedQuery(location, queryOptions);
};
