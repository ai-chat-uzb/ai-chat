import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { axiosPrivate } from 'service/axios';

import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Mappers, Types } from '..';

const useHistory = () => {
  const [query] = useQueryParams();
  const { messageHistory, setMessageHistory } = useMessageContext();
  const queryClient = useQueryClient();

  return useMutation<Types.IEntity.GeneralHistory, string, Types.IEntity.PaginationKey>(
    async ({ id }) => {
      const { data } = await axiosPrivate.get(`contact/${id}/`);

      return Mappers.generalHistory(data);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['history', variables.id], data);
        if (data?.items) {
          setMessageHistory([...data?.items!]);
        }
      },
      onError: (error: any) => {
        toast.error({ content: error.message });
      }
    }
  );
};

export default useHistory;
