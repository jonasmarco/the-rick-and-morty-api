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
  SearchResults,
  search,
} from '../services/rickAndMortyServices'
import { useSearchParams } from 'next/navigation'

const SearchPage = () => {
  const searchParams = useSearchParams()

  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResults | null>(null)
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
        const response = await search(query)

        setResults(response)
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
          {results?.characters.length ? (
            <Grid container spacing={2}>
              {results?.characters.map((character: Character) => (
                <Grid item key={character.id} xs={12} sm={6} md={6}>
                  <CharacterCard {...character} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No characters found.</Typography>
          )}
        </Box>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">
            Episodes found with search: {query}
          </Typography>
          {results?.episodes.length ? (
            <Grid container spacing={2}>
              {results?.episodes.map((episode: Episode) => (
                <Grid item key={episode.id} xs={12} sm={6} md={3}>
                  <EpisodeCard {...episode} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No episodes found.</Typography>
          )}
        </Box>
        <Box mt={4} mb={4}>
          <Typography variant="subtitle1">
            Locations found with search: {query}
          </Typography>
          {results?.locations.length ? (
            <Grid container spacing={2}>
              {results?.locations.map((location: Location) => (
                <Grid item key={location.id} xs={12} sm={6} md={3}>
                  <LocationCard {...location} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No locations found.</Typography>
          )}
        </Box>
      </section>
    </Container>
  )
}

export default SearchPage
