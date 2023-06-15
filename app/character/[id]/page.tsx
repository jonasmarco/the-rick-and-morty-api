'use client'

import React from 'react'

import {
  Character,
  getCharacterById,
} from '../../services/rickAndMortyServices'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material'
import Loading from '../../components/Loading'

import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'
import Link from 'next/link'
import { getIdFromUrl } from '../../utils/getIdFromUrl'

const Character = ({ params }: { params: { id: number } }) => {
  const [character, setCharacter] = React.useState<Character>()
  const [loading, setLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    const fetchCharacter = async () => {
      const response = await getCharacterById(params.id)

      setCharacter(response.data)
      setLoading(false)
    }

    fetchCharacter()
  }, [params.id])

  if (loading) {
    return <Loading />
  }

  if (!character) {
    return <Typography>Character not found!</Typography>
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Link href="/characters" passHref>
          <Button startIcon={<ArrowBackIcon />}>Back to characters list</Button>
        </Link>
        <Card>
          <Box position="relative">
            <CardMedia
              component="img"
              height="550"
              image={character.image}
              alt={character.name}
            />
            <IconButton
              onClick={handleOpen}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <ZoomInIcon />
            </IconButton>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <Image
              src={character.image}
              alt={character.name}
              quality={100}
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </Dialog>
          <CardContent>
            <Typography variant="h5">{character.name}</Typography>
            <Typography variant="subtitle1">
              Status: {character.status}
            </Typography>
            <Typography variant="subtitle1">
              Species: {character.species}
            </Typography>
            <Typography variant="subtitle1">
              Gender: {character.gender}
            </Typography>
            <Typography variant="subtitle1">
              Origin: {character.origin.name}
            </Typography>
            <Typography variant="subtitle1">
              Location: {character.location.name}
            </Typography>
            <Typography variant="subtitle1">
              Episodes: {character.episode.length}
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
            <Typography variant="subtitle1">Episodes List:</Typography>
            {character.episode.map((episodeUrl) => {
              const episodeId = getIdFromUrl(episodeUrl)
              return (
                <Link key={episodeId} href={`/episode/${episodeId}`} passHref>
                  <Chip
                    label={`Episode ${episodeId}`}
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

export default Character
