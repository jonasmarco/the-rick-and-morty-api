import { Card, CardContent, Typography } from '@mui/material'
import { Episode } from '../services/rickAndMortyServices'
import Link from 'next/link'

const EpisodeCard = (episode: Episode) => {
  return (
    <Link href={`/episode/${episode.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {episode.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Episode: {episode.episode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Air date: {episode.air_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Characters: {episode.characters.length}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default EpisodeCard
