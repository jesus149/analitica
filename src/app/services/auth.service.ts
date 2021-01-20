import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string ;
  @Output() getLoggedToken: EventEmitter<any> = new EventEmitter();

  constructor( private http: HttpClient ) {

  }


  estaAutenticado(): boolean {

    let token = JSON.parse(localStorage.getItem('token'));
    // console.log( 'PAMANÑO TOKEN: ' , token.length);
    if ( token.length < 2 ) { return false; }
    return true;
  }
}