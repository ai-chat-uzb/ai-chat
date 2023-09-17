import get from 'lodash.get';

import { Types } from '.';

const user = (item: Types.IApi.IUserResponse): Types.IEntity.IUser => ({
  id: get(item, 'id'),
  text: get(item, 'text'),
  timeCreated: get(item, 'time_created'),
  contact: {
    id: get(item, 'contact.id'),
    email: get(item, 'contact.email'),
    lastLogin: get(item, 'contact.last_login'),
    firstName: get(item, 'contact.first_name'),
    lastName: get(item, 'contact.last_name'),
    photoUrl: get(item, 'contact.photo_url'),
    username: get(item, 'contact.username')
  }
});

export const userList = (data: Types.IApi.Response): Types.IEntity.IUserList => (data || []).map(user);
