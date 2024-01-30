import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Please enter your email'
    },
    pattern: {
      value:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: 'Please enter a valid email'
    },
    maxLength: {
      value: 160,
      message: 'Maximum 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Minimum 5 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Please enter your password'
    },
    maxLength: {
      value: 160,
      message: 'Maximum 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Minimum 5 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Please enter your password'
    },
    maxLength: {
      value: 160,
      message: 'Maximum 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Minimum 5 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Please re enter your password'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Please re enter your password')
    .min(5, 'Minimum 5 characters')
    .max(160, 'Maximum 160 characters')
    .oneOf([yup.ref(refString)], 'Please re enter your password')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email')
    .min(5, 'Minimum 5 characters')
    .max(160, 'Maximum 160 characters'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(5, 'Minimum 5 characters')
    .max(160, 'Maximum 160 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Unvalid price is not allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Unvalid price is not allowed',
    test: testPriceMinMax
  }),
  name: yup.string().required('Name is required').trim()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Maximum 160 characters'),
  phone: yup.string().max(20, 'Maximum 20 characters'),
  address: yup.string().max(160, 'Maximum 160 characters'),
  avatar: yup.string().max(160, 'Maximum 1000 characters'),
  date_of_birth: yup.date().max(new Date()),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
