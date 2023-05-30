import { Section } from './models/section';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor() { }

  private emissor$ = new Subject<Section[]>();

  emitValor(valor:Section[]){
    console.log("valor",valor)
    this.emissor$.next(valor)
  }

  getValor(){
    return this.emissor$.asObservable()
  }
}
