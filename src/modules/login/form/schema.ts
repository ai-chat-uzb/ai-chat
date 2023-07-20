import * as yup from 'yup';

const getCharacterValidationError = (str: string) => `Your password must have at least 1 ${str} character`;

export const loginSchema = yup.object().shape({
  firstName: yup.string().required('First name must be entered').trim(),
  // email: yup
  //   .string()
  //   .email('Invalid email')
  //   .matches(EMAIL_REGEX, 'Invalid email address')
  //   .required('Email is required')
  //   .trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
});
