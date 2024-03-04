export type PokemonResponse = {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export type Result = {
  name: string;
  url: string;
}