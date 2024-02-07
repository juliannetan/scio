import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const CustomSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useImperativeHandle(ref, () => ({
    showSnackbar: (msg, type) => {
      setMessage(msg)
      setType(type)
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
      {message && (
        <Alert
          onClose={handleClose}
          severity={type === 'success' ? 'success' : 'error'}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      )}
    </Snackbar>
  )
})

export default CustomSnackbar
