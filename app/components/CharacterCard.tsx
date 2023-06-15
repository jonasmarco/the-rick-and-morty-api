import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Character } from '../services/rickAndMortyServices'
import Link from 'next/link'

const CharacterCard = (character: Character) => {
  return (
    <Link
      href={`/character/${character.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        sx={{ display: 'flex', height: '100%', backgroundColor: '#3c3e44' }}
      >
        <CardMedia
          sx={{ width: '40%', objectFit: 'cover' }}
          alt={character.name}
          component="img"
          height="100%"
          image={character.image}
        />
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2">Status: {character.status}</Typography>
          <Typography variant="body2">
            Gender: {character.gender} - {character.species}
          </Typography>
          <Typography variant="body2">
            Origin: {character.origin.name}
          </Typography>
          <Typography variant="body2">
            Episodes: {character.episode.length}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CharacterCard
