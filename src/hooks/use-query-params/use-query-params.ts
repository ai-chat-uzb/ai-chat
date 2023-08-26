import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString, { ParseOptions } from 'query-string';

import useHistoryWithQuery from './use-history-with-query';

export interface IQuery {
  [key: string]: string | number;
}
export default <T extends object = Record<string, string>>(queryOptions?: ParseOptions): [T, any] => {
  const { search } = useLocation();
  const history = useHistoryWithQuery(queryOptions!);

  const updateURL = (type: keyof typeof history, update: any) => history[type]({ query: update });

  const query = useMemo(() => queryString.parse(search, queryOptions) as IQuery, [search, queryOptions]) as T;

  const pushQuery = useCallback(update => updateURL('push', update), [history]) as (update: object) => void;

  const replaceQuery = useCallback(update => updateURL('replace', update), [history]) as (update: object) => void;

  return [query, { pushQuery, replaceQuery }];
};
