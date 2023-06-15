import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://rickandmortyapi.com/api'

export interface APIResponse<T> {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: T[]
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Record<string, any>
  location: Record<string, any>
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export type SearchResults = {
  characters: Character[]
  episodes: Episode[]
  locations: Location[]
}

export async function getFeaturedCharacters(): Promise<Character[]> {
  try {
    const response = await axios.get(`${BASE_URL}/character?page=1`)
    return response.data.results.slice(0, 6)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    return []
  }
}

export async function getFeaturedEpisodes(): Promise<Episode[]> {
  try {
    const response = await axios.get(`${BASE_URL}/episode?page=1`)
    return response.data.results.slice(0, 6)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    return []
  }
}

export async function getFeaturedLocations(): Promise<Location[]> {
  try {
    const response = await axios.get(`${BASE_URL}/location?page=1`)
    return response.data.results.slice(0, 6)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    return []
  }
}

export async function getCharacters(
  page = 1
): Promise<AxiosResponse<APIResponse<Character>>> {
  try {
    return axios.get(`${BASE_URL}/character?page=${page}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function getCharacterById(
  id: number
): Promise<AxiosResponse<Character>> {
  try {
    return axios.get(`${BASE_URL}/character/${id}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function getEpisodes(
  page = 1
): Promise<AxiosResponse<APIResponse<Episode>>> {
  try {
    return axios.get(`${BASE_URL}/episode?page=${page}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function getEpisodeById(
  id: number
): Promise<AxiosResponse<Episode>> {
  try {
    return axios.get(`${BASE_URL}/episode/${id}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function getLocations(
  page = 1
): Promise<AxiosResponse<APIResponse<Location>>> {
  try {
    return axios.get(`${BASE_URL}/location?page=${page}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function getLocationById(
  id: number
): Promise<AxiosResponse<Location>> {
  try {
    return axios.get(`${BASE_URL}/location/${id}`)
  } catch (error) {
    console.error('A error occurred, please try again:', error)
    throw error
  }
}

export async function search(query: string): Promise<SearchResults> {
  try {
    const characterResponse = await axios.get(
      `${BASE_URL}/character/?name=${query}`
    )
    const episodeResponse = await axios.get(
      `${BASE_URL}/episode/?name=${query}`
    )
    const locationResponse = await axios.get(
      `${BASE_URL}/location/?name=${query}`
    )

    return {
      characters: characterResponse.data.results,
      episodes: episodeResponse.data.results,
      locations: locationResponse.data.results,
    }
  } catch (error) {
    console.error('Failed to perform search:', error)
    return { characters: [], episodes: [], locations: [] }
  }
}
