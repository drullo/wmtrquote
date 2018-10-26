import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  options = [
    'Advertisement',
    'E-Newsletter',
    'Internet Search',
    'Word of Mouth'
  ];

  getAll(): Observable<string[]> {
    return of(this.options);
  }
}
