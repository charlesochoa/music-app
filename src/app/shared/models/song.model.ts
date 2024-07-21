import { ArtistInterface } from '../interfaces/artist.interface';
import { CompanyInterface } from '../interfaces/company.interface';
import { SongInterface } from '../interfaces/song.interface';

export class SongModel implements SongInterface {
  id: number;
  title: string;
  poster: string;
  country?: string;
  genre: string[];
  year: number;
  duration: number;
  rating: number;
  artist?: number | ArtistInterface;
  companies?: CompanyInterface[] | number[];

  constructor(origin: SongInterface) {
    this.id = origin.id;
    this.title = origin.title;
    this.artist = origin.artist;
    this.poster = origin.poster;
    this.genre = origin.genre;
    this.year = origin.year;
    this.duration = origin.duration;
    this.rating = origin.rating;
    this.artist = origin.artist;
    this.companies = origin.companies;
  }

  getArtistName() {
    return !this.artist || typeof this.artist === 'number'
      ? 'Sin Artista'
      : `${this.artist.name}`;
  }

  getCountry() {
    const firstCompany = this.companies?.at(0);
    return !firstCompany || typeof firstCompany === 'number'
      ? 'Sin país'
      : `${firstCompany.country}`;
  }

  getCompaniesNames(): string[] {
    const firstCompany = this.companies?.at(0);
    return !firstCompany || typeof firstCompany === 'number'
      ? ['Sin Compañías']
      : (this.companies as CompanyInterface[]).map((company) => company.name);
  }
}
