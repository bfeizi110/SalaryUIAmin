import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private messageAggrid = new Subject<any>()
  currentMessageAggrid = this.messageAggrid.asObservable()
  id: number
  passDataAggrid(message: any) {
    this.messageAggrid.next(message)
  }

  constructor() { }
}
