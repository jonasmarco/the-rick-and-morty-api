'use client'

import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import CharacterCard from '../components/CharacterCard'
import EpisodeCard from '../components/EpisodeCard'
import LocationCard from '../components/LocationCard'
import Loading from '../components/Loading'

import {
  Character,
  Episode,
  Location,
  searchCharacters,
  searchEpisodes,
  searchLocations
} from '../services/rickAndMortyServices'
import { useSearchParams } from 'next/navigation'

const SearchPage = () => {
  const searchParams = useSearchParams()

  const [query, setQuery] = React.useState('')
  const [characters, setCharacters] = React.useState<Character[]>([])
  const [episodes, setEpisodes] = React.useState<Episode[]>([])
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const urlQuery = searchParams.get('query')

    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery as string)
    }
  }, [query, searchParams])

  React.useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const characterResponse = await searchCharacters(query)
        const episodeResponse = await searchEpisodes(query)
        const locationResponse = await searchLocations(query)

        setCharacters(characterResponse)
        setEpisodes(episodeResponse)
        setLocations(locationResponse)
      } catch (err) {
        setError(`Nothing found with search "${query}". Please try again.`)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">{error}</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <section>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">
            Characters found with search: {query}
          </Typography>
          {characters.length ? (
            <Grid container spacing={2}>
              {characters.map((character: Character) => (
                <Grid item key={character.id} xs={12} sm={6} md={6}>
                  <CharacterCard {...character} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No characters found with search: {query}</Typography>
          )}
        </Box>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">
            Episodes found with search: {query}
          </Typography>
          {episodes.length ? (
            <Grid container spacing={2}>
              {episodes.map((episode: Episode) => (
                <Grid item key={episode.id} xs={12} sm={6} md={3}>
                  <EpisodeCard {...episode} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No episodes found with search: {query}</Typography>
          )}
        </Box>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">
            Locations found with search: {query}
          </Typography>
          {locations.length ? (
            <Grid container spacing={2}>
              {locations.map((location: Location) => (
                <Grid item key={location.id} xs={12} sm={6} md={3}>
                  <LocationCard {...location} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No locations found with search: {query}</Typography>
          )}
        </Box>
      </section>
    </Container>
  )
}

export default SearchPage
