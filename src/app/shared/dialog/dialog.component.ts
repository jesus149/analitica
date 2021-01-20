import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  MENSAJES = {
    DELETE_RFC: 'Los registros de una cuenta no se pueden volver a dar de alta después de eliminar sin contactar al administrador del sistema.',
    CONTINUAR: '¿Desea contunuar?'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
