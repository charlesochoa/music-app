import { SongInterface } from './song.interface';

export interface CompanyInterface {
  id: number;
  name: string;
  country: string;
  createYear: number;
  employees: number;
  rating: number;
  songs?: number[]; //TODO not required to be songInterface for now
}
