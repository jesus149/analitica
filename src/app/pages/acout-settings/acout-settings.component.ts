import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-acout-settings',
  templateUrl: './acout-settings.component.html'
})
export class AcoutSettingsComponent implements OnInit {
  user: any;

  constructor(  public ajustes: SettingsService) { }

  ngOnInit(): void {
    this.user = this.ajustes.getLocalUser();
  }

  cambiarColor( tema: string, link: any ){
    this.aplicarCheck( link );
    this.ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ){
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

}
