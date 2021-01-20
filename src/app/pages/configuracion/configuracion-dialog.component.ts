import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ConfiguracionComponent } from '../../pages/configuracion/configuracion.component';

@Component({
  templateUrl: './configuracion-dialog.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionDialogComponent implements OnInit {
  user_rfc: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
  ) {
    console.log(this.user_rfc);
  }

  ngOnInit(): void { }


  clear(): void {
    this.activeModal.dismiss();
  }

  delete() {
    const reques = {
      user_rfc: this.user_rfc,
      delete: true
    };
    this.passEntry.emit(reques);
    this.activeModal.dismiss();
  }
}
