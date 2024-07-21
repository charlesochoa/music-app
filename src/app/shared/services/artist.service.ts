import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_ENDPOINT } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ArtistInterface } from '../interfaces/artist.interface';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = `${SERVER_ENDPOINT}artists`;
  constructor(private http: HttpClient) {}

  get(): Observable<ArtistInterface[]> {
    return this.http.get<ArtistInterface[]>(this.apiUrl);
  }
}
