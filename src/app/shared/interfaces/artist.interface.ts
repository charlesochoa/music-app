import { SongInterface } from './song.interface';

export interface ArtistInterface {
  id: number;
  name: string;
  bornCity: string;
  birthdate: Date;
  img: string;
  rating: number;
  songs?: SongInterface[] | number[];
}
