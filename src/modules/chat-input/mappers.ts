import get from 'lodash.get';

import { Types } from '.';

export const lastMessage = (item: Types.IChat.Response): Types.IEntity.Message => ({
  userId: get(item, 'user_id'),
  message: get(item, 'message'),
  timeCreated: get(item, 'time')
});
