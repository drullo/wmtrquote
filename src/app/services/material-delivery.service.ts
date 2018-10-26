import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialDeliveryService {
  options = [
    'Blanks',
    'Forging',
    'Casting'
  ];

  getAll(): Observable<string[]> {
    return of(this.options);
  }
}
