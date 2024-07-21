import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ArtistInterface } from '../../interfaces/artist.interface';
import { ArtistService } from '../artist.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistStateService {
  private artistsSubject: BehaviorSubject<ArtistInterface[]> =
    new BehaviorSubject<ArtistInterface[]>([]);
  public artists$: Observable<ArtistInterface[]> =
    this.artistsSubject.asObservable();

  constructor(private artistService: ArtistService) {
    this.load();
  }

  load() {
    this.artistService
      .get()
      .pipe(tap((artists) => this.artistsSubject.next(artists)))
      .subscribe();
  }
}
