import * as yup from 'yup';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const getCharacterValidationError = (str: string) => `Your password must have at least 1 ${str} character`;

export const createAccountSchema = yup.object().shape({
  firstName: yup.string().required('First name must be entered').trim(),
  lastName: yup.string().required('Last name must be entered').trim(),
  email: yup
    .string()
    .email('Invalid email')
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required')
    .trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  resetPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match')
});
