import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const CustomSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useImperativeHandle(ref, () => ({
    showSnackbar: (msg) => {
      setMessage(msg)
      setOpen(true)
    },
  }))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={handleClose}
        severity='success'
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
})

export default CustomSnackbar
