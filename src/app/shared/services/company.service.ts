import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_ENDPOINT } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompanyInterface } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${SERVER_ENDPOINT}companies`;
  constructor(private http: HttpClient) {}

  get(): Observable<CompanyInterface[]> {
    return this.http.get<CompanyInterface[]>(this.apiUrl);
  }
}
