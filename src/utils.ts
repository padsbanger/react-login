import { FormikErrors } from 'formik'
import { User } from './types/User'

export const validate = (values: User) => {
  let errors: FormikErrors<User> = {}
  if (!values.password) {
    errors.password = 'Password is required'
  }
  if (values.password.length < 5) {
    errors.password = 'Password length is at least 5 characters long.'
  }
  if (!values.email) {
    errors.email = 'Email is required'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export default validate
