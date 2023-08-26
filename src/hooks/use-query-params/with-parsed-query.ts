import { Location } from 'react-router';
import queryString, { ParseOptions } from 'query-string';

export default (location: Location, options: ParseOptions) => ({
  ...location,
  query: queryString.parse(location.search, options)
});
