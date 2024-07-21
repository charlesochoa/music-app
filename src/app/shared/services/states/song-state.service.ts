import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, tap } from 'rxjs';
import { SongInterface } from '../../interfaces/song.interface';
import { SongService } from '../song.service';
import { ArtistService } from '../artist.service';
import { ArtistInterface } from '../../interfaces/artist.interface';
import { SongModel } from '../../models/song.model';
import { CompanyService } from '../company.service';
import { CompanyInterface } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class SongStateService {
  private songsSubject: BehaviorSubject<SongModel[]> = new BehaviorSubject<
    SongModel[]
  >([]);
  public songs$: Observable<SongModel[]> = this.songsSubject.asObservable();

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private companyService: CompanyService
  ) {
    this.load();
  }

  load(): void {
    forkJoin({
      songs: this.songService.get(),
      artists: this.artistService.get(),
      companies: this.companyService.get(),
    })
      .pipe(
        map(({ songs, artists, companies }) =>
          this.getSongListComplete(songs, artists, companies)
        )
      )
      .subscribe({
        next: (songs) => {
          this.songsSubject.next(songs);
        },
      });
  }

  getSongListComplete(
    songs: SongInterface[],
    artists?: ArtistInterface[],
    companies?: CompanyInterface[]
  ): SongModel[] {
    return songs.map(
      (song) =>
        new SongModel({
          ...song,
          artist: artists?.find((artist) => song.artist === artist.id),
          companies:
            companies?.filter((company) =>
              company.songs?.some((songId) => song.id === songId)
            ) || [],
        })
    );
  }

  getSongById(id: number): SongModel | undefined {
    const currentSongs = this.songsSubject.getValue();
    return currentSongs.find((song) => song.id === id);
  }
}