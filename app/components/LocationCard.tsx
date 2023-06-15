import { Card, CardContent, Typography } from '@mui/material'
import { Location } from '../services/rickAndMortyServices'
import Link from 'next/link'

const LocationCard = (location: Location) => {
  return (
    <Link href={`/location/${location.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {location.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dimension: {location.dimension}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Residents: {location.residents.length}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default LocationCard
