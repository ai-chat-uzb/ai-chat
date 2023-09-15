import get from 'lodash.get';

import { Types } from '.';

const history = (item: Types.IApi.Response): Types.IEntity.History => ({
  id: get(item, 'id'),
  userId: get(item, 'owner_id'),
  sentId: get(item, 'sent_id'),
  message: get(item, 'message'),
  timeCreated: get(item, 'time_created')
});

export const generalHistory = (item: Types.IApi.Response[]): Types.IEntity.GeneralHistory => ({
  items: (item || []).map(history)
});
