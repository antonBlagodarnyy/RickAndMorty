export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: { id: number; name: string }[];
  url: string;
  created: string;
}
