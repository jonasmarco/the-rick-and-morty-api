'use client'

import React from 'react'

import {
  Character,
  getFeaturedCharacters,
  Episode,
  getFeaturedEpisodes,
  Location,
  getFeaturedLocations,
} from './services/rickAndMortyServices'
import { Box, Button, Container, Grid, Typography, styled } from '@mui/material'
import CharacterCard from './components/CharacterCard'
import EpisodeCard from './components/EpisodeCard'
import LocationCard from './components/LocationCard'
import Loading from './components/Loading'
import Link from 'next/link'

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '2.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}))

const ResponsiveTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

const Home = () => {
  const [characters, setCharacters] = React.useState<Character[]>([])
  const [episodes, setEpisodes] = React.useState<Episode[]>([])
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchFeaturedItems = async () => {
      const featuredCharacters = await getFeaturedCharacters()
      const featuredEpisodes = await getFeaturedEpisodes()
      const featuredLocations = await getFeaturedLocations()

      setCharacters(featuredCharacters)
      setEpisodes(featuredEpisodes)
      setLocations(featuredLocations)
      setLoading(false)
    }

    fetchFeaturedItems()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        <Box mt={4}>
          <ResponsiveTypography variant="h2">
            Welcome to Rick and Morty App!
          </ResponsiveTypography>
        </Box>

        <Box mt={4} mb={4}>
          <ResponsiveTitle variant="h4">Featured Characters</ResponsiveTitle>
          <Box mb={4}>
            <Grid container spacing={2}>
              {characters.map((character) => (
                <Grid item key={character.id} xs={12} sm={6} md={4}>
                  <CharacterCard {...character} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Link href="/characters" passHref>
            <Button variant="contained" color="primary">
              See All Characters
            </Button>
          </Link>
        </Box>

        <Box mt={4} mb={4}>
          <ResponsiveTitle variant="h4">Featured Episodes</ResponsiveTitle>
          <Box mb={4}>
            <Grid container spacing={2}>
              {episodes.map((episode) => (
                <Grid item key={episode.id} xs={12} sm={6} md={4}>
                  <EpisodeCard {...episode} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Link href="/episodes" passHref>
            <Button variant="contained" color="primary">
              See All Episodes
            </Button>
          </Link>
        </Box>

        <Box mt={4} mb={4}>
          <ResponsiveTitle variant="h4">Featured Locations</ResponsiveTitle>
          <Box mb={4}>
            <Grid container spacing={2}>
              {locations.map((location) => (
                <Grid item key={location.id} xs={12} sm={6} md={4}>
                  <LocationCard {...location} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Link href="/locations" passHref>
            <Button variant="contained" color="primary">
              See All Locations
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  )
}

export default Home
