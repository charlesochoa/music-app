import { SongInterface } from './song.interface';

export interface CompanyInterface {
  id: number;
  name: string;
  country: string;
  createYear: number;
  employees: number;
  rating: number;
  songs?: SongInterface | number[];
}
