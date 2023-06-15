import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, styled } from '@mui/material/styles'
import HeaderMenu from './HeaderMenu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const Header = () => {
  const router = useRouter()
  const [query, setQuery] = React.useState('')

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    router.push(`/search?query=${query}`)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Grid item xs={isMobile ? 6 : 3}>
            <Link
              href="/"
              passHref
              style={{
                color: theme.palette.background.default,
                textDecoration: 'none',
              }}
            >
              <Typography variant="h6" noWrap>
                Rick and Morty App
              </Typography>
            </Link>
          </Grid>
          {!isMobile && (
            <Grid item xs={6}>
              <form onSubmit={handleSearch}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Search>
              </form>
            </Grid>
          )}
          <Grid item xs={isMobile ? 6 : 3}>
            <HeaderMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
