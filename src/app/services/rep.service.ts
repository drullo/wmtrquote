import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepService {
  options = [
    'Jim Rossi',
    'Don Rossi',
    'Mike Rossi'
  ];

  getAll(): Observable<string[]> {
    return of(this.options);
  }
}
