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
  episodes: { url: string; id: number }[];
  url: string;
  created: string;
}
