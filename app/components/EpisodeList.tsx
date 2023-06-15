import React from 'react'
import { Episode, getEpisodes } from '../services/rickAndMortyServices'
import EpisodeCard from './EpisodeCard'
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

const EpisodeList = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await getEpisodes(page)

      setCount(response.data.info.count)
      setEpisodes(response.data.results)
      setLoading(false)
    }

    fetchEpisodes()
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
          All Episodes! <Typography variant="caption">({count})</Typography>
        </ResponsiveTypography>
      </Box>
      <Box mt={4} mb={4}>
        <Grid container spacing={2}>
          {episodes.map((episode, index) => (
            <Grid item key={episode.id} xs={12} sm={6} md={3}>
              <EpisodeCard key={index} {...episode} />
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

export default EpisodeList
