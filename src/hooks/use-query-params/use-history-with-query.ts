import { useMemo } from 'react';
import { NavigateFunction, To, useLocation, useNavigate } from 'react-router-dom';
import queryString, { ParseOptions } from 'query-string';

import withParsedQuery from './with-parsed-query';

const navigateWithQuery = (navigateMethod: NavigateFunction, options: ParseOptions) => (location: any, state: any) => {
  if (typeof location === 'object' && location?.query)
    navigateMethod({
      ...location,
      state,
      search: `?${queryString.stringify(location.query, options)}`
    });
  else navigateMethod(location, state);
};

export default (queryOptions: ParseOptions) => {
  const navigate = useNavigate();
  const location = useLocation();

  const historyWithQuery = useMemo(
    () =>
      Object.create(navigate, {
        location: {
          get: () => withParsedQuery(location, queryOptions)
        },
        push: {
          value: navigateWithQuery(navigate, queryOptions)
        },
        replace: {
          value: navigateWithQuery(((to: To) => navigate(to, { replace: true })) as NavigateFunction, queryOptions)
        }
      }),
    [navigate, queryOptions]
  );

  return historyWithQuery;
};
