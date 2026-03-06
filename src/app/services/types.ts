

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}



export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}



export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodesResponse {
  info: ApiInfo;
  results: Episode[];
}



export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationsResponse {
  info: ApiInfo;
  results: Location[];
}



export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}
