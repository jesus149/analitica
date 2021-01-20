import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  }

  user: string;

  USER = 'user'

  constructor( @Inject(DOCUMENT) private documento, public router: Router ) {
    this.cargarAjustes();
  }

  guardarAjustes(){
    console.log('guardar en el localStorege');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );
  }

  /**
   * Se invoca en el app componen para la carga de configuraciones.
   */
  cargarAjustes(){
    if ( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') ) ;
      console.log('Cargando ajustes de preferencias de localStorege');

      this.aplicarTema( this.ajustes.tema );

    }else{
      console.log('usar valores por defecto');
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema(tema: string){
    const url = `assets/css/colors/${ tema }.css`;
    this.documento.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema ;
    this.ajustes.temaUrl = url ;

    this.guardarAjustes();
  }

  setLocalUser(result){
    localStorage.setItem(this.USER, JSON.stringify(result['generalData'][0]));
    // FIXME
    localStorage.setItem('token', JSON.stringify( environment.aKey )) ;
  }

  getLocalUser(): string{
    if ( localStorage.getItem(this.USER) ) {
      this.user = JSON.parse(localStorage.getItem(this.USER));
      return this.user;
    } else {
      this.user = null ;
    }
  }

  logout(): Observable<void>{
    return new Observable(observer => {
      localStorage.clear();
      observer.complete();
      this.router.navigate(['/login']) 
    });
  }

  clean(){
    localStorage.clear();
  }

}

interface Ajustes{
  temaUrl: string;
  tema: string;
}