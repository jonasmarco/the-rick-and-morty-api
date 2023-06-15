import { Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'

const HeaderMenu = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      spacing={2}
      justifyContent={isMobile ? 'center' : 'flex-end'}
      flexWrap={isMobile ? 'nowrap' : 'wrap'}
    >
      <Grid item>
        <Link href="/characters" passHref>
          <Button style={{ color: theme.palette.text.primary }}>
            Characters
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/episodes" passHref>
          <Button style={{ color: theme.palette.text.primary }}>
            Episodes
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/locations" passHref>
          <Button style={{ color: theme.palette.text.primary }}>
            Locations
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default HeaderMenu
