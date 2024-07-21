import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SongInterface } from '../interfaces/song.interface';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root',
})
export class SongStateService {
  private songsSubject: BehaviorSubject<SongInterface[]> = new BehaviorSubject<
    SongInterface[]
  >([]);
  public songs$: Observable<SongInterface[]> = this.songsSubject.asObservable();

  constructor(private songService: SongService) {
    this.load();
  }

  load() {
    this.songService
      .get()
      .pipe(tap((songs) => this.songsSubject.next(songs)))
      .subscribe();
  }
}
