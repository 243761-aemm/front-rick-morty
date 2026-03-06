import type {
  CharactersResponse,
  Character,
  EpisodesResponse,
  LocationsResponse,
  CharacterFilters,
  EpisodeFilters,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';



async function apiFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}



export async function getCharacters(filters: CharacterFilters = {}): Promise<CharactersResponse> {
  return apiFetch<CharactersResponse>('/api/characters', {
    page: filters.page,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });
}

export async function getCharacterById(id: number): Promise<Character> {
  return apiFetch<Character>(`/api/characters/${id}`);
}



export async function getEpisodes(filters: EpisodeFilters = {}): Promise<EpisodesResponse> {
  return apiFetch<EpisodesResponse>('/api/episodes', {
    page: filters.page,
    name: filters.name,
    episode: filters.episode,
  });
}



export async function getLocations(page = 1): Promise<LocationsResponse> {
  return apiFetch<LocationsResponse>('/api/locations', { page });
}
