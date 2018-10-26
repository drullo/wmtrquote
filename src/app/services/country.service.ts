import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '@model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  url = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }
}
