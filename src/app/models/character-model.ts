export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string; id: number };
  location: { name: string; url: string; id: number };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
