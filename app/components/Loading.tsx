import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h4" color="textPrimary">
        Loading...
      </Typography>
      <CircularProgress />
    </Box>
  )
}

export default Loading
