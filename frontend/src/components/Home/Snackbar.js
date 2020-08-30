import React from 'react'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

export default function CustomSnackbar(props) {
  const { code, message, open, handleClose } = props
  const severity = {
    0: 'success',
    1: 'warning',
    2: 'error'
  }

  return (
    <Snackbar
      key={'topcenter'}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severity[code]}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
