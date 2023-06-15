import React from 'react'
import { Container, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

const FooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}))

const Footer = () => {
  const theme = useTheme()

  return (
    <FooterContainer maxWidth={false}>
      <Typography variant="h6" align="center" gutterBottom>
        Rick and Morty App
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Data provided by the{' '}
        <Link
          href="https://rickandmortyapi.com/"
          target="_blank"
          style={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
        >
          Rick and Morty API
        </Link>
      </Typography>
    </FooterContainer>
  )
}

export default Footer
