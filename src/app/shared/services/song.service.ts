import { Injectable } from '@angular/core';
import { SongInterface } from '../interfaces/song.interface';
import { HttpClient } from '@angular/common/http';
import { SERVER_ENDPOINT } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private apiUrl = `${SERVER_ENDPOINT}songs`;
  constructor(private http: HttpClient) {}

  get(): Observable<SongInterface[]> {
    return this.http.get<SongInterface[]>(this.apiUrl);
  }
}
