import { Principle } from './models/principle';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor() { }

  private emissor$ = new Subject<Principle[]>();

  emitValor(valor:Principle[]){
    console.log("valor",valor)
    this.emissor$.next(valor)
  }

  getValor(){
    return this.emissor$.asObservable()
  }
}
