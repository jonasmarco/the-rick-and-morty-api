'use client'

import React from 'react'

import { Location, getLocationById } from '../../services/rickAndMortyServices'
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

const Location = ({ params }: { params: { id: number } }) => {
  const [location, setLocation] = React.useState<Location>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchLocation = async () => {
      const response = await getLocationById(params.id)

      setLocation(response.data)
      setLoading(false)
    }

    fetchLocation()
  }, [params.id])

  if (loading) {
    return <Loading />
  }

  if (!location) {
    return <Typography>Location not found!</Typography>
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Link href="/locations" passHref>
          <Button startIcon={<ArrowBackIcon />}>Back to locations list</Button>
        </Link>
        <Card>
          <CardContent>
            <Typography variant="h5">{location.name}</Typography>
            <Typography variant="subtitle1">Type: {location.type}</Typography>
            <Typography variant="subtitle1">
              Dimension: {location.dimension}
            </Typography>
            <Typography variant="subtitle1">
              Residents: {location.residents.length}
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
            <Typography variant="subtitle1">Residents List:</Typography>
            {location.residents.map((residentUrl) => {
              const residentId = getIdFromUrl(residentUrl)
              return (
                <Link
                  key={residentId}
                  href={`/character/${residentId}`}
                  passHref
                >
                  <Chip
                    label={`Resident ${residentId}`}
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

export default Location
