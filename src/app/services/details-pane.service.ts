import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsPaneService {
  showDetailsPaneIn:Subject<number>;
  constructor() {
    this.showDetailsPaneIn = new Subject<number>();
  }
}
