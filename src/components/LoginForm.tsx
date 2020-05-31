import React, { useState } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { User } from '../types/User'
import { validate } from '../utils'

import InputField from '../components/InputField'

const initialValues: User = {
  email: '',
  password: '',
}

function LoginForm() {
  const [loginStatus, setLoginStatus] = useState<'' | 'error' | 'success'>('')
  const [loginMessage, setLoginMessage] = useState<null | string>(null)
  const handleSubmit = (
    values: User,
    { setSubmitting, resetForm }: FormikHelpers<User>
  ) => {
    setLoginStatus('')
    setLoginMessage(null)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(values),
    })
      .then((response) => {
        setSubmitting(false)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(({ message }) => {
        resetForm()
        setLoginStatus('success')
        setLoginMessage(message as string)
      })
      .catch((error: Error) => {
        setLoginMessage(error.message)
        setLoginStatus('error')
      })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" autoCorrect="off">
            <Field
              component={InputField}
              name="email"
              type="email"
              label="Email"
            />
            <Field
              component={InputField}
              name="password"
              type="password"
              label="Password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      {loginStatus ? (
        <Alert style={{ marginTop: '1rem' }} severity={loginStatus}>
          {loginMessage}
        </Alert>
      ) : null}
    </>
  )
}

export default LoginForm
