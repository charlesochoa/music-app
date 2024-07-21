import { ArtistInterface } from './artist.interface';
import { CompanyInterface } from './company.interface';

export interface SongInterface {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  duration: number;
  rating: number;
  //TODO seems to be a form that implies than a song has more than one artist,
  // but this type is more related to mocked data
  artist?: ArtistInterface | number;
  companies?: CompanyInterface[] | number[];
}
