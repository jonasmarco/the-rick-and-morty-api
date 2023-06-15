import React from 'react'
import { Character, getCharacters } from '../services/rickAndMortyServices'
import CharacterCard from './CharacterCard'
import { Grid, Box, styled, Typography, Pagination } from '@mui/material'
import Loading from './Loading'

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: '3.2rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}))

const CharacterList = () => {
  const [characters, setCharacters] = React.useState<Character[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharacters(page)

      setCount(response.data.info.count)
      setCharacters(response.data.results)
      setLoading(false)
    }

    fetchCharacters()
  }, [page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <section>
      <Box mt={4}>
        <ResponsiveTypography variant="h2">
          All Characters! <Typography variant="caption">({count})</Typography>
        </ResponsiveTypography>
      </Box>
      <Box mt={4} mb={4}>
        <Grid container spacing={2}>
          {characters.map((character, index) => (
            <Grid item key={character.id} xs={12} sm={6} md={6}>
              <CharacterCard key={index} {...character} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={Math.ceil(count / 20)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </section>
  )
}

export default CharacterList
