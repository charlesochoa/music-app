import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CompanyInterface } from '../../interfaces/company.interface';
import { CompanyService } from '../company.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyStateService {
  private companysSubject: BehaviorSubject<CompanyInterface[]> =
    new BehaviorSubject<CompanyInterface[]>([]);
  public companys$: Observable<CompanyInterface[]> =
    this.companysSubject.asObservable();

  constructor(private companyService: CompanyService) {
    this.load();
  }

  load() {
    this.companyService
      .get()
      .pipe(tap((companys) => this.companysSubject.next(companys)))
      .subscribe();
  }
}
