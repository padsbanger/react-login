import React, { useState } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Button, Snackbar, Dialog } from '@material-ui/core'

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
  const [loading, setLoading] = useState(false)
  const handleSubmit = (
    values: User,
    { setSubmitting, resetForm }: FormikHelpers<User>
  ) => {
    setLoginStatus('')
    setLoginMessage(null)
    setLoading(true)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(values),
    })
      .then((response) => {
        setLoading(false)
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
        console.log(error.message)
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
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Dialog
        onClose={() => setLoginStatus('')}
        aria-labelledby="simple-dialog-title"
        open={!!loginStatus.length}
      >
        <div>{loginMessage}</div>
      </Dialog>
    </>
  )
}

export default LoginForm
