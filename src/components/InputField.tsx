import React, { memo, useCallback } from 'react'
import { fieldToTextField, TextFieldProps } from 'formik-material-ui'
import MuiTextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const InputField: React.SFC<TextFieldProps> = (props) => {
  const {
    form: { setFieldValue },
    field: { name },
  } = props
  const onChange = useCallback(
    (event) => {
      const { value } = event.target
      setFieldValue(name, value)
    },
    [setFieldValue, name]
  )
  return (
    <StyledMuiTextField
      {...fieldToTextField(props)}
      fullWidth
      onChange={onChange}
    />
  )
}

const StyledMuiTextField = styled(MuiTextField)`
  margin: 1rem 0;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`

export default memo(InputField)
