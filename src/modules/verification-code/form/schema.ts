import * as yup from 'yup';

export const verificationSchema = yup.object().shape({
  verCode: yup.string().required('Enter the code received in your email').min(6)
});
