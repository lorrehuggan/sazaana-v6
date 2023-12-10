export type Features = {
  [feature: string]: number[];
};

export type AudioFeatures = {
  acousticness: number[];
  danceability: number[];
  energy: number[];
  valence: number[];
};

export type Result<T> =
  | { kind: 'success'; data: T; status: number }
  | { kind: 'error'; error: string; status: number };
