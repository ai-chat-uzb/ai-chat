import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';
import { axiosPrivate } from 'service/axios';

import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Mappers, Types } from '..';

const useRoom = () => {
  const queryClient = useQueryClient();
  const [_, { pushQuery }] = useQueryParams<Types.IEntity.IRoom>();

  return useMutation<Types.IEntity.IRoom, string, Types.IQuery.IQueryRequest>(
    async ({ id }) => {
      const { data } = await axiosPrivate.get(`/chat_room/${id}/`);

      return Mappers.Room(data);
    },
    {
      onSuccess: (data, variables) => {
        pushQuery({ roomId: data.roomId, setId: variables.id });
        queryClient.setQueryData(['ROOM', { id: variables.id }], data);
      },
      onError: error => {
        // @ts-ignore
        toast.error(error.message);
      }
    }
  );
};

export default useRoom;
