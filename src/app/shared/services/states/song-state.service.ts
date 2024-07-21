import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, tap } from 'rxjs';
import { SongInterface } from '../../interfaces/song.interface';
import { SongService } from '../song.service';
import { ArtistService } from '../artist.service';
import { ArtistInterface } from '../../interfaces/artist.interface';

@Injectable({
  providedIn: 'root',
})
export class SongStateService {
  private songsSubject: BehaviorSubject<SongInterface[]> = new BehaviorSubject<
    SongInterface[]
  >([]);
  public songs$: Observable<SongInterface[]> = this.songsSubject.asObservable();

  constructor(
    private songService: SongService,
    private artistService: ArtistService
  ) {
    this.load();
  }

  load(): void {
    forkJoin({
      songs: this.songService.get(),
      artists: this.artistService.get(),
    })
      .pipe(
        map(({ songs, artists }) => this.getSongListComplete(songs, artists))
      )
      .subscribe({
        next: (songs) => {
          this.songsSubject.next(songs);
        },
      });
  }

  getSongListComplete(
    songs: SongInterface[],
    artists: ArtistInterface[]
  ): SongInterface[] {
    return songs.map((song) => ({
      ...song,
      artist: artists.find((artist) => song.artist === artist.id),
    }));
  }
}
