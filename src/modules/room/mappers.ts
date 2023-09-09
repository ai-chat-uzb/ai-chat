import get from 'lodash.get';

import { Types } from '.';

export const Room = (data: Types.IApi.Response): Types.IEntity.IRoom => ({ roomId: get(data, 'room_name') });
