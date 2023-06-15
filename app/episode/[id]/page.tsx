'use client'

import React from 'react'

import { Episode, getEpisodeById } from '../../services/rickAndMortyServices'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Chip,
  Button,
} from '@mui/material'
import Loading from '../../components/Loading'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { getIdFromUrl } from '../../utils/getIdFromUrl'

const Episode = ({ params }: { params: { id: number } }) => {
  const [episode, setEpisode] = React.useState<Episode>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchEpisode = async () => {
      const response = await getEpisodeById(params.id)

      setEpisode(response.data)
      setLoading(false)
    }

    fetchEpisode()
  }, [params.id])

  if (loading) {
    return <Loading />
  }

  if (!episode) {
    return <Typography>Episode not found!</Typography>
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Link href="/episodes" passHref>
          <Button startIcon={<ArrowBackIcon />}>Back to episodes list</Button>
        </Link>
        <Card>
          <CardContent>
            <Typography variant="h5">{episode.name}</Typography>
            <Typography variant="subtitle1">
              Air Date: {episode.air_date}
            </Typography>
            <Typography variant="subtitle1">
              Episode: {episode.episode}
            </Typography>
            <Typography variant="subtitle1">
              Characters: {episode.characters.length}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '10px',
              padding: '16px',
            }}
          >
            <Typography variant="subtitle1">Characters List:</Typography>
            {episode.characters.map((characterUrl) => {
              const characterId = getIdFromUrl(characterUrl)
              return (
                <Link
                  key={characterId}
                  href={`/character/${characterId}`}
                  passHref
                >
                  <Chip
                    label={`Character ${characterId}`}
                    clickable
                    color="primary"
                  />
                </Link>
              )
            })}
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default Episode
