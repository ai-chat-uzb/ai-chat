import get from 'lodash.get';

import { Types } from '.';

export const Room = (data: Types.IApi.Response): Types.IEntity.IRoom => ({ roomName: get(data, 'room_name') });
