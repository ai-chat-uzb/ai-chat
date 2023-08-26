import get from 'lodash.get';

import { Types } from '.';

export const Date = (item: any): Types.IEntity.ISearchListItem => ({
  id: get(item, 'id'),
  firstName: get(item, 'first_name'),
  lastName: get(item, 'last_name'),
  email: get(item, 'email'),
  photoUrl: get(item, 'photo_url', ''),
  username: get(item, 'username', ''),
  lastLogin: get(item, 'last_login')
});

export const SearchList = (item: Types.IApi.ISearchResponse): Types.IEntity.ISearchList => ({
  users: (get(item, 'users') || []).map(Date)
});
