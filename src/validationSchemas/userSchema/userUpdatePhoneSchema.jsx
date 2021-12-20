import * as Yup from 'yup';

const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
// /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

export const userUpdatePhoneSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),

  // acceptedPhone: Yup.boolean()
  //   .required('Подтверждение номера телефона обязательно')
  //   .oneOf([true], 'You must accept a phone number'),
});

export const phoneSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  // acceptedPhone: Yup.boolean()
  //   .required('Подтверждение номера телефона обязательно')
  //   .oneOf([true], 'You must accept a phone number'),
});

// export default userUpdatePhoneSchema;
