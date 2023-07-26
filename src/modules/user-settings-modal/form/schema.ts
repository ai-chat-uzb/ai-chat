import * as yup from 'yup';

export const userSettings = yup.object().shape({
  username: yup.string().required('Username is required').min(5)
});
