// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'ai-ui-kit/lib/components';

// import { useAuth, useQueryParams } from 'hooks';

// import { CreateAccount } from '../api';
// import { Types } from '..';

// const useCreateAccount = () => {
//   const { login } = useAuth();
//   const queryClient = useQueryClient();
//   const [_, { pushQuery }] = useQueryParams<{ verification: string }>();

//   const mutation = useMutation(
//     async ({ firstName, lastName, email, password }: Types.IQuery.CreateAccountRequest) => {
//       const { data } = await CreateAccount({ first_name: firstName, last_name: lastName, email, password });

//       return data;
//     },
//     {
//       onSuccess: data => {
//         toast.success('🎉 Success');
//         queryClient.setQueryData(['create-account'], data);
//         login({
//           firstName: data.first_name,
//           email: data.email,
//           lastName: data.last_name,
//           id: data.id,
//           password: data.password,
//           avatarUrl: '',
//           username: ''
//         });
//         pushQuery({ verification: 'verification' });
//       },
//       onError: (err: { message: string }) => toast.error(`🎉 ${err?.message}`),
//       mutationKey: ['create-account']
//     }
//   );

//   return mutation;
// };

// export default useCreateAccount;
