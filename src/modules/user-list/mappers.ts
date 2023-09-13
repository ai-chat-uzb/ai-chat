import get from 'lodash.get';

import { Types } from '.';

const user = (item: Types.IApi.IHistoryResponse): Types.IEntity.IHistory => ({
  id: get(item, 'id'),
  text: get(item, 'text'),
  timeCreated: get(item, 'time_created'),
  ownerId: {
    id: get(item, 'owner_id.id'),
    email: get(item, 'owner_id.email'),
    lastLogin: get(item, 'owner_id.last_login'),
    firstName: get(item, 'owner_id.first_name'),
    lastName: get(item, 'owner_id.last_name'),
    photoUrl: get(item, 'owner_id.photo_url'),
    username: get(item, 'owner_id.username')
  },
  sentId: {
    id: get(item, 'sent_id.id'),
    email: get(item, 'sent_id.email'),
    lastLogin: get(item, 'sent_id.last_login'),
    firstName: get(item, 'sent_id.first_name'),
    lastName: get(item, 'sent_id.last_name'),
    photoUrl: get(item, 'sent_id.photo_url'),
    username: get(item, 'sent_id.username')
  }
});

export const userList = (data: Types.IApi.Response): Types.IEntity.IHistoryList => (data || []).map(user);
